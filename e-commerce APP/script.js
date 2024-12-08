// Initialize Buyers Data from localStorage
let buyers = JSON.parse(localStorage.getItem('buyers')) || [];
// Handle Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value; // Role can be 'admin', 'buyer', or 'seller'

    // Admin Login
    if (role === 'admin' && username === 'admin' && password === 'admin123') {
        window.location.href = 'admin.html'; // Redirect to Admin Dashboard
    }
    // Buyer Login
    else if (role === 'buyer') {
        const buyer = buyers.find(buyer => buyer.username === username && buyer.password === password);

        if (buyer) {
            window.location.href = 'buyers-dashboard.html'; // Redirect to Buyer Dashboard
        } else {
            alert('Invalid buyer credentials!');
        }
    }
    // Seller Login
    else if (role === 'seller' && username === 'seller' && password === 'seller123') {
        window.location.href = 'seller.html'; // Redirect to Seller Dashboard
    }
    // Invalid Role or Credentials
    else {
        alert('Invalid username, password, or role!');
    }
});
