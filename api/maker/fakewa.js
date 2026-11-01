const express = require('express');
const axios = require('axios');
const FormData = require('form-data');

const router = express.Router();

// --- CONFIGURATION ---
const API_URL = 'https://api.arulzzxd.my.id/api/maker/fakewa';
const API_KEY = 'haqqiarulz'; // Apikey bawaan dari endpoint target
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

// --- HELPER FUNCTION: Download image buffer from URL ---
async function downloadImageBuffer(url) {
    const response = await axios.get(url, {
        headers: { 'User-Agent': UA },
        responseType: 'arraybuffer'
    });
    return Buffer.from(response.data);
}

// --- SCRAPER FUNCTION ---
/**
 * Scraper/Wrapper untuk API Fake WA Profile
 * @param {Object} params
 * @param {Buffer} params.imageBuffer - Buffer foto profil
 * @param {string} params.nama - Nama tampilan profil
 * @param {string} params.nomor - Nomor HP
 * @param {string} params.status - Status/Bio profil
 */
async function scrapeFakeWA({ imageBuffer, nama, nomor, status }) {
    try {
        const form = new FormData();
        form.append('apikey', API_KEY);
        form.append('fileupload', imageBuffer, { filename: 'profile.jpg' });
        form.append('nama', nama);
        form.append('nomor', nomor);
        form.append('status', status);

        const response = await axios.post(API_URL, form, {
            headers: {
                'User-Agent': UA,
                ...form.getHeaders()
            },
            responseType: 'arraybuffer',
            timeout: 30000 // Timeout 30 detik
        });

        // Validasi jika API mengembalikan respons JSON (artinya error / apikey invalid)
        const contentType = response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
            const errorJson = JSON.parse(Buffer.from(response.data).toString('utf-8'));
            throw new Error(errorJson.message || 'API Fake WA mengembalikan error JSON.');
        }

        return response.data;
    } catch (err) {
        if (err.response && err.response.data instanceof Buffer) {
            const errMsg = Buffer.from(err.response.data).toString('utf-8');
            throw new Error(`Fake WA API Error: ${errMsg}`);
        }
        throw new Error(err.message);
    }
}

// --- ENDPOINT ROUTE (GET) ---
// Contoh penggunaan: /api/fakewa?url=https://example.com/foto.jpg&nama=Arulzz&nomor=08512262990&status=Sibuk
router.get('/', async (req, res) => {
    try {
        const imgUrl = req.query.url?.trim();
        const nama = req.query.nama?.trim() || 'Arulzz';
        const nomor = req.query.nomor?.trim() || '08512262990';
        const status = req.query.status?.trim() || 'Sibuk';

        if (!imgUrl) {
            return res.status(400).json({
                status: false,
                creator: "Arulzxd",
                message: "Parameter ?url= wajib diisi!",
                example: "/api/fakewa?url=https://example.com/foto.jpg&nama=Arulzz&nomor=08512262990&status=Sibuk"
            });
        }

        // Unduh gambar dari URL ke dalam Buffer
        const imageBuffer = await downloadImageBuffer(imgUrl);

        // Eksekusi scraper
        const resultBuffer = await scrapeFakeWA({ imageBuffer, nama, nomor, status });

        // Kirim hasil gambar langsung ke client
        res.setHeader('Content-Type', 'image/jpeg');
        return res.send(Buffer.from(resultBuffer));

    } catch (err) {
        console.error("====== SCRAPER ERROR LOG ======");
        console.error(err.message);
        console.error("===============================");

        return res.status(500).json({
            status: false,
            creator: "Arulzxd",
            message: "Internal Server Error saat memproses pembuatan Fake WA",
            error: err.message
        });
    }
});

router.status = "ready"; 
router.type = "free";
module.exports = router;
