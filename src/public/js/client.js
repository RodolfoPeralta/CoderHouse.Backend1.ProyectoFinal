/* ---- CLIENT ---- */

// Connection with the server
const socket = io.connect("http://localhost:8080");

// Obtain elements from handlebars views documents
const productsContainer = document.getElementById("prodContainer");
const formElements = document.getElementById("productsForm");
const sendButton = document.getElementById("send-btn");

// Functions

// Shows products list in realTimeProducts view
function renderProducts(products, error = false) {

    productsContainer.innerHTML = "";

    // Renders in case of error
    if(error) {
        productsContainer.textContent = "Error leyendo productos desde la base de datos.";
        return;
    }

    // Verifies if exists products in the list
    productsContainer.textContent = products.length === 0 ? "No hay productos que mostrar." : "";

    products.forEach((p) => {

        const deleteButton = document.createElement("button");

        const div = document.createElement("div");
        div.setAttribute("class", "item");
    
        deleteButton.innerText = "Eliminar";
        deleteButton.setAttribute("id", p.id);
        deleteButton.setAttribute("class", "del-btn");

        div.innerHTML = `
                    <span>Título:</span> ${p.title} <br>
                    <span>Descripción:</span> ${p.description} <br>
                    <span>Precio:</span> $${p.price} <br>
                    <span>Stock:</span> ${p.stock}
                    `;

        div.appendChild(deleteButton);

        productsContainer.appendChild(div);
    });
}

// Events

socket.on("products", products => {
    renderProducts(products);
});

socket.on("error", products => {
    renderProducts(products, true);
});

// Obtains form values to create a new product
sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    const newProduct = {
        title: formElements[0].value,
        description: formElements[1].value,
        code: formElements[2].value,
        price: parseInt(formElements[3]. value),
        status: formElements[4].checked,
        stock: formElements[5].value,
        category: formElements[6].value
    };

    socket.emit("addProduct", newProduct);
});

productsContainer.addEventListener("click", (e) => {
    const productId = Number(e.target.getAttribute("id"));
    socket.emit("deleteProduct", productId);
});






