// Retrieve products and cart data from localStorage
let products = JSON.parse(localStorage.getItem('products')) || {};
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart data to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Log Off Functionality
document.getElementById('logoffButton')?.addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to login page
});

// Update Cart Count in the Top Panel
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    cartCountElement.textContent = cart.length;
}

// Update Categories Section
function updateCategoriesSection() {
    const categoriesSection = document.getElementById('categoriesSection');
    categoriesSection.innerHTML = '';
    const categoryImages = {
            Electronics: 'Electronics.jpg', // Using Electronics.jpg for this category
            Clothing: 'path/to/clothing.jpg',
            Beauty: 'path/to/beauty.jpg',
            Food: 'path/to/food.jpg',
        };
    for (const category in products) {
        if (products[category]?.length > 0) {
            // Create category item
            const categoryItem = document.createElement('div');
            categoryItem.classList.add('category-item');

            const text = document.createElement('span');
            text.textContent = category;
            const image = document.createElement('img');
            image.src = categoryImages[category] || 'path/to/default.jpg';
            image.alt = category;
            categoryItem.appendChild(text);
            categoryItem.appendChild(image);
            // Create products section for this category
            const productsSection = document.createElement('div');
            productsSection.classList.add('products-section');
            categoryItem.addEventListener('click', () => toggleProductsSection(productsSection, category));

            categoriesSection.appendChild(categoryItem);
            categoriesSection.appendChild(productsSection);
        }
    }
}

// Toggle Products Section Visibility
function toggleProductsSection(productsSection, category) {
    const allProductSections = document.querySelectorAll('.products-section');
    allProductSections.forEach(section => section.classList.remove('active')); // Hide all sections

    if (!productsSection.classList.contains('active')) {
        displayProducts(productsSection, category);
        productsSection.classList.add('active'); // Show the selected section
    }
}

// Display Products in a Section
function displayProducts(productsSection, category) {
    productsSection.innerHTML = '';

    if (products[category]) {
        products[category].forEach((product, index) => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');
            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <p><strong>Price:</strong> $${product.price}</p>
                <button class="btn add-to-cart" data-category="${category}" data-index="${index}">Add to Cart</button>
            `;
            productsSection.appendChild(productItem);

            // Add to Cart Button Event
            productItem.querySelector('.add-to-cart').addEventListener('click', () => {
                cart.push(products[category][index]); // Add product to cart
                saveCartToLocalStorage(); // Save updated cart to localStorage
                updateCartCount(); // Update cart count in the UI
                alert(`${products[category][index].name} added to cart!`);
            });
        });
    }
}

// Initialize Buyer Dashboard
function initializeBuyerDashboard() {
    updateCategoriesSection();
    updateCartCount();
}

// Redirect to Cart Page
document.getElementById('cartButton')?.addEventListener('click', function () {
    window.location.href = 'cart.html';
});

initializeBuyerDashboard();
