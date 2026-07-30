
# 🚀 REST API Base Dashboard

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&pause=1000&color=00D4FF&center=true&vCenter=true&width=600&lines=Welcome+To+REST+API+Base;Fast+%F0%9F%9A%80+Reliable+%E2%9A%A1;Free+REST+API+Services;Developer+Friendly+API" alt="Typing SVG" />

<p>
  <img src="https://img.shields.io/badge/API-ONLINE-success?style=for-the-badge">
  <img src="https://img.shields.io/badge/Node.js-v18%2B-blue?style=for-the-badge&logo=node.js">
  <img src="https://img.shields.io/badge/Status-Active-green?style=for-the-badge">
</p>

</div>

---

## ✨ Tentang API

Project ini adalah **Base REST API Dashboard** serbaguna berbasis Node.js dan Express. Dilengkapi dengan fitur autentikasi (Local, Google OAuth, GitHub OAuth), sistem limit API Key (Free, Premium, VIP), integrasi penyimpanan media ke GitHub Repository, serta dashboard tampilan interaktif.

Sangat cocok digunakan untuk menyediakan berbagai kebutuhan developer seperti:
- 🤖 AI Tools
- 📥 Downloader
- 🔍 Search Engine
- 🖼️ Image Generator
- 🎵 Media Tools
- 📊 Utilities

---

## 🎯 Features

```yaml
✓ Fitur Autentikasi (Local, Google OAuth, GitHub OAuth)
✓ Sistem Role & Limit API Key (Free, Premium, VIP)
✓ Uploader Berkas terintegrasi dengan GitHub Storage
✓ Sistem Lupa Password via Email (Nodemailer)
✓ Dashboard Interaktif dengan Music Player, Live Clock, & Dark Mode
✓ Auto Scanning Dynamic Routing untuk Endpoint
✓ Proteksi Rate Limiting & Proxy Support
✓ Response JSON & Buffer Stream Support

```
## 🔑 Panduan Lengkap Mendapatkan API Key & Kredensial
Untuk menjalankan API ini secara penuh, Anda memerlukan beberapa kredensial OAuth dan API Key. Ikuti langkah-langkah di bawah ini:
### 1. 📦 MongoDB Connection String (MONGODB_URI)
> Digunakan untuk menyimpan data pengguna, status role, dan token session.
> 
 * **URL Pendaftaran:** MongoDB Atlas Console
 1. Buat akun dan masuk ke **MongoDB Atlas**.
 2. Buat **Cluster** baru (Pilih opsi *Free Tier / Shared*).
 3. Buka menu **Database Access** > Tambahkan pengguna database baru (*Username & Password*).
 4. Buka menu **Network Access** > Klik *Add IP Address* > Masukkan 0.0.0.0/0 (*Allow access from anywhere*).
 5. Masuk ke menu **Database** > Klik **Connect** > Pilih **Drivers (Node.js)**.
 6. Salin Connection String yang diberikan. Contoh:
   mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/?appName=Cluster0
### 2. 🔑 Google OAuth 2.0 Credentials (GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET)
> Digunakan untuk fitur tombol "Login with Google".
> 
 * **URL Pendaftaran:** Google Cloud Console
 1. Buat atau pilih proyek di Google Cloud Console.
 2. Navigasi ke **APIs & Services** > **OAuth consent screen** > Pilih **External** dan lengkapi data dasar.
 3. Buka **APIs & Services** > **Credentials** > Klik **Create Credentials** > Pilih **OAuth client ID**.
 4. Pilih *Application type*: **Web application**.
 5. Di bagian **Authorized redirect URIs**, tambahkan URL callback Anda:
   * *Lokal:* http://localhost:3000/auth/google/callback
   * *Production:* https://domain-anda.com/auth/google/callback
 6. Salin **Client ID** (GOOGLE_CLIENT_ID) dan **Client Secret** (GOOGLE_CLIENT_SECRET).
### 3. 🐙 GitHub OAuth Credentials (GITHUB_CLIENT_ID & GITHUB_CLIENT_SECRET)
> Digunakan untuk fitur tombol "Login with GitHub".
> 
 * **URL Pendaftaran:** GitHub OAuth Applications
 1. Masuk ke GitHub, lalu klik **New OAuth App**.
 2. Isi *Application name* dan masukkan URL domain Anda pada *Homepage URL*.
 3. Pada **Authorization callback URL**, masukkan:
   * *Lokal:* http://localhost:3000/auth/github/callback
   * *Production:* https://domain-anda.com/auth/github/callback
 4. Klik **Register application**.
 5. Salin **Client ID** (GITHUB_CLIENT_ID) dan klik **Generate a new client secret** untuk mendapatkan GITHUB_CLIENT_SECRET.
### 4. 🚀 GitHub Personal Access Token (GITHUB_TOKEN)
> Digunakan oleh fitur *Cloud Uploader* untuk menyimpan file langsung ke repositori GitHub.
> 
 * **URL Pendaftaran:** GitHub Personal Access Tokens (Classic)
 1. Buka tautan di atas dan klik **Generate new token (classic)**.
 2. Beri nama token (misal: API Storage Uploader).
 3. Centang cakupan / scope **repo** (*Full control of private repositories*).
 4. Scroll ke bawah dan klik **Generate token**.
 5. Salin token (ghp_xxxx...) yang tampil.
