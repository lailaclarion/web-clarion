document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxSrWtR7ViBrmAgjzayuTkcCXkGBnCyA_ByhtUwK1WRVl0sZp-YNb-zNuB8-eIkxKORoQ/exec';
    
    // Ambil data
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // Gunakan URLSearchParams agar e.parameter di Apps Script terbaca sempurna
    const params = new URLSearchParams();
    params.append('nama', nama);
    params.append('wa', wa);
    params.append('kota', kota);
    params.append('sumber', sumber);
    params.append('budget', budget);
    params.append('pesan', pesan);

    // Siapkan Link WA
    const nomorAdmin = "6281378699699"; 
    const teksPesan = `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A*Nama:* ${nama}%0A*WhatsApp:* ${wa}%0A*Kota:* ${kota}%0A*Sumber Air:* ${sumber}%0A*Estimasi Budget:* ${budget}%0A*Keluhan:* ${pesan}`;
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // Jalankan fetch
    fetch(scriptURL, { 
        method: 'POST', 
        body: params, // Ganti FormData ke params (URLSearchParams)
        mode: 'no-cors' 
    })
    .then(() => {
        // Pindah ke WA SETELAH fetch selesai (lebih aman daripada timeout)
        window.location.assign(urlWA);
    })
    .catch(error => {
        console.error('Error!', error.message);
        // Tetap pindah ke WA walau sheet gagal agar user tidak stuck
        window.location.assign(urlWA);
    });
});
