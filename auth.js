/**
 * PERINTAH 1: FUNGSI DENGAN CALLBACK
 * Mengecek username dan password.
 */
export function checkAdminLogin(username, password, callback) {
    console.log("TAHAP 1: Mengecek login (Callback)...");
    
    // Simulasi pengecekan ke database (1 detik)
    setTimeout(() => {
        if (username === 'admin' && password === '123') {
            // Jika benar, kirim 'null' untuk error, dan data 'user'
            const user = { id: 1, name: 'Admin Utama' };
            callback(null, user); 
        } else {
            // Jika salah, kirim pesan error
            callback("Username atau password salah", null);
        }
    }, 1000);
}

/**
 * PERINTAH 2: FUNGSI DENGAN PROMISE
 * Men-generate key setelah login berhasil.
 */
export function generateAuthKey(user) {
    console.log(`TAHAP 2: Membuat key untuk ${user.name} (Promise)...`);
    
    return new Promise((resolve, reject) => {
        // Simulasi proses enkripsi (1.5 detik)
        setTimeout(() => {
            if (user) {
                // Buat key palsu
                const key = `KEY-${user.id}-${Date.now()}`;
                console.log("Key berhasil dibuat:", key);
                // Kirim key jika sukses
                resolve(key);
            } else {
                reject("User tidak valid untuk membuat key");
            }
        }, 1500);
    });
}