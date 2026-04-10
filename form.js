document.getElementById('clarionForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxSrWtR7ViBrmAgjzayuTkcCXkGBnCyA_ByhtUwK1WRVl0sZp-YNb-zNuB8-eIkxKORoQ/exec';

    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const kota = document.getElementById('kota').value;
    const sumber = document.getElementById('sumber').value;
    const budget = document.getElementById('budget').value;
    const pesan = document.getElementById('pesan').value || "-";

    const params = new URLSearchParams();
    params.append('nama', nama);
    params.append('wa', wa);
    params.append('kota', kota);
    params.append('sumber', sumber);
    params.append('budget', budget);
    params.append('pesan', pesan);
    params.append('tanggal', new Date().toLocaleString());
    params.append('source', 'Homepage');

    // 1. GOOGLE ADS CONVERSION (Tetap dijalankan di sini sebagai cadangan)
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-18065186210/SsbiCOOX15YcEKK7k6ZD',
            'value': 1.0,
            'currency': 'IDR'
        });
    }

    // 2. SEND TO GOOGLE SHEET
    fetch(scriptURL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
    })
    .then(() => {
        // 3. REDIRECT KE THANK YOU PAGE (Bukan langsung ke WA)
        window.location.href = 'thankyou.html';
    })
    .catch(() => {
        // Jika gagal kirim pun, tetap arahkan ke Thank You Page
        window.location.href = 'thankyou.html';
    });
});
