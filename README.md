# 🚀 REST API Base Dashboard

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&pause=1000&color=00D4FF&center=true&vCenter=true&width=600&lines=Welcome+To+REST+API+Base;Fast+%F0%9F%9A%80+Reliable+%E2%9A%A1;Free+REST+API+Services;Developer+Friendly+API" alt="Typing SVG" />

<br>

<img src="https://img.shields.io/badge/API-ONLINE-success?style=for-the-badge">
<img src="https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-Framework-black?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/Status-Active-green?style=for-the-badge">

</div>

---

# ✨ Tentang Project

REST API Base Dashboard adalah template **REST API** berbasis **Node.js** dan **Express** yang telah dilengkapi berbagai fitur modern untuk mempermudah pengembangan API.

Template ini cocok digunakan sebagai dasar pembuatan:

- 🤖 AI API
- 📥 Downloader API
- 🔍 Search API
- 🖼 Image Generator
- 🎵 Media API
- 📊 Utility API
- ☁️ Cloud Storage API

---

# ✨ Features

```yaml
Authentication:
 ├─ Local Login
 ├─ Google OAuth
 └─ GitHub OAuth

API Key System:
 ├─ Free Tier
 ├─ Premium Tier
 └─ VIP Tier

Storage:
 └─ GitHub Repository Upload (Multi-Repo Support)

Email Service:
 ├─ Reset / Forgot Password
 └─ Feedback Auto-Reply

Dashboard UI:
 ├─ Interactive Music Player
 ├─ Real-time Live Clock & Date
 ├─ Dark / Light Mode Toggle
 └─ Responsive Modern UI

API Engine:
 ├─ Dynamic Route Scanner
 ├─ Standardized JSON Response
 ├─ Buffer / Media Stream Response
 ├─ Rate Limiter Protection
 └─ Reverse Proxy & Trust Proxy Support

```
# 📁 Project Structure
```text
.
├── api/
│   ├── ai/
│   ├── downloader/
│   ├── search/
│   ├── tools/
│   └── ...
│
├── database/
│   ├── notifikasi.js
│   ├── playlist.js
│   ├── PREMIUM_USERS.js
│   └── VIP_USERS.js
│
├── public/
│   ├── home.html
│   ├── login.html
│   └── uploader.html
│
├── index.js
├── script.js
├── styles.css
├── package.json
└── README.md

```
# 🔑 Setup Credentials & API Keys
Panduan langkah demi langkah untuk mendapatkan seluruh kredensial dan API Key yang dibutuhkan oleh sistem:
## 1. MongoDB Atlas Connection String
Digunakan sebagai database utama untuk menyimpan data akun pengguna, role, dan session.
 * **URL Pendaftaran:** https://www.mongodb.com/products/platform/atlas-database?hl=id-ID
### Langkah Pendaftaran:
 1. Buat akun dan masuk ke dashboard **MongoDB Atlas**.
 2. Buat **Cluster** baru (pilih opsi *Free / Shared*).
 3. Buka menu **Database Access** → Tambahkan pengguna database baru (*Username & Password*).
 4. Buka menu **Network Access** → Klik **Add IP Address** → Masukkan 0.0.0.0/0 (*Allow Access from Anywhere*).
 5. Kembali ke menu **Database** → Klik **Connect** → Pilih **Drivers** (Node.js).
 6. Salin *Connection String* yang diberikan.
**Contoh Format Connection String:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/?appName=Cluster0

