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

    const nomorAdmin = "6281378699699";

    const teksPesan =
`Halo Clarion Indonesia, saya ingin konsultasi:%0A%0A
Nama: ${nama}%0A
WhatsApp: ${wa}%0A
Kota: ${kota}%0A
Sumber Air: ${sumber}%0A
Estimasi Budget: ${budget}%0A
Keluhan: ${pesan}`;

    const urlWA = `https://wa.me/${nomorAdmin}?text=${teksPesan}`;

    // GOOGLE ADS CONVERSION
    gtag('event', 'conversion', {
        'send_to': 'AW-18065186210/SsbiCOOX15YcEKK7k6ZD',
        'value': 1.0,
        'currency': 'IDR'
    });

    // SEND TO GOOGLE SHEET
    fetch(scriptURL, {
        method: 'POST',
        body: params,
        mode: 'no-cors'
    });

    // REDIRECT WA
    setTimeout(() => {
        window.location.href = urlWA;
    }, 300);
});
