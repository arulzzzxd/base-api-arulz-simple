const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');

const router = express.Router();

// Gunakan memory storage (membaca file sebagai Buffer di RAM)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024 // Batasi maks 4MB agar tidak melewati limit Vercel (4.5MB)
    }
});

// Helper Upload ke Catbox menggunakan Buffer
async function uploadCatboxFromBuffer(fileBuffer, originalName) {
    try {
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("userhash", "");
        
        // Penting: Berikan opsi filename & knownLength agar stream buffer terdeteksi ukurannya
        form.append("fileToUpload", fileBuffer, {
            filename: originalName || "file_upload.png",
            knownLength: fileBuffer.length
        });

        const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
            headers: {
                ...form.getHeaders(),
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            timeout: 15000 // Timeout 15 detik
        });

        if (typeof data === 'string' && data.startsWith("https://files.catbox.moe/")) {
            return { success: true, url: data.trim() };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Konfigurasi Router Parameter
router.paramsConfig = {
    fileToUpload: {
        type: 'file',
        desc: 'Berkas yang akan diunggah (Maksimal 4 MB)'
    }
};
router.status = 'ready';
router.type = 'free';

router.post('/', (req, res, next) => {
    // Handling error bawaan multer jika file melebihi limit
    upload.single('fileToUpload')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.code === 'LIMIT_FILE_SIZE' 
                    ? "Ukuran berkas terlalu besar! Maksimal 4 MB di Vercel." 
                    : err.message
            });
        }
        next();
    });
}, async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ 
            status: false, 
            message: "Berkas 'fileToUpload' wajib diunggah!" 
        });
    }

    try {
        const result = await uploadCatboxFromBuffer(req.file.buffer, req.file.originalname);

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
                error: result.error || "Gagal mengunggah ke Catbox"
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            error: error.message 
        });
    }
});

module.exports = router;
