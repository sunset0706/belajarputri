/**
 * PERINTAH 3: FUNGSI LAPORAN (Bagian dari Module System)
 * Fungsi ini hanya akan berjalan jika key-nya valid.
 */
export function getAdminReport(key) {
    console.log(`TAHAP 3: Meminta laporan dengan key...`);
    
    // Kita cek apakah key-nya valid (walaupun hanya simulasi)
    if (key && key.startsWith('KEY-')) {
        // Jika valid, kembalikan data penghasilan
        return {
            sukses: true,
            judul: "Laporan Penghasilan Bulanan",
            penghasilan: "Rp 75.000.000" // Ini adalah isi laporan
        };
    } else {
        // Jika key tidak valid
        return {
            sukses: false,
            pesan: "Akses ditolak. Key tidak valid."
        };
    }
}