import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 4000;

// Backend API Only (Frontend is hosted on GitHub Pages)

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:4000',
  'http://127.0.0.1:4000',
  'https://brainfitnarlidere.github.io'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

const excelPath = path.join(__dirname, 'form.xlsx');
const emailsPath = path.join(__dirname, 'emails.csv');

// Helper to save data to Excel
function saveToExcel(sheetName, data) {
  const absoluteExcelPath = path.resolve(excelPath);
  const backupPath = path.join(__dirname, 'leads_backup.txt');
  
  console.log(`\n--- EXCEL KAYIT İŞLEMİ BAŞLATILDI ---`);
  console.log(`Dosya Yolu: ${absoluteExcelPath}`);
  
  try {
    // 1. Yedek Log Dosyasına Yaz (Her ihtimale karşı)
    const logEntry = `[${new Date().toLocaleString()}] ${JSON.stringify(data)}\n`;
    fs.appendFileSync(backupPath, logEntry);
    console.log(`Yedek log dosyasına yazıldı: ${backupPath}`);

    // 2. Excel İşlemleri
    let workbook;
    if (fs.existsSync(absoluteExcelPath)) {
      console.log('Mevcut Excel dosyası okunuyor...');
      workbook = XLSX.readFile(absoluteExcelPath);
    } else {
      console.log('Yeni Excel dosyası oluşturuluyor...');
      workbook = XLSX.utils.book_new();
    }

    let worksheet = workbook.Sheets[sheetName];
    let existingData = [];
    if (worksheet) {
      existingData = XLSX.utils.sheet_to_json(worksheet);
    }

    existingData.push(data);
    const newWorksheet = XLSX.utils.json_to_sheet(existingData);
    
    // Sütun genişlikleri
    newWorksheet['!cols'] = Object.keys(data).map(() => ({ wch: 25 }));

    if (workbook.SheetNames.includes(sheetName)) {
      workbook.Sheets[sheetName] = newWorksheet;
    } else {
      XLSX.utils.book_append_sheet(workbook, newWorksheet, sheetName);
    }

    // Dosyayı diske yaz
    XLSX.writeFile(workbook, absoluteExcelPath);
    
    // Yazılan dosyayı doğrulamak için tekrar oku (opsiyonel ama güvenli)
    const checkWB = XLSX.readFile(absoluteExcelPath);
    const count = XLSX.utils.sheet_to_json(checkWB.Sheets[sheetName]).length;
    
    console.log(`>>> BAŞARILI <<<`);
    console.log(`Sayfa: ${sheetName} | Toplam Kayıt Sayısı: ${count}`);
    console.log(`------------------------------------\n`);
  } catch (err) {
    console.error(`!!! EXCEL HATASI !!!:`, err.message);
    throw err; 
  }
}

app.use(cors()); // Allow all origins for easier local development
app.use(express.json());

app.post('/email-capture', async (req, res) => {
  const email = (req.body?.email || '').trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'valid email required' });
  }

  try {
    // Save to CSV (keeping existing fallback)
    fs.appendFileSync(emailsPath, `${email},${new Date().toISOString()}\n`);
    
    const now = new Date();
    // Save to Excel
    saveToExcel('Emails', {
      Email: email,
      'Tarih': now.toLocaleDateString('tr-TR'),
      'Saat': now.toLocaleTimeString('tr-TR'),
      Source: 'Popup'
    });
  } catch (err) {
    console.error('Email registration failed', err);
  }

  return res.json({ ok: true });
});

app.post('/lead', async (req, res) => {
  console.log('--- YENİ LEAD TALEBİ ---');
  console.log('Payload:', req.body);

  const now = new Date();
  // Form verilerini Türkçe başlıklarla eşleştir
  const lead = {
    'Ad Soyad': req.body.name || '',
    'Telefon': req.body.phone || '',
    'E-posta': req.body.email || '',
    'Şehir': req.body.city || '',
    'Kim için?': req.body.applicantType || '',
    'Tarih': now.toLocaleDateString('tr-TR'),
    'Saat': now.toLocaleTimeString('tr-TR')
  };

  if (!lead['Ad Soyad'] || !lead['Telefon']) {
    console.error('Eksik bilgi: Ad veya Telefon yok.');
    return res.status(400).json({ error: 'Ad Soyad ve Telefon gereclidir.' });
  }

  try {
    saveToExcel('Leads', lead);
    console.log('Veri Excel\'e başarıyla kaydedildi (form.xlsx)');
  } catch (err) {
    console.error('Lead save error:', err.message);
    let msg = 'Bilgiler kaydedilemedi';
    if (err.message.includes('EBUSY') || err.message.includes('permission denied')) {
      msg = 'Kritik Hata: Excel dosyası (form.xlsx) şu an açık! Lütfen dosyayı kapatıp tekrar deneyin.';
    }
    return res.status(500).json({ error: msg });
  }

  // Email sending is optional, don't block response
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    }).sendMail({
      from: process.env.FROM_EMAIL || 'leads@brainfit.local',
      to: process.env.TO_EMAIL || process.env.SMTP_USER,
      subject: 'Yeni BrainFit Lead',
      text: JSON.stringify(lead, null, 2)
    }).then(() => console.log('E-posta başarıyla gönderildi.'))
      .catch(err => console.error('E-posta gönderim hatası:', err.message));
  }

  return res.json({ ok: true });
});

// Health check and root route
app.get('/', (req, res) => {
  res.send('BrainFit Backend is running! Please use the GitHub Pages URL to view the website.');
});

app.get('/health', (_req, res) => {
  console.log('Health check requested');
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lead API running on port ${PORT} (bound to 0.0.0.0)`);
});
