// Initialize Buyers, Products, and Cart Data from localStorage
let buyers = JSON.parse(localStorage.getItem('buyers')) || [];
let products = JSON.parse(localStorage.getItem('products')) || {};
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save buyers to localStorage
function saveBuyersToLocalStorage() {
    localStorage.setItem('buyers', JSON.stringify(buyers));
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Log Off Functionality
document.getElementById('logoffAdminButton')?.addEventListener('click', function () {
    window.location.href = 'index.html';
});

document.getElementById('logoffBuyerButton')?.addEventListener('click', function () {
    window.location.href = 'index.html';
});

// Open Add Buyer Popup
document.getElementById('addBuyerButton')?.addEventListener('click', function () {
    document.getElementById('addBuyerPopup').classList.remove('hidden');
});

// Close Add Buyer Popup
document.getElementById('closeBuyerPopupButton')?.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('addBuyerForm').reset(); // Clear the form
    document.getElementById('addBuyerPopup').classList.add('hidden');
});

// Add Buyer Form Submission
document.getElementById('addBuyerForm')?.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('buyerUsername').value;
    const password = document.getElementById('buyerPassword').value;
    const confirmPassword = document.getElementById('buyerConfirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if username already exists
    if (buyers.some(buyer => buyer.username === username)) {
        alert('Username already exists!');
        return;
    }

    // Add new buyer
    buyers.push({ username, password });
    saveBuyersToLocalStorage(); // Persist buyers to localStorage
    updateBuyersList(); // Update buyers list dynamically

    // Reset form and close popup
    document.getElementById('addBuyerForm').reset();
    document.getElementById('addBuyerPopup').classList.add('hidden');
});

// Update Buyers List in the Left Panel
function updateBuyersList() {
    const buyersList = document.getElementById('buyersList');
    if (!buyersList) return; // Ensure this function only runs in Admin Dashboard
    buyersList.innerHTML = '';

    buyers.forEach(buyer => {
        const listItem = document.createElement('li');
        listItem.textContent = buyer.username;
        buyersList.appendChild(listItem);
    });
}

// Update Categories List for the Left Panel (Buyer Dashboard)
function updateCategoryListForBuyer() {
    const categoryList = document.getElementById('buyerCategoryList');
    if (!categoryList) return; // Ensure this function only runs in Buyer Dashboard
    categoryList.innerHTML = `<option value="">Select a category</option>`;

    // Show only categories with products
    for (const category in products) {
        if (products[category].length > 0) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryList.appendChild(option);
        }
    }
}

// Show Products for Selected Category (Buyer Dashboard)
document.getElementById('buyerCategoryList')?.addEventListener('change', function (event) {
    const selectedCategory = event.target.value;
    const productDetails = document.getElementById('buyerProductDetails');
    if (!productDetails) return;
    productDetails.innerHTML = '';

    if (selectedCategory && products[selectedCategory]) {
        products[selectedCategory].forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" style="width:100px; height:100px; float: right; margin-left: 10px; border-radius: 5px; border: 1px solid rgba(255, 255, 255, 0.3);">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <button class="btn add-to-cart" data-category="${selectedCategory}" data-index="${index}">Add to Cart</button>
            `;
            productDetails.appendChild(productItem);
        });

        // Attach event listeners to Add to Cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const category = this.getAttribute('data-category');
                const productIndex = this.getAttribute('data-index');
                const productToAdd = products[category][productIndex];
                cart.push(productToAdd); // Add product to cart
                saveCartToLocalStorage(); // Persist cart
                updateCartCount(); // Update cart count
            });
        });
    }
});

// Update Cart Count in the Top Panel (Buyer Dashboard)
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (!cartCountElement) return; // Ensure this function only runs in Buyer Dashboard
    cartCountElement.textContent = cart.length;
}

// Initialize the Dashboard
function initializeDashboard() {
    updateBuyersList(); // For Admin Dashboard
    updateCategoryListForBuyer(); // For Buyer Dashboard
    updateCartCount(); // For Buyer Dashboard
}

initializeDashboard();
