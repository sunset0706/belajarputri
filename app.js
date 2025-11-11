// PERINTAH MODULE SYSTEM: Mengimpor fungsi dari file lain
import { checkAdminLogin, generateAuthKey } from './auth.js';
import { getAdminReport } from './report.js';

// Ambil elemen dari HTML
const loginForm = document.getElementById('login-form');
const messageDisplay = document.getElementById('message-display');
const reportContent = document.getElementById('report-content');

// Tambahkan listener ke tombol login
loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah halaman refresh

    // 1. Ambil data dari form
    const username = event.target.username.value;
    const password = event.target.password.value;

    // 2. Bersihkan tampilan
    tampilkanPesan('Mengecek...', 'loading');
    reportContent.innerHTML = "";

    // === TAHAP 1: Menjalankan FUNGSI CALLBACK ===
    checkAdminLogin(username, password, (error, user) => {
        
        if (error) {
            // Jika login gagal (callback mengembalikan error)
            tampilkanPesan(error, 'error');
            return;
        }

        // Jika login sukses...
        tampilkanPesan(`Login berhasil! Selamat datang, ${user.name}.`, 'success');

        // === TAHAP 2: Menjalankan FUNGSI PROMISE ===
        tampilkanPesan('Membuat session key...', 'loading');
        
        generateAuthKey(user)
            .then(key => {
                // Ini berjalan jika Promise 'resolve' (berhasil)
                tampilkanPesan('Key aman dibuat. Memuat laporan...', 'success');

                // === TAHAP 3: Menjalankan FUNGSI LAPORAN ===
                const laporan = getAdminReport(key);

                if (laporan.sukses) {
                    tampilkanLaporan(laporan);
                } else {
                    tampilkanPesan(laporan.pesan, 'error');
                }
            })
            .catch(err => {
                // Ini berjalan jika Promise 'reject' (gagal)
                console.error(err);
                tampilkanPesan('Gagal membuat session key.', 'error');
            });
    });
});


// --- Fungsi Bantuan untuk Menampilkan Pesan ---

function tampilkanPesan(pesan, status) {
    messageDisplay.textContent = pesan;
    messageDisplay.className = status; // (success, error, atau loading)
}

function tampilkanLaporan(laporan) {
    reportContent.innerHTML = `
        <div class="report-box">
            <h3>${laporan.judul}</h3>
            <p>${laporan.penghasilan}</p>
        </div>
    `;
}