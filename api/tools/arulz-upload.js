const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Gunakan MemoryStorage untuk menampung file sementara di buffer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // Limit 10MB
});

router.post("/", upload.single("file"), async (req, res) => {
  // Dukungan untuk Multer (req.file) dan express-fileupload (req.files.file)
  const file = req.file || (req.files && req.files.file);

  if (!file) {
    return res.status(400).json({ 
      status: false, 
      message: "File wajib diunggah! Gunakan field 'file'." 
    });
  }

  try {
    const fileBuffer = file.buffer || file.data;
    const fileName = file.originalname || file.name || "file.bin";
    const mimeType = file.mimetype || "application/octet-stream";

    // Siapkan FormData untuk dikirim ke API target
    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: fileName,
      contentType: mimeType,
      knownLength: fileBuffer.length
    });

    // Endpoint API Tujuan
    const targetUrl = "https://base-api-arulz-simple.vercel.app/uploadfile";

    const response = await axios.post(targetUrl, form, {
      headers: {
        ...form.getHeaders(),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      timeout: 30000
    });

    let resultData = response.data;

    // Parsing HTML jika target mengembalikan elemen HTML dengan tautan download/raw
    if (typeof resultData === "string") {
      const match = resultData.match(/href="(https?:\/\/[^"]+)"/);
      if (match && match[1]) {
        resultData = { url: match[1] };
      }
    }

    return res.json({
      status: true,
      creator: "ArulzXD",
      result: resultData
    });

  } catch (e) {
    console.error("Scrape Error:", e.message);
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
