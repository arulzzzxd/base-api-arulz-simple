const axios = require('axios');
const express = require('express');
const router = express.Router();

const API_KEY = 'arulz-vip-123';
const baseUrl = 'https://arulz-xd.my.id/api/random/animehot';

// Fungsi untuk mengambil buffer media dan content type langsung dari API
async function getAnimeHot() {
    try {
        const response = await axios.get(baseUrl, {
            params: {
                apikey: API_KEY
            },
            responseType: 'arraybuffer' // Mengambil response dalam bentuk buffer
        });

        // Mengambil Content-Type dari header response target (misal: image/jpeg atau image/png)
        const contentType = response.headers['content-type'] || 'image/png';
        const buffer = Buffer.from(response.data);

        return { buffer, contentType };
    } catch (error) {
        throw error;
    }
}

// Endpoint utama Router
router.get('/', async (req, res) => {
    try {
        const { buffer, contentType } = await getAnimeHot();

        res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': buffer.length
        });
        res.end(buffer);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.status = "ready"; 
router.type = "free";
module.exports = router;
