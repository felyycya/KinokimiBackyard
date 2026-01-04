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