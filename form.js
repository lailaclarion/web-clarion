const scriptURL = "https://script.google.com/macros/s/AKfycbyAIEt5Rb9bmyKB-r2HzO_iVD3DrvlM-Z08lj8BlaEHzDlG-B3a_WjjTg5ovWDdDQf-4g/exec";
const form = document.getElementById("clarionForm");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        // Ambil data langsung dari ID
        let nama = document.getElementById("nama").value;
        let wa = document.getElementById("wa").value;
        let kota = document.getElementById("kota").value; 
        let sumber = document.getElementById("sumber").value;
        let budget = document.getElementById("budget").value; 
        let masalah = document.getElementById("masalah").value;

        const btn = form.querySelector('button');
        btn.innerText = "Mengirim...";
        btn.disabled = true;

        // 1. Kirim ke Google Sheet
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", 
            body: JSON.stringify({
                nama: nama,
                wa: wa,
                kota: kota,
                sumber: sumber,
                budget: budget,
                masalah: masalah
            })
        })
        .then(() => {
            lanjutKeWA(nama, wa, kota, sumber, budget, masalah);
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
            form.reset();
        })
        .catch(error => {
            console.error(error);
            lanjutKeWA(nama, wa, kota, sumber, budget, masalah);
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
        });
    });
}

function lanjutKeWA(nama, wa, kota, sumber, budget, masalah) {
    let pesanWA = `*KONSULTASI FILTER AIR CLARION*%0A` +
                  `-------------------------------------------%0A` +
                  `*Nama:* ${nama}%0A` +
                  `*WhatsApp:* ${wa}%0A` +
                  `*Kota/Daerah:* ${kota}%0A` +
                  `*Sumber Air:* ${sumber}%0A` +
                  `*Estimasi Budget:* ${budget}%0A` +
                  `*Masalah Air:* ${masalah}%0A` +
                  `-------------------------------------------%0A` +
                  `_Mohon info solusi dan harganya._`;

    window.open("https://wa.me/6281378699699?text=" + pesanWA, "_blank");
}
