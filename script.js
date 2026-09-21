const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
        description: "Wireless headphones with clear sound and comfortable design."
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
        description: "Smart watch with fitness tracking and useful features."
    },

    {
        id: 3,
        name: "Casual T-Shirt",
        price: 799,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
        description: "Comfortable and stylish cotton casual T-shirt."
    },

    {
        id: 4,
        name: "Running Shoes",
        price: 1999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
        description: "Lightweight and comfortable running shoes."
    },

    {
        id: 5,
        name: "Backpack",
        price: 999,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
        description: "Strong and spacious backpack for everyday use."
    },

    {
        id: 6,
        name: "Sunglasses",
        price: 599,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
        description: "Stylish sunglasses suitable for everyday use."
    },

    {
        id: 7,
        name: "Bluetooth Speaker",
        price: 1299,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=500&q=80",
        description: "Portable Bluetooth speaker with powerful sound."
    },

    {
        id: 8,
        name: "Handbag",
        price: 1199,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80",
        description: "Elegant and stylish handbag for everyday use."
    }
];

let cart = [];

const productList = document.getElementById("productList");
const search = document.getElementById("search");

function displayProducts(list) {

    productList.innerHTML = "";

    if (list.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
    }

    list.forEach(product => {

        productList.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <button class="view-btn"
                    onclick="viewProduct(${product.id})">
                    View Details
                </button>

                <button class="add-btn"
                    onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;
    });
}



function filterProducts(category) {

    if (category === "all") {
        displayProducts(products);
    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }
}


function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {

        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    alert(product.name + " added to cart!");
}
function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;
}


function openCart() {

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        cart.forEach(item => {

            total += item.price * item.quantity;

            cartItems.innerHTML += `
                <div class="cart-item">

                    <span>
                        <b>${item.name}</b><br>
                        ₹${item.price} × ${item.quantity}
                    </span>

                    <div>

                        <button onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                        <button onclick="changeQuantity(${item.id}, -1)">
                            -
                        </button>

                        <button class="remove"
                            onclick="removeFromCart(${item.id})">
                            Remove
                        </button>

                    </div>

                </div>
            `;
        });
    }

    cartTotal.textContent = total;

    document.getElementById("cartModal").style.display = "flex";
}


function closeCart() {
    document.getElementById("cartModal").style.display = "none";
}

function changeQuantity(id, change) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCart();
        openCart();
    }
}


function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

    openCart();
}

function viewProduct(id) {

    const product = products.find(p => p.id === id);

    document.getElementById("detailImage").src = product.image;

    document.getElementById("detailName").textContent =
        product.name;

    document.getElementById("detailDescription").textContent =
        product.description;

    document.getElementById("detailPrice").textContent =
        "₹" + product.price;

    document.getElementById("detailCart").onclick = function () {
        addToCart(product.id);
        closeProduct();
    };

    document.getElementById("productModal").style.display = "flex";
}

function closeProduct() {
    document.getElementById("productModal").style.display = "none";
}


function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert(" Order placed successfully!");

    cart = [];

    updateCart();

    closeCart();
}

search.addEventListener("input", function () {

    const value = search.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});


displayProducts(products);
