function goUser() {
  window.location.href ="login.html";
}

function goAdmin() {
  window.location.href = "lgnadm.html";
}

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const toggleIcon = document.querySelector(".toggle-password");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggleIcon.textContent = "🙈"; // mata tertutup
  } else {
    passwordInput.type = "password";
    toggleIcon.textContent = "👁"; // mata terbuka
  }
}

const list = document.getElementById("commentList");
const send = document.getElementById("send");

let comments = JSON.parse(localStorage.getItem("comments")) || [];

function render() {
    list.innerHTML = "";
    comments.forEach(c => {
        list.innerHTML += `
            <div class="comment-box">
                <strong>${c.name}</strong>
                <p>${c.text}</p>
            </div>
        `;
    });
}

send.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const text = document.getElementById("comment").value;

    if (name && text) {
        comments.push({ name, text });
        localStorage.setItem("comments", JSON.stringify(comments));
        render();
        document.getElementById("name").value = "";
        document.getElementById("comment").value = "";
    }
});

render();

const loggedUser = {
    name: "Kinokimi User",
    email: "user@kinokimi.com"
};

function addComment() {
    const text = document.getElementById("commentText").value;
    if (!text) return;

    const date = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const commentHTML = `
        <div class="comment-card">
            <div class="comment-profile">
                <img src="image/default-profile.png">
            </div>
            <div class="comment-content">
                <div class="comment-top">
                    <h4>${loggedUser.name}</h4>
                    <span class="comment-date">${date}</span>
                </div>
                <p>${text}</p>
            </div>
        </div>
    `;

    document.getElementById("commentList")
        .insertAdjacentHTML("beforeend", commentHTML);

    document.getElementById("commentText").value = "";
}

document.addEventListener("DOMContentLoaded", function() {
    
    // Logika klik untuk Branch Coffee
    const branchCards = document.querySelectorAll('.branch-card');
    
    branchCards.forEach(card => {
        // Efek interaksi saat kursor masuk (selain CSS)
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = "0px 10px 20px rgba(0,0,0,0.4)";
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = "none";
        });

        // Klik untuk buka Google Maps
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-location');
            window.open(url, '_blank');
        });
    });

    // Opsional: Animasi smooth scroll jika link di klik
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});


// ADD COMMENT

function addComment() {
    // 1. Ambil elemen input dan list komentar
    const commentText = document.getElementById('commentText');
    const commentList = document.getElementById('commentList');

    // 2. Validasi: Jangan kirim kalau teks kosong
    if (commentText.value.trim() === "") {
        alert("Silakan isi komentar terlebih dahulu!");
        return;
    }

    // 3. Buat tanggal otomatis
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-GB', options);

    // 4. Buat struktur kartu komentar baru (sesuai desain kamu)
    const newComment = document.createElement('div');
    newComment.className = 'comment-card';
    newComment.innerHTML = `
        <div class="comment-profile">
            <img src="image/prop.jpg"> </div>
        <div class="comment-content">
            <div class="comment-top">
                <h4>User_Baru</h4>
                <span class="comment-date">${dateStr}</span>
            </div>
            <p>"${commentText.value}"</p>
        </div>
    `;

    // 5. Masukkan ke bagian paling atas list komentar
    commentList.prepend(newComment);

    // 6. Kosongkan kembali kotak input
    commentText.value = "";
}

document.addEventListener('DOMContentLoaded', displayCart);

function displayCart() {
    const wrapper = document.getElementById('cart-items-wrapper');
    const tableSection = document.getElementById('table-input-section');
    const paymentSection = document.getElementById('payment-section');
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];

    if (cart.length === 0) {
        wrapper.innerHTML = `
            <div class="empty-cart">
                <p>Anda belum memesan.</p>
                <a href="food.html">Pesan Sekarang</a>
            </div>`;
        tableSection.style.display = 'none';
        paymentSection.style.display = 'none';
        return;
    }

    tableSection.style.display = 'block';
    paymentSection.style.display = 'block';
    
    wrapper.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span class="btn-delete" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i> hapus</span>
            <img src="${item.image}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Rp.${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="qty-control">
                <button onclick="updateQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

// tambah keranjang

