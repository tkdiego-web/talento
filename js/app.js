document.addEventListener("DOMContentLoaded", () => {
  const productosContainer = document.getElementById("productos-container");
  const cartCount = document.getElementById("cart-count"); // Seleccionar el contador del carrito

  // Función para actualizar el contador del carrito
  function actualizarContadorCarrito() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCount.textContent = cart.length; // Actualiza el contenido del span
  }

  // Inicializa el carrito en localStorage si no existe
  function inicializarCarrito() {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([])); // Crear un carrito vacío
    }
    actualizarContadorCarrito(); // Mostrar contador en 0
  }

  function fetchProductos() {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => {
        const primeros10Productos = data.products.slice(0, 10); // Extrae los primeros 10 productos
        console.log(primeros10Productos);

        // Limpia el contenedor de productos
        productosContainer.innerHTML = "";

        // Genera las cards de productos
        primeros10Productos.forEach((product) => {
          const cardDiv = document.createElement("div");
          cardDiv.className = "col-md-3";

          // Accedemos a la primera imagen del array 'images'
          const imageUrl = product.images[0]; 

          cardDiv.innerHTML = `
            <div class="card card-1">
              <img src="${imageUrl}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
              <div class="card-body">
                <h2 class="card-title">${product.title}</h2>
                <p class="card-text">${product.description}</p>
                <div class="price"><strong>$${product.price}</strong></div>
              </div>
              <div class="card-footer text-center">
 <button class="add-to-cart">
           <i class="fas fa-shopping-cart fa-lg"></i> COMPRAR
          </button>

</div>
            </div>
          `;

          // Agregar evento al botón "Agregar"
          const botonAgregar = cardDiv.querySelector("button");
          botonAgregar.addEventListener("click", () => {
            agregarAlCartito(product);
          });

          // Añadir la card al contenedor
          productosContainer.appendChild(cardDiv);
        });
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }

// Función para agregar al carrito usando localStorage y mostrar modal
function agregarAlCartito(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  actualizarContadorCarrito(); // Actualiza el contador del carrito

  // Actualizar contenido del modal
  const modalProductTitle = document.getElementById("modal-product-title");
  modalProductTitle.textContent = `${product.title} ha sido agregado al carrito.`;

  // Mostrar el modal
  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
}

  // Inicializa el carrito y contador al cargar la página
  inicializarCarrito();
  
  // Carga inicial de productos
  fetchProductos();
});
