const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ==========================================
// 1. SCRAPER / HELPER CATBOX (DIBUAT SATU FILE)
// ==========================================
async function uploadCatbox(filePath) {
    try {
        if (!fs.existsSync(filePath)) {
            return { success: false, error: "File not found" };
        }

        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("userhash", "");
        form.append("fileToUpload", fs.createReadStream(filePath));

        const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
            headers: {
                ...form.getHeaders(),
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0"
            },
            timeout: 300000
        });

        if (data && typeof data === 'string' && data.startsWith("https://files.catbox.moe/")) {
            return { success: true, url: data.trim() };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ==========================================
// 2. CONFIG & ROUTE ENDPOINT
// ==========================================
router.paramsConfig = {
    fileToUpload: {
        type: 'file',
        desc: 'Berkas yang akan diunggah (Gambar, Video, Audio, PDF, dll)'
    }
};
router.status = 'ready';
router.type = 'free';

router.post('/', upload.single('fileToUpload'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            status: false, 
            message: "Berkas 'fileToUpload' wajib diunggah!" 
        });
    }

    const tempFilePath = req.file.path;

    try {
        // Panggil fungsi scraper lokal
        const result = await uploadCatbox(tempFilePath);

        // Hapus file temporary lokal setelah upload selesai
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }

        if (result.success) {
            return res.json({
                status: true,
                result: {
                    url: result.url
                }
            });
        } else {
            return res.status(500).json({
                status: false,
                error: result.error
            });
        }
    } catch (error) {
        // Pastikan file temporary tetap terhapus jika runtime error
        if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
        }
        return res.status(500).json({ 
            status: false, 
            error: error.message 
        });
    }
});

router.status = "ready"; 
router.type = "free";
module.exports = router;