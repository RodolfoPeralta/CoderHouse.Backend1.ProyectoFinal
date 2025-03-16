// Obtain elements from handlebars views documents
const productsContainer = document.getElementsByClassName("productsContainer");

// Events
productsContainer.addEventListener("click", (e) => {
    const productId = e.target.getAttribute("data-id");
    window.location.href(`/views/products/${productId}`);
});