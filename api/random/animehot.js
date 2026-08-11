const axios = require('axios');
const express = require('express');
const router = express.Router();

const BASE_URL = 'https://arulz-xd.my.id/api/random/animehot';
const API_KEY = 'arulz-vip-123'; // Apikey otomatis internal

async function getAnimeHot(apikey) {
    if (!apikey) {
        throw new Error('API Key wajib diisi!');
    }

    try {
        const response = await axios.get(BASE_URL, {
            params: { apikey },
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            },
            responseType: 'arraybuffer',
            timeout: 10000
        });

        const contentType = response.headers['content-type'] || 'image/jpeg';
        const buffer = Buffer.from(response.data);

        return { buffer, contentType };
    } catch (error) {
        if (error.response && error.response.data) {
            try {
                const errJson = JSON.parse(error.response.data.toString('utf-8'));
                throw new Error(errJson.message || 'Gagal mengambil gambar animehot.');
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
        const { buffer, contentType } = await getAnimeHot(API_KEY);

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=3600'
        });
        res.end(buffer);
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
