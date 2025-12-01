// TrendyTrove - JavaScript actions will come here later

// let cart = JSON.parse(localStorage.getItem("cart")) || []; is the correct way
// to initialize the cart from local storage.
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".product button");
addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.parentElement;
        const name = product.querySelector("h3").innerText;
        const price = product.querySelector("p").innerText;
        const image = product.querySelector("img");
        
        // Ensure image and its source (src) exist before accessing them
        const item = { 
            name: name, 
            price: price, 
            src: image ? image.getAttribute('src') : '', 
            alt: image ? image.getAttribute('alt') : ''
        };
        
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});

// --------------------------------------------------------------
// CART DISPLAY LOGIC 
// --------------------------------------------------------------

function displayCart() {
    // Select the container in cart.html where items will be displayed
    const cartContainer = document.querySelector('.cart-items-container');
    let total = 0; 
    let output = '';

    if (!cartContainer) return;

    if (cart.length === 0) {
        output = '<h2>Your cart is empty. Please add some products from the <a href="shop.html">Shop Page</a>.</h2>';
    } else {
        output += '<div class="cart-grid">';
        
        cart.forEach((item, index) => {
            // Extract the numeric price from the string (e.g., "Rs. 450" -> 450)
            // Use 0 if parsing fails
            const priceString = item.price.replace(/[^\d.]/g, ''); 
            const priceValue = parseFloat(priceString) || 0;
            total += priceValue;
            
            output += `
                <div class="cart-item">
                    <img src="${item.src}" alt="${item.alt}" class="cart-img">
                    <div class="cart-details">
                        <h4>${item.name}</h4>
                        <p>Price: ${item.price}</p>
                        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                    </div>
                </div>
            `;
        });
        
        output += '</div>';

        // Summary section
        output += `
            <div class="cart-summary">
                <h3>Grand Total: Rs. ${total.toFixed(2)}</h3>
                <button class="clear-btn" onclick="clearCart()">Clear Cart</button>
            </div>
        `;
    }

    cartContainer.innerHTML = output;
}

function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        localStorage.removeItem("cart");
        cart = []; // Reset the variable
        displayCart(); // Refresh the display
    }
}

function removeItem(index) {
    cart.splice(index, 1); // Remove item at the given index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
    displayCart(); // Refresh the display
}

// Call the function immediately when the page loads (especially on cart.html)
displayCart();


// Contact Form Logic - Form submission ko handle karta hai
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); 
        alert("Message sent successfully! 😊");
        contactForm.reset(); 
    });
}
