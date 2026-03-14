const scriptURL = "https://script.google.com/macros/s/AKfycbyAIEt5Rb9bmyKB-r2HzO_iVD3DrvlM-Z08lj8BlaEHzDlG-B3a_WjjTg5ovWDdDQf-4g/exec";
const form = document.getElementById("clarionForm");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        let nama = document.getElementById("nama").value;
        let wa = document.getElementById("wa").value;
        let kota = document.getElementById("kota").value; 
        let sumber = document.getElementById("sumber").value;
        let budget = document.getElementById("budget").value; 
        let pesanMasalah = document.getElementById("pesan").value;

        const btn = form.querySelector('button');
        btn.innerText = "MENGIRIM...";
        btn.disabled = true;

        // Siapkan Link WA
        let pesanWA = `*KONSULTASI FILTER AIR CLARION*%0A` +
                      `-------------------------------------------%0A` +
                      `*Nama:* ${nama}%0A` +
                      `*WhatsApp:* ${wa}%0A` +
                      `*Kota/Kabupaten:* ${kota}%0A` +
                      `*Sumber Air:* ${sumber}%0A` +
                      `*Estimasi Budget:* ${budget}%0A` +
                      `*Masalah Air:* ${pesanMasalah}%0A` +
                      `-------------------------------------------%0A` +
                      `_Mohon info solusi dan harganya._`;

        const waLink = "https://wa.me/6281378699699?text=" + pesanWA;

        // FAILSAFE: Jika dalam 2.5 detik Sheet belum respon, langsung buka WA saja
        const fallback = setTimeout(() => {
            window.open(waLink, "_blank");
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
        }, 2500);

        // Kirim ke Google Sheet
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", 
            body: JSON.stringify({
                nama: nama,
                wa: wa,
                kota: kota,
                sumber: sumber,
                budget: budget,
                masalah: pesanMasalah
            })
        })
        .then(() => {
            clearTimeout(fallback); // Batalkan failsafe karena sukses
            window.open(waLink, "_blank");
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
            form.reset();
        })
        .catch(error => {
            console.error("Sheet Error:", error);
            // Tetap buka WA jika error
            clearTimeout(fallback);
            window.open(waLink, "_blank");
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
        });
    });
}
