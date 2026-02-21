
let cart = [];
let currentProducts = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
    displayCart();
}


function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}


function addToCart(productId) {
    const product = currentProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

function removeFromCart(i) {
    cart.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}


function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let total = 0;
    let cartArray = '';
    
    cart.forEach((item, i) => {
        total += item.price;
        cartArray += `
            <div class="flex items-center justify-between p-3 border-b border-gray-200">
                <div class="flex-1">
                    <h4 class="text-sm font-bold line-clamp-2">${item.title}</h4>
                    <p class="text-violet-600 font-bold">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeFromCart(${i})" class="ml-2 text-red-600 hover:text-red-800 font-bold">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartArray;
    cartTotal.textContent = '$' + total.toFixed(2);
}

const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => displayCategories(categories))
   
};
const loadProducts = (category) => {
    manageSpinner(true);
    const url = `https://fakestoreapi.com/products/category/${category}`;

 
    
    fetch(url)
     .then(res => res.json())
    .then(data => displayProducts(data))
};

const manageSpinner = (status) =>{
    if(status==true){
        document.querySelector('.spinner').parentElement.classList.remove('hidden');
        document.getElementById("products-grid").classList.add('hidden');
    } else {
        document.querySelector('.spinner').parentElement.classList.add('hidden');
        document.getElementById("products-grid").classList.remove('hidden');
    }
}

const displayProducts = (products) => {
    const productsGrid = document.getElementById("products-grid");
    currentProducts = products; 
    
    productsGrid.innerHTML = "";

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
        productDiv.innerHTML = `
           <div class="h-48 mb-4 overflow-hidden rounded-lg flex items-center justify-center p-4">
                        <img src="${product.image}" alt="${product.title}" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                    </div>
                    <div class="flex-grow">
                      <div class="flex items-center gap-10">
                        <span class="text-[10px] uppercase font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">${product.category}</span>
                        <i class="fa-solid fa-star  text-yellow-500"></i>
                        
                        <span class="text-gray-400 ml-1">(${product.rating.count})</span>
                      </div>
                        <h3 class="font-bold mt-2 text-sm line-clamp-2 h-10">${product.title}</h3>
                        <div class="flex items-center gap-1 text-yellow-500 text-xs mt-2">
                            
                        </div>
                        <p class="text-xl font-extrabold text-gray-900 mt-2">$${product.price}</p>
                    </div>
                    <div class="mt-4 grid grid-cols-2 gap-2">
                        <button onclick="loadProductDetail(${product.id})" class="text-xs font-bold border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition">
                            <i class="fa-regular fa-eye"></i> Details
                        </button>
                        <button onclick="addToCart(${product.id})" class="text-xs font-bold bg-violet-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button>
                    </div>
        
        `;
        productsGrid.appendChild(productDiv);
    });
    manageSpinner(false);
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("products-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
            <button class="cat-btn px-5 py-2 rounded-full border border-gray-300 font-medium hover:bg-violet-600 hover:text-white transition capitalize">
                ${category}
            </button>
        `;
        const btn = buttonDiv.querySelector('button');
        btn.addEventListener('click', () => {
            const allButtons = document.querySelectorAll('.cat-btn');
            allButtons.forEach(button => {
                button.classList.remove('bg-violet-600', 'text-white');
                button.classList.add('border-gray-300');
            });
            btn.classList.add('bg-violet-600', 'text-white');
            btn.classList.remove('border-gray-300');
            loadProducts(category);
        });

        categoryContainer.append(buttonDiv);
    });
};

const loadProductDetail = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => displayModal(data));
}

const displayModal = (product) => {
    const modal = document.getElementById('product-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
        <div class="flex items-center justify-center bg-gray-50 p-6 rounded-xl">
            <img src="${product.image}" class="max-h-64 object-contain" />
        </div>
        <div class="space-y-4">
            <span class="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full capitalize">${product.category}</span>
            <h2 class="text-2xl font-bold text-gray-900 leading-tight">${product.title}</h2>
            <div class="flex items-center gap-2">
                <span class="text-yellow-500"><i class="fa-solid fa-star"></i> ${product.rating.rate}</span>
                <span class="text-gray-400 text-sm">| ${product.rating.count} reviews</span>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed">${product.description}</p>
            <p class="text-3xl font-extrabold text-gray-900">$${product.price}</p>
            <button class="w-full bg-violet-600 text-white py-3 rounded-xl font-bold hover:bg-violet-700 transition shadow-lg">
                Buy Now
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
}


const closeModal = () => {
    document.getElementById('product-modal').classList.add('hidden');
}


loadProducts();
loadCategories();
loadCart();