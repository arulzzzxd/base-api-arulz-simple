const express = require('express');
const axios = require('axios');

const router = express.Router();

const TARGET_API_URL = "https://api.arulz.biz.id/api/nsfw/anime18?apikey=haqqiarulz";

async function fetchNsfwImage() {
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    try {
      const response = await axios.get(TARGET_API_URL, {
        responseType: 'arraybuffer',
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'image/*,video/*,*/*'
        }
      });

      const contentType = response.headers['content-type'] || 'image/jpeg';
      const buffer = Buffer.from(response.data);

      if (!buffer || buffer.length === 0) {
        throw new Error('Buffer gambar kosong dari server target.');
      }

      return {
        buffer,
        contentType
      };
    } catch (error) {
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error(`Gagal mengambil gambar setelah ${maxAttempts} percobaan: ${error.message}`);
      }
    }
  }
}

router.get('/', async (req, res) => {
  try {
    const result = await fetchNsfwImage();

    res.setHeader('Content-Type', result.contentType);
    res.setHeader('Content-Length', result.buffer.length);

    return res.end(result.buffer);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      creator: "Arulzxd",
      message: "Internal Server Error saat mengambil gambar anime 18+",
      error: err.message
    });
  }
});

router.desc = "Mengambil dan merelay gambar/animasi anime 🔞 secara langsung.";
router.status = "ready";
router.type = "premium";

module.exports = router;