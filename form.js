document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Ambil data dari input
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // Nomor WhatsApp Tujuan (Ganti dengan nomor admin Clarion)
    const nomorAdmin = "6281378699699"; 

    // Format Pesan
    const teksPesan = 
        `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A` +
        `*Nama:* ${nama}%0A` +
        `*WhatsApp:* ${wa}%0A` +
        `*Kota:* ${kota}%0A` +
        `*Sumber Air:* ${sumber}%0A` +
        `*Budget:* ${budget}%0A` +
        `*Keluhan:* ${pesan}`;

    // URL WhatsApp
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // Buka di tab baru
    window.open(urlWA, '_blank');
});
