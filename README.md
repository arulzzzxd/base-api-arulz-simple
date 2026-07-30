# 🚀 REST API Base Dashboard

<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Poppins&weight=700&size=28&pause=1000&color=00D4FF&center=true&vCenter=true&width=600&lines=Welcome+To+REST+API+Base;Fast+🚀+Reliable+⚡;Free+REST+API+Services;Developer+Friendly+API" alt="Typing SVG"/>

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
Authentication
 ├─ Local Login
 ├─ Google OAuth
 └─ GitHub OAuth

API Key
 ├─ Free
 ├─ Premium
 └─ VIP

Storage
 └─ GitHub Repository Upload

Email
 ├─ Forgot Password
 └─ Feedback Reply

Dashboard
 ├─ Music Player
 ├─ Live Clock
 ├─ Dark Mode
 └─ Responsive UI

API System
 ├─ Dynamic Route Scanner
 ├─ JSON Response
 ├─ Buffer/File Response
 ├─ Rate Limiter
 └─ Proxy Support
```

---

# 📁 Project Structure

```
.
├── api/
│   ├── ai/
│   ├── downloader/
│   ├── search/
│   ├── tools/
│   └── ...
│
├── database/
│   └── linkbio.json
│
├── public/
├── views/
├── middleware/
├── config/
├── index.js
├── package.json
└── README.md
```

---

# 🔑 Setup Credentials

## 1. MongoDB Atlas

Digunakan sebagai database utama.

### Langkah

Url Pendaftaran: https://www.mongodb.com/products/platform/atlas-database?hl=id-ID

1. Buat akun MongoDB Atlas.
2. Buat Cluster.
3. Tambahkan Database User.
4. Izinkan Network Access (`0.0.0.0/0`).
5. Klik **Connect → Drivers**.
6. Salin Connection String.

Contoh:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
```

---

## 2. Google OAuth

Url pendaftaran: https://console.cloud.google.com/?hl=id-ID

Digunakan untuk Login Google.

Buat OAuth Client di Google Cloud.

Redirect URL:

Local

```
http://localhost:3000/auth/google/callback
```

Production

```
https://domainanda.com/auth/google/callback
```

---

## 3. GitHub OAuth

Url pendaftaran:https://github.com/settings/developers?hl=id-ID

Digunakan untuk Login GitHub.

Redirect URL:

Local

```
http://localhost:3000/auth/github/callback
```

Production

```
https://domainanda.com/auth/github/callback
```

---

## 4. GitHub Personal Access Token

Url pendaftaran: https://github.com/settings/tokens?hl=id-ID

Digunakan untuk fitur Cloud Storage.

Scope yang dibutuhkan:

```
repo
```

Contoh:

```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 5. Gmail App Password

Url Pendaftaran:https://myaccount.google.com/u/0/apppasswords

Digunakan oleh Nodemailer.

Aktifkan:

- 2 Step Verification
- App Password

Isi:

```env
EMAIL_USER=example@gmail.com
EMAIL_PASS=xxxxxxxxxxxxxxxx
```

---

# ⚙️ Environment Variables

Buat file **.env**

```env
# SERVER
PORT=3000
BASE_URL=http://localhost:3000

# DATABASE
MONGODB_URI=

# SECURITY
SESSION_SECRET=
JWT_SECRET=

# GITHUB OAUTH
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/auth/github/callback

# GOOGLE OAUTH
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# GITHUB STORAGE
GITHUB_OWNER=
GITHUB_TOKEN=

# EMAIL
EMAIL_USER=
EMAIL_PASS=
```

Jangan lupa install dotenv.

```bash
npm i dotenv
```

Lalu pada `index.js`

```javascript
require("dotenv").config();
```

---

# 📦 Membuat Endpoint

Semua endpoint berada di folder:

```
api/<kategori>/<endpoint>.js
```

---

## JSON Response

```javascript
const express = require("express");
const router = express.Router();

router.type = "free";
router.status = "ready";

router.get("/", async (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.status(400).json({
            status:false,
            message:"Missing url"
        });
    }

    return res.json({
        status:true,
        result:url
    });

});

module.exports = router;
```

---

## Buffer Response

```javascript
const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/", async (req,res)=>{

    const image="https://example.com/image.png";

    const buffer=await fetch(image).then(v=>v.buffer());

    res.writeHead(200,{
        "Content-Type":"image/png",
        "Content-Length":buffer.length
    });

    res.end(buffer);

});

module.exports=router;
```

---


# 🚀 Deployment

## Deploy Vercel

1. Fork repository.
2. Import ke Vercel.
3. Tambahkan Environment Variables.
4. Deploy.

---

## Deploy VPS

Clone repository

```bash
git clone https://github.com/username/repository.git
```

Masuk folder

```bash
cd repository
```

Install

```bash
npm install
```

Jalankan

```bash
npm start
```

Menggunakan PM2

```bash
npm install -g pm2

pm2 start index.js --name rest-api
```

---

# ❤️ Support

Apabila project ini membantu, jangan lupa berikan ⭐ pada repository GitHub.

---

<div align="center">

Made with ❤️ using Node.js & Express

</div>
