const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Konfigurasi Multer (simpan sementara di RAM/Buffer)
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 4.5 * 1024 * 1024 } // Batas file 4.5MB sesuai UI web
});

router.post("/", upload.single("file"), async (req, res) => {
    try {
        // Validasi ketersediaan file
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "File tidak ditemukan. Kirim file dengan field bernama 'file'."
            });
        }

        // Menyusun Form Data
        const form = new FormData();
        form.append("file", req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });

        // 1. Tembak request upload ke Base URL Uploader
        const responseUploader = await axios.post(
            "https://base-api-arulz-simple.vercel.app/uploader",
            form,
            {
                headers: {
                    ...form.getHeaders()
                }
            }
        );

        // 2. Tembak request/dapatkan hasil dari Endpoint Uploadfile
        const responseResult = await axios.post(
            "https://base-api-arulz-simple.vercel.app/uploadfile",
            form,
            {
                headers: {
                    ...form.getHeaders()
                }
            }
        ).catch(() => null);

        // Mengembalikan response JSON
        return res.json({
            status: true,
            creator: "ArulzXD",
            result: responseUploader.data || responseResult?.data
        });

    } catch (e) {
        return res.status(500).json({
            status: false,
            message: e.response?.data?.message || e.message
        });
    }
});

router.status = "ready";
router.type = "free";

module.exports = router;
