const products = [
    { id: 1, name: "Kaos Premium", price: 1500000, image: "./foto/prdk1.jpg" },
    { id: 2, name: "Jasa Pembuatan Website", price: 2000000, image: "./foto/prdk2.jpg" },
    { id: 3, name: "Konsultasi IT", price: 5000000, image: "./foto/prdk3.jpg" },
];

const productListElement = document.querySelector(".product-list");
const cartItemsElement = document.querySelector(".cart-items");
const totalPriceElement = document.getElementById("total-price");

let cart = [];

function renderProducts() {
    productListElement.innerHTML = "";
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" />
            <h3>${product.name}</h3>
            <p>Harga: Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${product.id})">Tambah ke Keranjang</button>
        `;

        productListElement.appendChild(productCard);
    });
}

function renderCart() {
    cartItemsElement.innerHTML = "";
    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Keranjang kosong</p>";
        totalPriceElement.textContent = "0";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        const itemElement = document.createElement("p");
        itemElement.textContent = `${product.name} x ${item.quantity} = Rp ${(product.price * item.quantity).toLocaleString()}`;
        cartItemsElement.appendChild(itemElement);
        total += product.price * item.quantity;
    });

    totalPriceElement.textContent = total.toLocaleString();
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ productId, quantity: 1 });
    }
    renderCart();
}

function generateWhatsAppMessage() {
    if (cart.length === 0) {
        return "Keranjang belanja Anda kosong.";
    }
    let message = "Halo, saya ingin membeli produk berikut:%0A";
    cart.forEach(item => {
        const product = products.find(p => p.id === item.productId);
        message += `- ${product.name} x ${item.quantity}%0A`;
    });
    const total = cart.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + product.price * item.quantity;
    }, 0);
    message += `Total harga: Rp ${total.toLocaleString()}`;
    return message;
}

document.getElementById("whatsapp-buy-btn").addEventListener("click", () => {
    const phoneNumber = "6283170914410";
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
});

renderProducts();
renderCart();