// Jalankan fungsi update notif setiap kali halaman dibuka
document.addEventListener('DOMContentLoaded', updateCartBadge);

function addToCart(event, name, price, image) {
    event.stopPropagation(); // Biar tidak pindah ke halaman detail

    // 1. Ambil data keranjang yang sudah ada (jika belum ada, buat array kosong)
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];

    // 2. Masukkan item baru
    const item = {
        name: name,
        price: price,
        image: image,
        qty: 1
    };

    // Cek apakah barang sudah ada di keranjang? Kalau ada, tambah jumlahnya saja
    const existingItem = cart.find(i => i.name === name);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push(item);
    }

    // 3. Simpan kembali ke LocalStorage
    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));

    // 4. Update angka di navbar
    updateCartBadge();

    alert(name + " berhasil masuk keranjang!");
}

function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];
    
    // Hitung total item
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);

    if (totalItems > 0) {
        badge.innerText = totalItems;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }
}


// MENU
// Fungsi ini akan berjalan otomatis setiap kali halaman apa pun dibuka
document.addEventListener('DOMContentLoaded', () => {
    console.log("JavaScript Kinokimi Siap!");
    updateCartBadge(); // Update angka merah di navbar

    // Jika di halaman tersebut ada element 'cart-items-wrapper', berarti itu halaman keranjang
    if (document.getElementById('cart-items-wrapper')) {
        displayCart();
    }
});

// --- FUNGSI TAMBAH BARANG (Untuk Halaman Menu) ---
function addToCart(event, name, price, image) {
    // 1. Stop agar klik tidak tembus ke card (detail)
    event.stopPropagation(); 

    // 2. Ambil data keranjang dari memori browser
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];

    // 3. Cek apakah barang sudah ada di list?
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.qty += 1; // Jika ada, tambah jumlah saja
    } else {
        // Jika belum ada, masukkan data baru
        cart.push({
            name: name,
            price: price,
            image: image,
            qty: 1
        });
    }

    // 4. Simpan kembali ke memori browser
    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));

    // 5. Update angka notif merah di navbar
    updateCartBadge();

    alert(name + " berhasil ditambahkan!");
}

// --- FUNGSI UPDATE NOTIF MERAH (Untuk Navbar) ---
function updateCartBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];
    
    // Hitung total semua jumlah (qty) barang
    const totalItems = cart.reduce((total, item) => total + item.qty, 0);

    if (totalItems > 0) {
        badge.innerText = totalItems;
        badge.style.display = 'block'; // Tampilkan badge
    } else {
        badge.style.display = 'none'; // Sembunyikan jika kosong
    }
}

// --- FUNGSI TAMPILKAN ORDERAN (Untuk Halaman Cart) ---
function displayCart() {
    const wrapper = document.getElementById('cart-items-wrapper');
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];

    if (cart.length === 0) {
        wrapper.innerHTML = `
            <div style="text-align:center; padding: 50px 0; color: white;">
                <p>Anda belum memesan.</p>
                <a href="food.html" style="color:#cc922e; text-decoration: underline;">Pesan Sekarang</a>
            </div>`;
        return;
    }

    wrapper.innerHTML = cart.map((item, index) => `
        <div class="cart-item" style="background: #d9d9d9; border-radius: 20px; display: flex; align-items: center; margin-bottom: 20px; overflow: hidden; position: relative;">
            <img src="${item.image}" style="width: 150px; height: 120px; object-fit: cover;">
            <div class="cart-info" style="padding: 15px; flex: 1; color: black;">
                <h3 style="font-size: 1rem; margin-bottom: 5px;">${item.name}</h3>
                <p style="font-weight: bold;">Rp.${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="qty-control" style="background: #0f2a20; color: white; display: flex; align-items: center; gap: 15px; padding: 5px 15px; border-radius: 20px; margin-right: 20px;">
                <button onclick="changeQuantity(${index}, -1)" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQuantity(${index}, 1)" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;">+</button>
            </div>
            <span onclick="deleteItem(${index})" style="position: absolute; right: 15px; top: 10px; color: red; font-size: 11px; cursor: pointer; font-weight: bold;">HAPUS</span>
        </div>
    `).join('');
}

