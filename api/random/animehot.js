const express = require('express');
const router = express.Router();
const axios = require('axios');

// Konfigurasi Endpoint & API Key Internal
const TARGET_URL = 'https://arulz-xd.my.id/api/random/animehot';
const API_KEY = 'arulz-vip-123'; // Apikey VIP internal

/**
 * Mengambil buffer gambar dari domain arulz-xd.my.id
 */
async function fetchAnimeHot() {
    try {
        const response = await axios.get(TARGET_URL, {
            params: { apikey: API_KEY },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
            },
            responseType: 'arraybuffer',
            timeout: 15000 // Timeout 15 detik untuk server Vercel
        });

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const buffer = Buffer.from(response.data);

        return { buffer, contentType };
    } catch (error) {
        // Tangkap respon jika server tujuan mengembalikan Error JSON (misal API key invalid / habis limit)
        if (error.response && error.response.data) {
            try {
                const errJson = JSON.parse(error.response.data.toString('utf-8'));
                throw new Error(errJson.message || `Server Target Error: ${error.response.status}`);
            } catch (e) {
                throw new Error(`HTTP Error ${error.response.status}: ${error.message}`);
            }
        }
        throw error;
    }
}

// Endpoint Utama Router
router.get('/', async (req, res) => {
    try {
        const { buffer, contentType } = await fetchAnimeHot();

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=3600'
        });
        res.end(buffer);
    } catch (error) {
        console.error("❌ Error Proxy AnimeHot:", error.message);
        return res.status(500).json({ 
            status: false,
            message: "Gagal mengambil data dari server utama",
            error: error.message 
        });
    }
});

router.status = "ready"; 
router.type = "free";

module.exports = router;
