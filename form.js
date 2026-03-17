document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Mengambil data dari form
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "Tidak ada pesan tambahan";

    // Nomor tujuan (Pastikan menggunakan kode negara 62)
    const nomorAdmin = "6281378699699"; 

    // Menyusun format pesan WhatsApp
    const teksPesan = 
        `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A` +
        `*Nama:* ${nama}%0A` +
        `*WhatsApp:* ${wa}%0A` +
        `*Kota:* ${kota}%0A` +
        `*Sumber Air:* ${sumber}%0A` +
        `*Estimasi Budget:* ${budget}%0A` +
        `*Keluhan:* ${pesan}`;

    // Membuka link WhatsApp
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;
    window.open(urlWA, '_blank');
});
