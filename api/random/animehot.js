const axios = require('axios');
const express = require('express');
const router = express.Router();

// Masukkan API key yang valid di sini
const API_KEY = 'arulz-vip-123'; 
const baseUrl = 'https://arulz-xd.my.id/api/random/animehot';

async function getAnimeHot() {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                apikey: API_KEY
            },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'arraybuffer',
            timeout: 10000 // Timeout 10 detik agar Vercel Function tidak hanging
        });

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const buffer = Buffer.from(response.data);

        return { buffer, contentType };
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
        const { buffer, contentType } = await getAnimeHot();

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', buffer.length);
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache opsional untuk performa
        return res.status(200).send(buffer);
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
