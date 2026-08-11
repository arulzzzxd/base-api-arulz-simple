const axios = require('axios');
const express = require('express');
const router = express.Router();

const baseUrl = 'https://arulz-xd.my.id/api/random/animehot';

async function getAnimeHot() {
    try {
        const response = await axios.get(baseUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'arraybuffer',
            timeout: 10000 // Timeout 10 detik agar Vercel Function tidak hanging
        });
        
        const contentType = response.headers["content-type"] || "image/png";

        return {
            buffer: Buffer.from(response.data),
            contentType: contentType
        };
    } catch (error) {
        // Log detail error di server/Vercel Logs untuk analisis
        if (error.response) {
            console.error(`Target API Error [${error.response.status}]:`, error.response.data.toString('utf-8'));
        } else {
            console.error('Fetch Error:', error.message);
        }
        throw new Error('Gagal mengambil gambar dari sumber utama. Pastikan API_KEY valid.');
    }
}

// Endpoint utama Router
router.get('/', async (req, res) => {
    try {
        const img = await getAnimeHot();

        res.writeHead(200, {
            'Content-Type': img.contentType,
            'Content-Length': img.buffer.length,
        });
        
        res.end(img.buffer);
    } catch (error) {
        return res.status(500).json({ 
            status: false,
            error: error.message 
        });
    }
});

router.status = "ready"; 
router.type = "free";
module.exports = router;