// Fungsi Tambah/Kurang Qty di Halaman Cart
function changeQuantity(index, delta) {
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart'));
    cart[index].qty += delta;
    if (cart[index].qty < 1) cart[index].qty = 1;
    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// Fungsi Hapus Barang di Halaman Cart
function deleteItem(index) {
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart'));
    cart.splice(index, 1);
    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));
    displayCart();
    updateCartBadge();
}

// MENU2
document.addEventListener('DOMContentLoaded', displayCart);

function displayCart() {
    const wrapper = document.getElementById('cart-items-wrapper');
    const tableSection = document.getElementById('table-input-section');
    const paymentSection = document.getElementById('payment-section');
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];

    if (cart.length === 0) {
        wrapper.innerHTML = `
            <div class="empty-cart">
                <p>Anda belum memesan.</p>
                <a href="food.html">Pesan Sekarang</a>
            </div>`;
        tableSection.style.display = 'none';
        paymentSection.style.display = 'none';
        return;
    }

    tableSection.style.display = 'block';
    paymentSection.style.display = 'block';
    
    wrapper.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <span class="btn-delete" onclick="removeItem(${index})"><i class="fa-solid fa-trash"></i> hapus</span>
            <img src="${item.image}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>Rp.${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="qty-control">
                <button onclick="updateQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty(${index}, 1)">+</button>
            </div>
        </div>
    `).join('');
}

function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart'));
    cart[index].qty += change;

    if (cart[index].qty < 1) cart[index].qty = 1;

    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart'));
    cart.splice(index, 1);
    localStorage.setItem('kinokimi_cart', JSON.stringify(cart));
    displayCart();
}

function processPayment() {
    const tableNum = document.getElementById('table-number').value;
    if(!tableNum) {
        alert("Mohon isi nomor meja terlebih dahulu!");
        return;
    }
    // Simpan nomor meja ke storage untuk halaman payment
    localStorage.setItem('kinokimi_table', tableNum);
    window.location.href = 'payment.html';
}

// Di halaman cart.html
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('kinokimi_cart')) || [];
    const container = document.getElementById('cart-container');

    if (cart.length === 0) {
        container.innerHTML = "<p>Keranjang masih kosong.</p>";
        return;
    }

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" width="50">
            <h4>${item.name}</h4>
            <p>Qty: ${item.qty}</p>
            <p>Harga: Rp ${item.price * item.qty}</p>
        </div>
    `).join('');
}

let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function changeSlide(direction) {
    // Sembunyikan slide saat ini
    slides[currentSlide].classList.remove("active");
    
    // Hitung index slide berikutnya
    currentSlide += direction;
    
    // Looping index agar tidak error
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }
    
    // Tampilkan slide baru
    slides[currentSlide].classList.add("active");
}

// Auto Slide setiap 5 detik
setInterval(() => {
    changeSlide(1);
}, 5000);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

let currentIndex = 0;

function slideBlog(direction) {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.blog-card');
  const wrapper = document.querySelector('.carousel');
  
  // 1. Hitung lebar 1 kartu + gap secara akurat
  const cardWidth = cards[0].offsetWidth; 
  const gap = 30; // Sesuai dengan gap di CSS (.carousel-track)
  const totalStep = cardWidth + gap;

  // 2. Hitung berapa kartu yang bisa tampil dalam satu layar (biasanya 3 di desktop)
  const visibleCards = Math.floor(wrapper.offsetWidth / cardWidth);
  
  // 3. Update index
  currentIndex += direction;

  // BATAS KIRI (Maksimum 0)
  if (currentIndex < 0) {
    currentIndex = 0;
  }

  // BATAS KANAN
  // currentIndex tidak boleh lebih dari (jumlah total kartu - jumlah kartu yang terlihat)
  const maxIndex = cards.length - visibleCards;
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  // 4. Jalankan pergeseran
  track.style.transform = `translateX(-${currentIndex * totalStep}px)`;
}

  document.querySelector('form').addEventListener('submit', function(e) {
    // Mencegah reload halaman
    e.preventDefault(); 
    
    // Langsung pindah ke dashboard
    window.location.href = "dashboard.html";
  });
