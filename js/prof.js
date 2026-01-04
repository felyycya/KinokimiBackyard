const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const eyeIcon = document.getElementById('eyeIcon');

const nameInput = document.querySelector('input[type="text"]');
const emailInput = document.querySelector('input[type="email"]');
const saveBtn = document.querySelector('.save-btn');

// 1. Fungsi Show/Hide Password
togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Ubah warna icon mata saat aktif
    eyeIcon.style.stroke = type === 'text' ? '#0a1d17' : 'black';
});

// 2. Fungsi Cek Form (Aktifkan tombol Save)
function checkForm() {
    if (nameInput.value !== "" && emailInput.value !== "" && passwordInput.value !== "") {
        saveBtn.classList.add('active');
    } else {
        saveBtn.classList.remove('active');
    }
}

// Jalankan cekForm setiap kali user mengetik
nameInput.addEventListener('input', checkForm);
emailInput.addEventListener('input', checkForm);
passwordInput.addEventListener('input', checkForm);

// 3. Fungsi Save Changes
saveBtn.addEventListener('click', function() {
    alert("Changes Saved Successfully!");
    // Di sini kamu bisa tambahkan kode untuk kirim data ke database
});

// Ambil elemen berdasarkan ID
const uploadInput = document.getElementById("upload");
const profileImage = document.getElementById("profilePic");

// Logika saat user memilih file
uploadInput.addEventListener("change", function () {
  const file = this.files[0]; // Mengambil file yang dipilih
  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      // Mengganti src gambar profil dengan data gambar yang baru
      profileImage.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
});