const loadCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())
    .then(categories => displayCategories(categories))
   
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("products-container");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        const buttonDiv = document.createElement("div");
        buttonDiv.innerText = category;
        buttonDiv.className = "px-5 py-2 rounded-full border border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition capitalize";
        
        categoryContainer.append(buttonDiv);
    });
};

loadCategories();