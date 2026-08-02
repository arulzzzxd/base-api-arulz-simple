const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const multer = require("multer");
const { fromBuffer } = require("file-type");

const router = express.Router();

// Tanpa limit upload
const upload = multer();

// --- SCRAPER FUNCTION ---

async function uploadToCatbox(fileBuffer, mimetype, originalName, userhash = "") {
    const type = await fromBuffer(fileBuffer);

    const filename =
        originalName ||
        `upload.${type?.ext || "bin"}`;

    const form = new FormData();
    form.append("reqtype", "fileupload");

    // Isi jika menggunakan akun Catbox
    if (userhash) {
        form.append("userhash", userhash);
    }

    form.append("fileToUpload", fileBuffer, {
        filename,
        contentType: type?.mime || mimetype || "application/octet-stream",
        knownLength: fileBuffer.length
    });

    const { data } = await axios.post(
        "https://catbox.moe/user/api.php",
        form,
        {
            headers: form.getHeaders(),
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            timeout: 120000
        }
    );

    if (typeof data !== "string" || !data.startsWith("https://")) {
        throw new Error(data);
    }

    return data.trim();
}

// --- ENDPOINT ---

router.post("/", upload.single("fileToUpload"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                status: false,
                creator: "Arulzxd",
                message: "Berkas 'fileToUpload' wajib diunggah!"
            });
        }

        const url = await uploadToCatbox(
            file.buffer,
            file.mimetype,
            file.originalname
        );

        return res.json({
            status: true,
            creator: "Arulzxd",
            result: {
                filename: file.originalname,
                size: file.size,
                mimetype: file.mimetype,
                url
            }
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            status: false,
            creator: "Arulzxd",
            message: "Gagal mengunggah file ke Catbox",
            error: err.message
        });
    }
});

// --- PARAMETER CONFIG UNTUK DASHBOARD ---

router.paramsConfig = {
    fileToUpload: {
        type: "file",
        desc: "File yang akan diupload ke Catbox"
    }
};

router.status = "ready";
router.type = "free";

module.exports = router;