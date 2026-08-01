const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const { Readable } = require("stream");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }
});

router.paramsConfig = {
  file: { type: 'file' }
};

router.post("/", upload.single("file"), async (req, res) => {
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

    // Konversi Buffer ke Stream agar FormData tidak crash
    const stream = Readable.from(fileBuffer);

    const form = new FormData();
    form.append("reqtype", "fileupload");
    form.append("userhash", "");
    form.append("fileToUpload", stream, {
      filename: fileName
    });

    const { data } = await axios.post("https://catbox.moe/user/api.php", form, {
      headers: {
        ...form.getHeaders(),
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 300000 
    });

    if (typeof data === "string" && data.startsWith("https://files.catbox.moe/")) {
      return res.json({
        status: true,
        creator: "ArulzXD",
        result: { url: data.trim() }
      });
    } else {
      return res.status(500).json({ 
        status: false, 
        error: typeof data === 'object' ? JSON.stringify(data) : data 
      });
    }

  } catch (e) {
    console.error("Catbox Upload Error Log:", e.response?.data || e.message);
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
