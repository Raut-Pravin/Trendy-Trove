// TrendyTrove - JavaScript actions will come here laterlet cart = [];
let cart = [];
const addButtons =document.querySelectorAll(".product button");
addButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const product = button.parentElement;
        const name= product.querySelector("h3").innerText;
        const price =product.querySelector("p").innerText;
        const image = product.querySelector("img").src;
        const item = { name, price, image };
        cart.push(item);
        localStorage.setItem("cart",JSON.stringify(cart));
        alert(`${name} added to cart! ■`);
    });
});
