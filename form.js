document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // URL Web App dari Google Apps Script Anda
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4lEdGeIuzhwD9rpV2aNV-y7tlHuxjz7BXT4vk_1LlOhGa3KVsQRugD0CutYmf0UYzog/exec';
    const submitButton = e.target.querySelector('.btn-submit');
    
    // Ambil data dari elemen form
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // Berikan feedback loading pada tombol
    submitButton.disabled = true;
    submitButton.innerText = "SEDANG MENGIRIM...";

    // 1. Kirim data ke Google Sheets menggunakan fetch
    const formData = new URLSearchParams();
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
        // 2. Setelah data terkirim ke Sheets, arahkan ke WhatsApp
        const nomorAdmin = "6281378699699"; 
        const teksPesan = 
            `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A` +
            `*Nama:* ${nama}%0A` +
            `*WhatsApp:* ${wa}%0A` +
            `*Kota:* ${kota}%0A` +
            `*Sumber Air:* ${sumber}%0A` +
            `*Estimasi Budget:* ${budget}%0A` +
            `*Keluhan:* ${pesan}`;

        const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;
        
        // Kembalikan status tombol
        submitButton.disabled = false;
        submitButton.innerText = "KONSULTASI VIA WHATSAPP";

        // Buka WhatsApp di tab baru
        window.open(urlWA, '_blank');
        
        // Reset isi form
        e.target.reset();
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Maaf, terjadi kesalahan saat mengirim data. Silakan coba lagi.');
        submitButton.disabled = false;
        submitButton.innerText = "KONSULTASI VIA WHATSAPP";
    });
});
