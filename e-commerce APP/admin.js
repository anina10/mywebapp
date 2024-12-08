// Initialize Buyers Data from localStorage
let buyers = JSON.parse(localStorage.getItem('buyers')) || [];

// Save buyers to localStorage
function saveBuyersToLocalStorage() {
    localStorage.setItem('buyers', JSON.stringify(buyers));
}

// Log Off Button Functionality
document.getElementById('logoffAdminButton')?.addEventListener('click', function () {
    window.location.href = 'index.html'; // Redirect to login page
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

// Initialize Admin Dashboard
function initializeAdminDashboard() {
    updateBuyersList();
}

initializeAdminDashboard();
