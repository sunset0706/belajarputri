const express = require('express');
const path = require('path'); // Modul 'path' ini penting
const app = express();
const PORT = 3000;

// --- Perbaikan Dimulai Di Sini ---

// 1. Tetap gunakan express.static
// Ini WAJIB ada agar server bisa mengirim file CSS dan JS Anda
// (seperti style.css, app.js, auth.js, report.js)
app.use(express.static(path.join(__dirname)));

// 2. Tambahkan route manual untuk halaman utama ('/')
// Ini secara JELAS memberi tahu server:
// "Jika ada yang minta halaman '/', kirimkan file 'index.html'"
// Inilah yang memperbaiki error 'Cannot GET /'
app.get('/', (req, res) => {
    // path.join(__dirname, 'index.html') akan membuat alamat file yang lengkap
    // seperti 'C:\proyek-login-baru\index.html'
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Akhir Perbaikan ---

// Bagian ini sudah benar, tidak perlu diubah
app.listen(PORT, () => {
    console.log(`Server Anda sekarang berjalan di http://localhost:${PORT}`);
    console.log('Silakan buka alamat tersebut di browser Anda.');
});