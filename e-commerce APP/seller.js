// Initialize Product Categories and Products in localStorage
let products = JSON.parse(localStorage.getItem('products')) || {};

// Save products to localStorage
function saveProductsToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Open Add Product Popup
document.getElementById('addProductButton')?.addEventListener('click', function () {
    document.getElementById('addProductPopup').classList.remove('hidden');
    populateCategoryDropdown(); // Populate category dropdown dynamically
});

// Close Add Product Popup
document.getElementById('closeProductPopupButton')?.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('addProductPopup').classList.add('hidden');
});

// Log Off
document.getElementById('logoffSellerButton')?.addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Image Upload and Preview
document.getElementById('productImage')?.addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = `<img src="${e.target.result}" alt="Product Image" style="max-width: 100%; height: auto; border: 1px solid #ccc; margin-top: 10px;">`;
            preview.dataset.imageData = e.target.result; // Store Base64 image data
        };
        reader.readAsDataURL(file);
    }
});

// Add Product Form Submission
document.getElementById('addProductForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const productName = document.getElementById('productName').value;
    const productCategory = document.getElementById('productCategory').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productImage = document.getElementById('imagePreview').dataset.imageData;

    if (!products[productCategory]) {
        products[productCategory] = [];
    }

    products[productCategory].push({
        name: productName,
        description: productDescription,
        image: productImage,
        price: productPrice,
    });

    saveProductsToLocalStorage(); // Persist changes
    updateCategoryList(); // Update categories dynamically
    document.getElementById('addProductForm').reset();
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('addProductPopup').classList.add('hidden');
});

// Populate Categories in Add Product Dropdown
function populateCategoryDropdown() {
    const categoryDropdown = document.getElementById('productCategory');
    categoryDropdown.innerHTML = `
                     <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value = "Home&Kitchen">Home & Kitchen</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
    `;
}

// Update Categories List in the Left Panel
function updateCategoryList() {
    const categoryList = document.getElementById('categoryList');
    categoryList.innerHTML = `<option value="">Select a category</option>`;

    // Show only categories with products
    for (const category in products) {
        if (products[category].length > 0) { // Only include categories with products
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryList.appendChild(option);
        }
    }
}

// Show Products for Selected Category
document.getElementById('categoryList')?.addEventListener('change', function (event) {
    const selectedCategory = event.target.value;
    const productDetails = document.getElementById('productDetails');
    productDetails.innerHTML = '';

    if (selectedCategory && products[selectedCategory]) {
        products[selectedCategory].forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px; float: right; margin-left: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
            `;
            productDetails.appendChild(productItem);
        });
    }
});

// Initialize Dashboard
updateCategoryList();
