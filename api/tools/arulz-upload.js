const express = require('express');
const multer = require('multer');
const axios = require('axios');
const { fromBuffer } = require('file-type');

const router = express.Router();

// Simpan file sementara di RAM (Buffer)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 4 * 1024 * 1024 // Batasi maks 4 MB agar aman dari Limit Body Vercel (4.5 MB)
    }
});

// Fungsi Upload ke Catbox menggunakan Base64 / Buffer langsung
async function uploadCatboxBase64(fileBuffer, mimetype, originalName) {
    try {
        // Deteksi mime-type asli file dari Buffer
        const mimeInfo = await fromBuffer(fileBuffer);
        const finalMime = mimeInfo ? mimeInfo.mime : (mimetype || "application/octet-stream");
        
        // Ubah buffer ke bentuk Base64 (Data URL)
        const base64Data = fileBuffer.toString("base64");
        const dataUrl = `data:${finalMime};base64,${base64Data}`;

        // Mengirimkan payload sebagai FormData / UrlEncoded via Axios
        const formData = new FormData();
        formData.append("reqtype", "fileupload");
        formData.append("userhash", "");
        
        // Buat Blob dari buffer untuk dikirimkan
        const blob = new Blob([fileBuffer], { type: finalMime });
        formData.append("fileToUpload", blob, originalName || "upload.png");

        const { data } = await axios.post("https://catbox.moe/user/api.php", formData, {
            headers: {
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            },
            timeout: 15000 // Batas waktu 15 detik agar tidak Kena Timeout Vercel
        });

        if (typeof data === 'string' && data.startsWith("https://files.catbox.moe/")) {
            return { 
                success: true, 
                url: data.trim(),
                mime: finalMime,
                size: fileBuffer.length
            };
        } else {
            return { success: false, error: data };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Konfigurasi Parameter untuk APILIST Dashboard
router.paramsConfig = {
    fileToUpload: {
        type: 'file',
        desc: 'Berkas yang akan diunggah (Gambar, Video, PDF, dll. Maks 4MB)'
    }
};
router.status = 'ready';
router.type = 'free';

router.post('/', (req, res, next) => {
    // Tangkap error multer (seperti file melebihi 4MB)
    upload.single('fileToUpload')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                status: false,
                message: err.code === 'LIMIT_FILE_SIZE' 
                    ? "Ukuran file terlalu besar! Maksimal 4 MB." 
                    : err.message
            });
        }
        next();
    });
}, async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ 
            status: false, 
            message: "Berkas 'fileToUpload' wajib diunggah!" 
        });
    }

    try {
        // Mengolah file.buffer langsung mirip dengan skema AI Chat Kamu
        const result = await uploadCatboxBase64(file.buffer, file.mimetype, file.originalname);

        if (result.success) {
            return res.json({
                status: true,
                result: {
                    url: result.url,
                    mimeType: result.mime,
                    size: result.size
                }
            });
        } else {
            return res.status(500).json({
                status: false,
                error: result.error || "Gagal mengunggah file ke server Catbox"
            });
        }
    } catch (e) {
        return res.status(500).json({ 
            status: false, 
            error: e.message 
        });
    }
});

module.exports = router;
