const express = require('express');
const router = express.Router();
const axios = require('axios');

// Konfigurasi Endpoint & API Key Internal
const TARGET_URL = 'https://arulz-xd.my.id/api/random/animehot';
const API_KEY = 'arulzfree-5c20ce39'; 

/**
 * Mengambil buffer gambar dari domain arulz-xd.my.id
 */
async function fetchAnimeHot() {
    try {
        const response = await axios.get(TARGET_URL, {
            params: { 
                apikey: API_KEY,
                _t: Date.now() // Cache-busting parameter agar request selalu unik
            },
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8"
            },
            responseType: 'arraybuffer',
            timeout: 15000 
        });

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const buffer = Buffer.from(response.data);

        return { buffer, contentType };
    } catch (error) {
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
        const anime = await fetchAnimeHot();

        // Matikan caching di tingkat client/browser agar tiap kali di-refresh gambar berubah
        res.writeHead(200, {
            'Content-Type': anime.contentType,
            'Content-Length': anime.buffer.length,
        });
        
        res.end(anime.buffer);
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
