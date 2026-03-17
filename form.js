document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbz9qE9R2za0SOX7hxMnTmUGYbmbLOOz2bRmjk3nJK8WqkVr6FeqvSI6L--jWfnrJEw/exec';
    const submitButton = e.target.querySelector('.btn-submit');
    
    // Ambil data
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // Siapkan Link WA
    const nomorAdmin = "6281378699699"; 
    const teksPesan = `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A*Nama:* ${nama}%0A*WhatsApp:* ${wa}%0A*Kota:* ${kota}%0A*Sumber Air:* ${sumber}%0A*Estimasi Budget:* ${budget}%0A*Keluhan:* ${pesan}`;
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // 1. Kirim data ke Google Sheets (Asinkron / Latar Belakang)
    // Kita gunakan navigator.sendBeacon jika tersedia (lebih stabil untuk kirim data sambil pindah halaman)
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('wa', wa);
    formData.append('kota', kota);
    formData.append('sumber', sumber);
    formData.append('budget', budget);
    formData.append('pesan', pesan);

    fetch(scriptURL, { 
        method: 'POST', 
        body: formData, 
        mode: 'no-cors' 
    });

    // 2. EKSEKUSI PINDAH KE WA (Tanpa Jendela Baru agar tidak diblokir browser)
    // Menggunakan timeout sangat singkat agar fetch sempat menembak
    setTimeout(function(){
        window.location.assign(urlWA);
    }, 100);
});