### 5. ✉️ Gmail App Password (EMAIL_USER & EMAIL_PASS)
> Digunakan untuk mengirimkan email reset password dan pesan balasan otomatis feedback.
> 
 * **URL Pendaftaran:** Google Account Security
 1. Buka pengaturan Akun Google Anda dan pastikan **Verifikasi 2-Langkah (2-Step Verification)** sudah **Aktif**.
 2. Buka menu pencarian di bagian atas akun Google, cari **Sandi Aplikasi (App Passwords)**.
 3. Buat nama aplikasi baru (misal: REST API Mailer).
 4. Google akan menampilkan **16 karakter kode rahasia**.
 5. Gunakan alamat email Anda sebagai EMAIL_USER dan 16 karakter kode tersebut sebagai EMAIL_PASS.
## 🛠️ Konfigurasi .env
Buat berkas bernama .env di direktori utama (root) proyek Anda, lalu masukkan variabel lingkungan berikut:
```env
# ==========================================
# SERVER CONFIGURATION
# ==========================================
PORT=3000
BASE_URL=http://localhost:3000

# ==========================================
# DATABASE & SECURITY
# ==========================================
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/?appName=Cluster0
SESSION_SECRET=your_super_secret_session_key_here
JWT_SECRET=your_super_secret_jwt_key_here

# ==========================================
# GITHUB OAUTH AUTHENTICATION
# ==========================================
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# ==========================================
# GOOGLE OAUTH AUTHENTICATION
# ==========================================
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# ==========================================
# GITHUB STORAGE / UPLOADER SERVICE
# ==========================================
GITHUB_OWNER=YOUR_GITHUB_USERNAME
GITHUB_TOKEN=ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE

# ==========================================
# NODEMAILER / EMAIL SERVICE (GMAIL)
# ==========================================
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx

```
> **Catatan:** Pastikan Anda menginstall modul dotenv (npm i dotenv) dan menambahkan require('dotenv').config(); di bagian paling atas berkas index.js.
> 
## 🛠️ Contoh & Struktur Pembuatan Endpoint (Routing)
Seluruh endpoint API disimpan di dalam folder ./api/<kategori>/<nama_endpoint>.js.
### 1. Endpoint Mengembalikan JSON Response
```javascript
// Contoh lokasi: api/downloader/videy.js
const express = require('express');
const router = express.Router();

router.type = "free"; // Akses: free / premium / vip
router.status = "ready"; // Status: ready / perbaikan

router.get('/', async (req, res) => {
  const url = req.query.url; // Contoh: [https://example.com/api/downloader/videy?url=https://videy.co/v?id=xxxx](https://example.com/api/downloader/videy?url=https://videy.co/v?id=xxxx)
  if (!url) return res.status(400).json({ status: false, error: "Missing 'url' parameter" });

  try {
    const videoId = url.split("=")[1];
    if (!videoId) return res.status(400).json({ status: false, error: "Invalid 'url' parameter" });

    const anunyah = `[https://cdn.videy.co/$](https://cdn.videy.co/$){videoId}.mp4`;
    const data = {
      status: true,
      fileurl: anunyah
    };
    return res.json(data);
  } catch (e) {
    return res.status(500).json({ status: false, error: e.message });
  }
});

module.exports = router;

```
### 2. Endpoint Mengembalikan File / Buffer (Gambar, Audio, dll)
```javascript
// Contoh lokasi: api/tools/ssweb-hp.js
const axios = require('axios');
const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();

async function ssweb(url, { width = 1280, height = 720, full_page = false, device_scale = 1 } = {}) {
    try {
        if (!url.startsWith('https://')) throw new Error('Invalid url');
        if (isNaN(width) || isNaN(height) || isNaN(device_scale)) throw new Error('Width, height, and scale must be a number');
        if (typeof full_page !== 'boolean') throw new Error('Full page must be a boolean');
        
        const { data } = await axios.post('[https://gcp.imagy.app/screenshot/createscreenshot](https://gcp.imagy.app/screenshot/createscreenshot)', {
            url: url,
            browserWidth: parseInt(width),
            browserHeight: parseInt(height),
            fullPage: full_page,
            deviceScaleFactor: parseInt(device_scale),
            format: 'png'
        }, {
            headers: {
                'content-type': 'application/json',
                referer: '[https://imagy.app/full-page-screenshot-taker/](https://imagy.app/full-page-screenshot-taker/)',
                'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36'
            }
        });
        
        return data.fileUrl;
    } catch (error) {
        throw new Error(error.message);
    }
}

router.get('/', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Missing 'url' parameter" });

  try {
    const resultpic = await ssweb(url, { width: 720, height: 1280 });
    const buffernya = await fetch(resultpic).then((response) => response.buffer());

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': buffernya.length,
    });
    res.end(buffernya);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;

```
## 🚀 Cara Deploy
### 1. Deploy ke Vercel
 1. Fork repository ini ke akun GitHub Anda.
 2. Log in ke vercel.com menggunakan akun GitHub.
 3. Klik tombol **Add New** > **Project**, lalu pilih repository yang sudah di-fork.
 4. Masukkan seluruh konfigurasi dari berkas .env ke bagian **Environment Variables**.
 5. Klik **Deploy** dan tunggu hingga selesai.
### 2. Deploy ke VPS / Server Lokal
```bash
# Clone repository
git clone [https://github.com/username/repo-anda.git](https://github.com/username/repo-anda.git)
cd repo-anda

# Install dependencies
npm install

# Jalankan server
npm start

# Atau jalankan di background menggunakan PM2
npm install -g pm2
pm2 start index.js --name "rest-api"

```
```

```
