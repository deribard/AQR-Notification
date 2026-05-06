# Bard Notification
### Panduan Deploy & Install Lengkap

---

## 📁 Struktur File

```
bard-notification/
├── api/                  ← Upload ini ke GitHub, deploy ke Render
│   ├── server.js
│   └── package.json
└── extension/            ← Load ini ke Chrome
    ├── manifest.json
    ├── background.js
    ├── content_scripts/
    │   └── content.js
    ├── popups/
    │   └── popup.html
    └── images/icons/
```

---

## LANGKAH 1 — Buat Bot Telegram

1. Buka Telegram, cari **@BotFather**
2. Ketik `/newbot`
3. Ikuti instruksi → kamu dapat **BOT TOKEN** (contoh: `7123456789:AAHxxx...`)
4. Cari **@userinfobot** di Telegram
5. Kirim pesan apa saja → kamu dapat **CHAT ID** (contoh: `123456789`)
6. ⚠️ Penting: cari bot kamu di Telegram, lalu klik **START**

---

## LANGKAH 2 — Upload API ke GitHub

1. Buka [github.com](https://github.com) → login
2. Klik **"+"** pojok kanan atas → **"New repository"**
3. Nama repo: `bard-notification-api`
4. Klik **"Create repository"**
5. Di halaman repo kosong, klik **"uploading an existing file"**
6. Extract file `bard-notification-api.zip` di komputermu
7. Drag & drop **2 file** dari folder `api/`:
   - `server.js`
   - `package.json`
8. Klik **"Commit changes"**

---

## LANGKAH 3 — Deploy API ke Render (Gratis Selamanya)

1. Buka [render.com](https://render.com) → **Sign up** pakai GitHub
2. Klik **"New +"** → pilih **"Web Service"**
3. Pilih repo `bard-notification-api`
4. Isi setting berikut:

| Setting | Value |
|---|---|
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | Free |

5. Klik **"Create Web Service"**
6. Tunggu deploy selesai (~2 menit)

### Set Environment Variables di Render
Setelah deploy, klik tab **"Environment"** → tambahkan:

| Variable | Value |
|---|---|
| `TELEGRAM_BOT_TOKEN` | token dari @BotFather |
| `TELEGRAM_CHAT_ID` | chat ID dari @userinfobot |
| `API_SECRET_KEY` | kata sandi bebas (contoh: `bard-rahasia-2024`) |

Klik **"Save Changes"** → Render akan restart otomatis.

### Ambil URL Render kamu
Di halaman Web Service, salin URL di bagian atas, contoh:
```
https://bard-notification-api.onrender.com
```

### Verifikasi API
Buka browser, akses:
```
https://[URL_RENDER_KAMU]/
```
Harus muncul:
```json
{"status":"Bard Notification API is running ✅","version":"1.0.0"}
```

---

## LANGKAH 4 — Install Extension di Chrome

1. Extract file `bard-notification-extension.zip` di komputermu
2. Buka Chrome → ketik di address bar: `chrome://extensions`
3. Aktifkan **Developer mode** (pojok kanan atas, toggle ON)
4. Klik **"Load unpacked"**
5. Pilih folder `extension/` hasil extract
6. Extension **"Bard Notification"** akan muncul di daftar

> Kalau tidak muncul di toolbar, klik ikon puzzle 🧩 di Chrome → pin "Bard Notification"

---

## LANGKAH 5 — Konfigurasi Extension

1. Klik ikon **Bard Notification** di toolbar Chrome
2. Isi **URL API Server**: `https://[URL_RENDER_KAMU]`
3. Isi **Secret Key**: kata sandi yang kamu set di Render
4. Klik **💾 Simpan Konfigurasi**
5. Klik **📨 Test Kirim ke Telegram**
6. Cek Telegram kamu — harus ada pesan masuk ✅

---

## ✅ Selesai!

Extension sekarang akan:
- 🔔 Kirim notifikasi Telegram saat task tersedia di EWOQ
- 🖥️ Tampilkan notifikasi browser
- 🔄 Auto-refresh halaman saat tidak ada task
- ⏱️ Catat waktu per task (tampil di popup)

---

## ⚠️ Catatan Render Gratis

Server Render gratis akan **"tidur"** jika tidak ada request selama 15 menit. Notifikasi pertama setelah lama tidak aktif bisa telat 30-50 detik karena server perlu "bangun" dulu.

Selama kamu aktif bekerja di EWOQ, extension terus mengirim request sehingga server tidak akan sempat tidur.

---

## 🔧 Troubleshooting

**API tidak bisa diakses:**
- Cek status deploy di Render — pastikan "Live"
- Pastikan environment variables sudah disimpan

**Notifikasi Telegram tidak masuk:**
- Pastikan kamu sudah klik START di bot Telegram kamu
- Cek CHAT_ID benar via @userinfobot

**Extension tidak load:**
- Pastikan folder `extension/` dipilih (bukan file zip-nya)
- Cek tidak ada error di `chrome://extensions`

**Test berhasil tapi saat EWOQ tidak ada notifikasi:**
- Pastikan URL API dan Secret Key sudah disimpan di popup
- Coba refresh halaman EWOQ
