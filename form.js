// ===== FORM CLARION CONSULTATION =====

// GANTI dengan URL Google Apps Script kamu
const scriptURL = "https://script.google.com/macros/s/AKfycbxbuobmfzbsnn2l-NRrtTLIEHHNvqd1uK8IAdTF961Ljs3FLaEATcaO9hKFTNCFoao9pQ/exec";

const form = document.getElementById("clarionForm");

if(form){

const masalahSelect = document.getElementById("masalah");
const masalahCustom = document.getElementById("masalahCustom");

// tampilkan kolom masalah custom
masalahSelect.addEventListener("change", function(){

if(this.value === "lainnya"){
masalahCustom.style.display = "block";
}else{
masalahCustom.style.display = "none";
}

});

form.addEventListener("submit", function(e){

e.preventDefault();

let nama = document.getElementById("nama").value;
let wa = document.getElementById("wa").value;
let kota = document.getElementById("kota").value;
let sumber = document.getElementById("sumber").value;
let masalah = document.getElementById("masalah").value;
let custom = document.getElementById("masalahCustom").value;
let pesan = document.getElementById("pesan").value;

// jika pilih lainnya
if(masalah === "lainnya"){
masalah = custom;
}

// kirim ke Google Sheet
fetch(scriptURL,{
method:"POST",
body:JSON.stringify({
nama:nama,
wa:wa,
kota:kota,
sumber:sumber,
masalah:masalah,
pesan:pesan
})
})
.catch(error => console.log(error));

// pesan WhatsApp
let pesanWA = `Halo Clarion, saya ingin konsultasi filter air.

Nama: ${nama}
WhatsApp: ${wa}
Kota: ${kota}
Sumber Air: ${sumber}
Masalah Air: ${masalah}

Pesan Tambahan:
${pesan}`;

// buka WhatsApp
window.location.href =
"https://wa.me/6281378699699?text=" + encodeURIComponent(pesanWA);

});

}