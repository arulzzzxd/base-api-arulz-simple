const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 4.5 * 1024 * 1024 } // Limit 4.5MB
});

router.post("/", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File required (use key 'file')" });
  }

  try {
    const form = new FormData();
    form.append("file", file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype
    });

    // Request ke endpoint uploader utama
    const responseUploader = await axios.post(
      "https://base-api-arulz-simple.vercel.app/uploader",
      form,
      { headers: form.getHeaders() }
    );

    // Backup / Fetch ke /uploadfile jika diperlukan
    const responseResult = await axios.post(
      "https://base-api-arulz-simple.vercel.app/uploadfile",
      form,
      { headers: form.getHeaders() }
    ).catch(() => null);

    const result = responseUploader.data || responseResult?.data;

    res.json({
      status: true,
      creator: "ArulzXD",
      result
    });
  } catch (e) {
    res.status(500).json({ error: e.response?.data?.message || e.message });
  }
});

router.status = "ready";
router.type = "free";

module.exports = router;
