const axios = require('axios');
const express = require('express');
const router = express.Router();

// API Key Otomatis
const API_KEY = 'arulz-vip-123';

/**
 * Mengambil buffer gambar animehot dari API
 * @returns {Promise<Buffer>}
 */
async function fetchAnimeHot() {
    try {
        const response = await axios.get('https://arulz-xd.my.id/api/random/animehot', {
            params: { apikey: API_KEY },
            responseType: 'arraybuffer',
            timeout: 10000
        });

        return Buffer.from(response.data);
    } catch (error) {
        if (error.response && error.response.data) {
            try {
                const errJson = JSON.parse(error.response.data.toString('utf-8'));
                throw new Error(errJson.message || 'Gagal mengambil gambar.');
            } catch (e) {
                throw new Error(`HTTP Error ${error.response.status}: ${error.message}`);
            }
        }
        throw error;
    }
}

// Endpoint utama Router
router.get('/', async (req, res) => {
    try {
        const imageBuffer = await fetchAnimeHot();
        res.writeHead(200, {
            'Content-Type': 'image/jpeg',
            'Content-Length': imageBuffer.length,
        });
        res.end(imageBuffer);
    } catch (error) {
        return res.status(500).json({ status: false, error: error.message });
    }
});

router.status = "ready"; 
module.exports = router;
