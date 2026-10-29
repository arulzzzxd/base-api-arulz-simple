const axios = require('axios');
const express = require('express');
const router = express.Router();

// Fungsi untuk mengambil gambar anime nsfw dari API Arulz
async function randomNsfw() {
    try {
        const apiUrl = "https://api.arulz.biz.id/api/nsfw/anime18?apikey=haqqiarulz";

        // Menerima response langsung berupa buffer gambar dari API
        const image = await axios.get(apiUrl, {
            responseType: "arraybuffer",
            timeout: 15000,
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        const contentType = image.headers["content-type"] || "image/jpeg";

        return {
            buffer: Buffer.from(image.data),
            contentType: contentType
        };
    } catch (error) {
        throw error;
    }
}

// Endpoint utama Router
router.get('/', async (req, res) => {
    try {
        const nsfw = await randomNsfw();
        
        res.writeHead(200, {
            'Content-Type': nsfw.contentType,
            'Content-Length': nsfw.buffer.length,
        });
        
        res.end(nsfw.buffer);
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            status: false,
            creator: "Arulzxd",
            message: error.response?.data?.message || error.message || "Terjadi kesalahan server"
        });
    }
});

router.status = "ready"; 
router.type = "premium";
module.exports = router;
