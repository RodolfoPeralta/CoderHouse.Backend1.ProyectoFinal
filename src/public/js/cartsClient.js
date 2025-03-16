// Obtiene el contenedor de los carritos
const cartContainer = document.getElementById("cartContainer");

if (cartContainer) {
  cartContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("select-cart")) {
        const id = e.target.getAttribute("data-id");

        // Redirigir a la página del carrito seleccionado
        window.location.href = `/views/carts/${id}`;
    }
  });
}
