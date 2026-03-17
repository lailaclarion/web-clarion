document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4lEdGeIuzhwD9rpV2aNV-y7tlHuxjz7BXT4vk_1LlOhGa3KVsQRugD0CutYmf0UYzog/exec';
    const submitButton = e.target.querySelector('.btn-submit');
    
    // 1. Ambil data
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // 2. Siapkan Link WA
    const nomorAdmin = "6281378699699"; 
    const teksPesan = `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A*Nama:* ${nama}%0A*WhatsApp:* ${wa}%0A*Kota:* ${kota}%0A*Sumber Air:* ${sumber}%0A*Estimasi Budget:* ${budget}%0A*Keluhan:* ${pesan}`;
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // 3. LANGSUNG BUKA WHATSAPP (Tanpa nunggu fetch)
    // Ini harus dilakukan pertama agar browser tidak memblokir window.open
    const win = window.open(urlWA, '_blank');
    if (!win) {
        // Jika window.open tetap diblokir, gunakan cara paksa (pindah halaman)
        window.location.href = urlWA;
    }

    // 4. Kirim data ke Google Sheets di background
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
    })
    .then(() => {
        console.log("Data tercatat di Sheets");
    })
    .catch((err) => {
        console.error("Gagal catat di Sheets:", err);
    });

    // 5. Reset form setelah selesai
    e.target.reset();
});
