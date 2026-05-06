const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ============================================================
// KONFIGURASI — isi di Render sebagai Environment Variables
// TELEGRAM_BOT_TOKEN = token dari @BotFather
// TELEGRAM_CHAT_ID   = chat_id kamu (pakai @userinfobot untuk cek)
// API_SECRET_KEY     = kunci rahasia bebas, contoh: "bard-secret-2024"
// ============================================================

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID   = process.env.TELEGRAM_CHAT_ID;
const API_SECRET_KEY     = process.env.API_SECRET_KEY || 'bard-secret-2024';

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Bard Notification API is running ✅', version: '1.0.0' });
});

// ── Kirim notifikasi Telegram ──────────────────────────────
app.get('/api/notify', async (req, res) => {
  const { key, message } = req.query;

  if (key !== API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized: invalid key' });
  }

  if (!message) {
    return res.status(400).json({ error: 'Missing message parameter' });
  }

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return res.status(500).json({ error: 'Server not configured: missing BOT_TOKEN or CHAT_ID' });
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: `🔔 *Bard Notification*\n\n${message}`,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram error:', data);
      return res.status(500).json({ error: 'Telegram API error', detail: data.description });
    }

    console.log(`[${new Date().toISOString()}] Notification sent: ${message}`);
    res.json({ success: true, message: 'Notification sent' });

  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to send notification', detail: err.message });
  }
});

// ── Test endpoint ──────────────────────────────────────────
app.get('/api/test', async (req, res) => {
  const { key } = req.query;

  if (key !== API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: '✅ Test berhasil! Bard Notification terhubung dengan Telegram kamu.',
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();
    if (data.ok) {
      res.json({ success: true, message: 'Test notification sent to Telegram!' });
    } else {
      res.status(500).json({ error: data.description });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Bard Notification API running on port ${PORT}`);
});