```
## 2. Google OAuth Credentials
Digunakan untuk mengaktifkan fitur autentikasi tombol **Login with Google**.
 * **URL Pendaftaran:** https://console.cloud.google.com/?hl=id-ID
### Langkah Pendaftaran:
 1. Masuk ke Google Cloud Console dan buat proyek baru.
 2. Buka menu **APIs & Services** → **OAuth consent screen** → Pilih **External** dan lengkapi data aplikasi.
 3. Buka menu **Credentials** → Klik **Create Credentials** → Pilih **OAuth client ID**.
 4. Pilih *Application type*: **Web application**.
 5. Di bagian **Authorized redirect URIs**, masukkan URL Callback:
   * **Local:** http://localhost:3000/auth/google/callback
   * **Production:** https://domainanda.com/auth/google/callback
 6. Salin **Client ID** (GOOGLE_CLIENT_ID) dan **Client Secret** (GOOGLE_CLIENT_SECRET).
 
## 3. GitHub OAuth Credentials
Digunakan untuk mengaktifkan fitur autentikasi tombol **Login with GitHub**.
 * **URL Pendaftaran:** https://github.com/settings/developers?hl=id-ID
### Langkah Pendaftaran:
 1. Buka menu **OAuth Apps** di GitHub Developer Settings, lalu klik **New OAuth App**.
 2. Isi *Application Name* dan masukkan URL situs Anda di *Homepage URL*.
 3. Masukkan URL Callback pada **Authorization callback URL**:
   * **Local:** http://localhost:3000/auth/github/callback
   * **Production:** https://domainanda.com/auth/github/callback
 4. Klik **Register application**.
 5. Salin **Client ID** (GITHUB_CLIENT_ID) dan klik **Generate a new client secret** untuk mendapatkan GITHUB_CLIENT_SECRET.
 
## 4. GitHub Personal Access Token (PAT)
Digunakan untuk mengintegrasikan sistem Cloud Storage/Uploader agar file diunggah langsung ke Repositori GitHub.
 * **URL Pendaftaran:** https://github.com/settings/tokens?hl=id-ID
### Langkah Pendaftaran:
 1. Klik **Generate new token** → Pilih **Generate new token (classic)**.
 2. Isi kolom *Note* (misal: REST API Storage Token).
 3. Centang cakupan/scope utama:
   * [x] **repo** (*Full control of private repositories*)
 4. Scroll ke bawah, klik **Generate token**.
 5. Salin token rahasia yang muncul (berawalan ghp_...).
 
## 5. Gmail App Password
Digunakan oleh **Nodemailer** untuk mengirimkan email otomatis (Reset Password & Konfirmasi Feedback).
 * **URL Pendaftaran:** https://myaccount.google.com/u/0/apppasswords
### Langkah Pendaftaran:
 1. Buka Pengaturan Keamanan Google dan pastikan **Verifikasi 2-Langkah (2-Step Verification)** telah **Aktif**.
 2. Buka tautan pendaftaran **App Passwords** di atas.
 3. Buat nama aplikasi baru (misal: REST API Mailer).
 4. Klik **Create**, Google akan menampilkan **16 karakter kode rahasia**.
 5. Masukkan alamat email Anda ke EMAIL_USER dan 16 karakter kode tersebut ke EMAIL_PASS.
# ⚙️ Environment Variables
Buat berkas bernama **.env** di direktori utama (root) proyek Anda dan masukkan konfigurasi berikut:
```env
# SERVER CONFIGURATION
PORT=3000
BASE_URL=http://localhost:3000

# DATABASE
MONGODB_URI=mongodb+srv://username:password@cluster0.xxx.mongodb.net/?appName=Cluster0

# SECURITY (Ganti dengan string acak buatan Anda)
SESSION_SECRET=secret_session_key_change_me
JWT_SECRET=secret_jwt_key_change_me

# GITHUB OAUTH
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# GOOGLE OAUTH
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# GITHUB STORAGE / UPLOADER
GITHUB_OWNER=YOUR_GITHUB_USERNAME
GITHUB_TOKEN=ghp_YOUR_PERSONAL_ACCESS_TOKEN_HERE

# EMAIL SERVICE (GMAIL)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx

```
> **Catatan:** Pastikan Anda telah menginstall modul dotenv (npm i dotenv) dan menambahkan kode require("dotenv").config(); di baris paling atas berkas index.js.
> 
# 📦 Cara Membuat Endpoint Baru
Seluruh berkas endpoint disimpan secara terstruktur di folder:
```text
api/<kategori>/<nama_endpoint>.js

```
## 1. JSON Response
```javascript
const express = require("express");
const router = express.Router();

// Metadata Endpoint (Opsional)
router.type = "free";    // Akses: "free" | "premium" | "vip"
router.status = "ready";   // Status: "ready" | "perbaikan"

router.get("/", async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status: false,
            message: "Missing 'url' parameter"
        });
    }

    try {
        return res.json({
            status: true,
            creator: "API Developer",
            result: {
                url_input: url
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

module.exports = router;

```
## 2. Buffer / Stream Response (Gambar, Audio, File)
```javascript
const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.type = "free";
router.status = "ready";

router.get("/", async (req, res) => {
    const imageUrl = req.query.url || "[https://dummyjson.com/image/400x200](https://dummyjson.com/image/400x200)";

    try {
        const buffer = await fetch(imageUrl).then(v => v.buffer());

        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": buffer.length
        });

        return res.end(buffer);
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

module.exports = router;

```
# 🚀 Deployment
## 1. Deploy ke Vercel
 1. **Fork** repositori ini ke akun GitHub Anda.
 2. Masuk ke dashboard Vercel.
 3. Klik **Add New** → **Project**, lalu impor repositori hasil fork.
 4. Buka menu **Environment Variables**, lalu masukkan seluruh isi berkas .env.
 5. Klik **Deploy** dan tunggu proses pembuatan selesai.
## 2. Deploy ke VPS / Server Lokal
### Clone Repository:
```bash
git clone [https://github.com/username/repository.git](https://github.com/username/repository.git)
cd repository

```
### Install Dependencies:
```bash
npm install

```
### Jalankan Server:
```bash
# Pengujian Lokal
npm start

# Running di Background dengan PM2 (Rekomendasi VPS)
npm install -g pm2
pm2 start index.js --name "rest-api"

```
# ❤️ Support
Apabila project ini bermanfaat untuk Anda, jangan lupa berikan ⭐ Star pada repositori GitHub ini!
<div align="center">
Made with ❤️ using **Node.js** & **Express**
</div>
```
