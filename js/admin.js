document.addEventListener("DOMContentLoaded", () => {
    // 1. Logika Navigasi Sidebar Otomatis (Menggunakan data-page)
    const menuItems = document.querySelectorAll('.nav-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                window.location.href = targetPage;
            }
        });
    });

    // 2. Logika Modal Tambah (Khusus di halaman Promo)
    const btnTambah = document.querySelector('.btn-tambah');
    if (btnTambah) {
        btnTambah.onclick = function() {
            const modal = document.getElementById('modalTambah');
            if (modal) modal.style.display = 'block';
        };
    }
});

// 3. Fungsi Menghapus Baris Promo (Tombol Hide di halaman Promo)
function hapusBaris(btn) {
    const row = btn.closest('tr');
    if (row) row.remove();
}

// 4. Fungsi Menghapus Rating (Tombol Sampah di halaman Rating)
function hapusRating(btn) {
    const item = btn.closest('.rating-item');
    if (item) {
        // Cek jika ada garis (hr) setelahnya, ikut dihapus agar rapi
        const divider = item.nextElementSibling;
        item.remove();
        if (divider && divider.tagName === "HR") {
            divider.remove();
        }
    }
}

// 5. Fungsi Simpan Promo Baru (Halaman Promo)
function simpanPromo() {
    const input = document.getElementById('inputNamaPromo');
    if (!input) return;
    
    const namaPromo = input.value;
    if (namaPromo.trim() === "") {
        alert("Nama promo tidak boleh kosong!");
        return;
    }

    const tableBody = document.querySelector('.promo-table tbody');
    if (tableBody) {
        const row = tableBody.insertRow(); 
        row.innerHTML = `
            <td>${namaPromo}</td>
            <td>
                <div class="status-actions">
                    <button class="btn-post">Post</button>
                    <button class="btn-hide" onclick="hapusBaris(this)">Hide</button>
                </div>
            </td>
        `;
        input.value = "";
        tutupModal();
    }
}

function tutupModal() {
    const modal = document.getElementById('modalTambah');
    if (modal) modal.style.display = 'none';
}