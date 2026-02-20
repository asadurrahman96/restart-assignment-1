const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => displayCategories(categories))
   
};
const loadProducts = (category) => {
    const url = `https://fakestoreapi.com/products/category/${category}`;
    
    fetch(url)
     .then(res => res.json())
    .then(data => displayProducts(data))
}

const displayProducts = (products) => {
    const productsGrid = document.getElementById("products-grid");
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
                        <button  class="text-xs font-bold border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition"> <i class="fa-regular fa-eye"></i> Details</button>
                        <button  class="text-xs font-bold bg-violet-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Add to Cart</button>
                    </div>
        
        `;
        productsGrid.appendChild(productDiv);
    });
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("products-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const buttonDiv = document.createElement("div");
        buttonDiv.innerHTML = `
            <button class="cat-btn px-5 py-2 rounded-full border  font-medium hover:bg-violet-600 hover:text-white transition capitalize">
                ${category}
            </button>
        `;
        const btn = buttonDiv.querySelector('button');
        btn.addEventListener('click', () => {
            loadProducts(category);
        });

        categoryContainer.append(buttonDiv);
    });
};

loadProducts();
loadCategories();