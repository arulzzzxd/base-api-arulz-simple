const express = require('express');
const multer = require('multer');
const FormData = require('form-data');
const axios = require('axios');

const router = express.Router();

// ❌ JANGAN GUNAKAN: const upload = multer({ dest: 'uploads/' });
// ✅ GUNAKAN MEMORY STORAGE:
const upload = multer({ storage: multer.memoryStorage() });

// Helper upload Catbox langsung dari Buffer Memori
async function uploadCatboxFromBuffer(fileBuffer, originalName) {
    try {
        const form = new FormData();
        form.append("reqtype", "fileupload");
        form.append("userhash", "");
        
        // Kirim buffer langsung sebagai stream file
        form.append("fileToUpload", fileBuffer, {
            filename: originalName || "file_upload"
        });

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

// Konfigurasi Parameter
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

    try {
        // req.file.buffer berisi file yang ada di memori RAM
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
                error: result.error
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
