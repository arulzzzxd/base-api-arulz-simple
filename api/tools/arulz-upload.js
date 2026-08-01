const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 } // Batas 200MB sesuai limit Catbox
});

// 1. Definisikan parameter secara eksplisit agar terbaca oleh Dashboard
router.paramsConfig = {
  file: { type: 'file' }
};

router.post("/", upload.single("file"), async (req, res) => {
  // 2. Fallback ke express-fileupload & pancingan comment "// req.body.file" untuk UI app.js
  const file = req.file || (req.files && req.files.file); // req.body.file

  if (!file) {
    return res.status(400).json({ 
      status: false, 
      message: "File wajib diunggah! Gunakan form key 'file'." 
    });
  }

  try {
    const fileBuffer = file.buffer || file.data;
    const fileName = file.originalname || file.name || "uploaded_file.bin";
    const mimeType = file.mimetype || "application/octet-stream";

    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("userhash", "");
    form.append("fileToUpload", fileBuffer, {
      filename: fileName,
      contentType: mimeType,
      knownLength: fileBuffer.length
    });

    const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: {
        ...form.getHeaders(),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0"
      },
      timeout: 300000 
    });

    if (typeof data === "string" && data.startsWith("https://files.catbox.moe/")) {
      return res.json({
        status: true,
        creator: "ArulzXD",
        result: { url: data.trim() }
      });
    } else {
      return res.status(500).json({ status: false, error: data || "Gagal mengunggah file ke Catbox." });
    }
  } catch (e) {
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
