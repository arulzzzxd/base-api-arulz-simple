const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Gunakan MemoryStorage (Batas 200MB sesuai limit Catbox)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }
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
    const fileName = file.originalname || file.name || "uploaded_file.bin";
    const mimeType = file.mimetype || "application/octet-stream";

    // Susun payload form-data sesuai parameter API Catbox
    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("userhash", ""); // Bisa diisi jika memiliki akun/userhash Catbox
    form.append("fileToUpload", fileBuffer, {
      filename: fileName,
      contentType: mimeType,
      knownLength: fileBuffer.length
    });

    // Kirim request ke Catbox API
    const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: {
        ...form.getHeaders(),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:152.0) Gecko/20100101 Firefox/152.0"
      },
      timeout: 300000 // Timeout 5 menit untuk file besar
    });

    // Catbox mengembalikan URL teks biasa (string) jika sukses
    if (typeof data === "string" && data.startsWith("https://files.catbox.moe/")) {
      return res.json({
        status: true,
        creator: "ArulzXD",
        result: {
          url: data.trim()
        }
      });
    } else {
      return res.status(500).json({
        status: false,
        error: data || "Gagal mengunggah file ke Catbox."
      });
    }

  } catch (e) {
    console.error("Catbox Upload Error:", e.message);
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
