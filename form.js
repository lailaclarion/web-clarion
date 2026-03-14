// GANTI dengan URL Google Apps Script kamu
const scriptURL = "https://script.google.com/macros/s/AKfycbyAIEt5Rb9bmyKB-r2HzO_iVD3DrvlM-Z08lj8BlaEHzDlG-B3a_WjjTg5ovWDdDQf-4g/exec";

const form = document.getElementById("clarionForm");

if(form){
    const masalahSelect = document.getElementById("masalah");
    const masalahCustom = document.getElementById("masalahCustom");

    // Tampilkan kolom masalah custom jika ada
    if(masalahSelect && masalahCustom){
        masalahSelect.addEventListener("change", function(){
            if(this.value === "lainnya"){
                masalahCustom.style.display = "block";
                masalahCustom.required = true;
            } else {
                masalahCustom.style.display = "none";
                masalahCustom.required = false;
            }
        });
    }

    form.addEventListener("submit", function(e){
        e.preventDefault();

        // Ambil data dari elemen (Pastikan ID di HTML sudah sesuai)
        let nama = document.getElementById("nama").value;
        let wa = document.getElementById("wa").value;
        let kota = document.getElementById("kota").value; // Ini untuk Asal Daerah
        let sumber = document.getElementById("sumber").value;
        let budget = document.getElementById("budget").value; // Tambahan Budget
        let masalah = document.getElementById("masalah").value;
        let custom = document.getElementById("masalahCustom") ? document.getElementById("masalahCustom").value : "";
        let pesan = document.getElementById("pesan").value;

        // Jika pilih masalah lainnya
        if(masalah === "lainnya"){
            masalah = custom;
        }

        // Tampilkan loading sederhana pada tombol
        const btn = form.querySelector('button');
        btn.innerText = "Sedang Mengirim...";
        btn.disabled = true;

        // 1. Kirim ke Google Sheet via Fetch
        fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", // Tambahkan ini agar tidak kena error CORS di beberapa browser
            body: JSON.stringify({
                nama: nama,
                wa: wa,
                kota: kota,
                sumber: sumber,
                budget: budget, // Pastikan di Apps Script juga ditambahkan kolom Budget
                masalah: masalah,
                pesan: pesan
            })
        })
        .then(() => {
            console.log("Data tercatat ke Sheets");
            lanjutKeWA();
        })
        .catch(error => {
            console.log(error);
            // Tetap lanjut ke WA meskipun sheet gagal agar tidak kehilangan customer
            lanjutKeWA(); 
        });

        function lanjutKeWA() {
            // 2. Susun pesan WhatsApp
            let pesanWA = `*KONSULTASI FILTER AIR CLARION*\n` +
                          `-------------------------------------------\n` +
                          `*Nama:* ${nama}\n` +
                          `*WhatsApp:* ${wa}\n` +
                          `*Kota/Daerah:* ${kota}\n` +
                          `*Sumber Air:* ${sumber}\n` +
                          `*Estimasi Budget:* ${budget}\n` +
                          `*Masalah Air:* ${masalah}\n\n` +
                          `*Pesan Tambahan:*\n${pesan}\n` +
                          `-------------------------------------------\n` +
                          `_Mohon bantuannya untuk solusi terbaik._`;

            // 3. Buka WhatsApp
            window.location.href = "https://wa.me/6281378699699?text=" + encodeURIComponent(pesanWA);
            
            // Kembalikan tombol
            btn.innerText = "KONSULTASI SEKARANG";
            btn.disabled = false;
        }
    });
}
