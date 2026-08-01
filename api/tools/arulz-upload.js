const express = require("express");
const multer = require("multer");
const axios = require("axios");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4.5 * 1024 * 1024 } // Limit 10MB
});

router.post("/", upload.single("file"), async (req, res) => {
  // Ambil file dari Multer, atau fallback ke express-fileupload (req.files)
  const file = req.file || (req.files && req.files.file);

  if (!file) {
    return res.status(400).json({ 
      status: false, 
      message: "File wajib diunggah! Gunakan form key 'file'." 
    });
  }

  try {
    const fileBuffer = file.buffer || file.data;
    const fileName = file.originalname || file.name || "file.bin";
    const mimeType = file.mimetype || "application/octet-stream";

    // 1. Ubah file buffer menjadi Base64 string
    const base64Data = fileBuffer.toString("base64");
    const base64Content = `data:${mimeType};base64,${base64Data}`;

    // 2. Kirim payload Base64 ke Base Uploader
    const responseUploader = await axios.post(
      "https://base-api-arulz-simple.vercel.app/uploader",
      {
        file: base64Content,
        filename: fileName,
        mimetype: mimeType
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000
      }
    ).catch(() => null);

    // 3. Dapatkan hasil dari endpoint uploadfile
    const responseResult = await axios.get(
      "https://base-api-arulz-simple.vercel.app/uploadfile",
      {
        file: responseUploader,
        filename: fileName,
        mimetype: mimeType
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 30000
      }
    ).catch(() => null);

    let resultData = responseResult?.data;

    // Jika balikan berupa template HTML, ekstrak URL-nya
    if (typeof resultData === "string" && resultData.includes("rawUrl")) {
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
    console.error("Base64 Upload Error:", e.message);
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
