let quantity = 0;

function updateQty(val) {
    const qtyDisplay = document.getElementById('qty');
    quantity += val;
    if (quantity < 0) quantity = 0;
    qtyDisplay.innerText = quantity;
}

function toggleHeart() {
    const heartIcon = document.getElementById('heartBtn');
    heartIcon.classList.toggle('active');
    
    if (heartIcon.classList.contains('active')) {
        heartIcon.classList.replace('fa-regular', 'fa-solid');
    } else {
        heartIcon.classList.replace('fa-solid', 'fa-regular');
    }
}

function addToCart() {
    if (quantity > 0) {
        alert(`Berhasil menambahkan ${quantity} porsi ke keranjang!`);
    } else {
        alert("Pilih jumlah dulu ya!");
    }
}