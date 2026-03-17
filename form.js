document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbz4lEdGeIuzhwD9rpV2aNV-y7tlHuxjz7BXT4vk_1LlOhGa3KVsQRugD0CutYmf0UYzog/exec';
    const submitButton = e.target.querySelector('.btn-submit');
    
    // 1. Ambil data dari form
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    // 2. Siapkan URL WhatsApp
    const nomorAdmin = "6281378699699"; 
    const teksPesan = `Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A` +
                      `*Nama:* ${nama}%0A` +
                      `*WhatsApp:* ${wa}%0A` +
                      `*Kota:* ${kota}%0A` +
                      `*Sumber Air:* ${sumber}%0A` +
                      `*Estimasi Budget:* ${budget}%0A` +
                      `*Keluhan:* ${pesan}`;
    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // 3. Efek Loading pada tombol
    submitButton.disabled = true;
    submitButton.innerText = "MOHON TUNGGU...";

    // 4. Siapkan data untuk dikirim ke Sheets
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('wa', wa);
    formData.append('kota', kota);
    formData.append('sumber', sumber);
    formData.append('budget', budget);
    formData.append('pesan', pesan);

    // 5. Kirim ke Sheets TANPA menunggu balasan untuk membuka WA
    // Kita jalankan kirim data, tapi langsung buka WA tanpa menunggu .then()
    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });

    // Jeda 500ms (setengah detik) agar browser sempat memproses fetch, lalu paksa buka WA
    setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerText = "KONSULTASI VIA WHATSAPP";
        
        // Menggunakan location.href jauh lebih ampuh menembus blokir browser daripada window.open
        window.location.href = urlWA;
        
        e.target.reset();
    }, 500);
});
