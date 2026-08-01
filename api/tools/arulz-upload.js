const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

// Gunakan MemoryStorage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post("/", upload.single("file"), async (req, res) => {
  // Ambil file dari Multer, atau fallback ke express-fileupload (req.files) jika Multer dilewati
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

    const form = new FormData();
    form.append("file", fileBuffer, {
      filename: fileName,
      contentType: mimeType,
      knownLength: fileBuffer.length
    });

    // Tembak secara langsung ke endpoint backend penerima unggahan file (/uploadfile)
    // Hindari menembak ke /uploader karena /uploader adalah halaman GET (HTML)
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    
    const response = await axios.post(`${baseUrl}/uploadfile`, form, {
      headers: {
        ...form.getHeaders()
      },
      timeout: 30000
    });

    // Jika response berupa HTML (seperti tampilan unggahan sukses di server)
    let resultData = response.data;

    // Ekstrak URL jika response dari /uploadfile mengembalikan HTML
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
    console.error("Upload Error:", e.message);
    return res.status(500).json({ 
      status: false, 
      error: e.response?.data || e.message 
    });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
