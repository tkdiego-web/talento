document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalGeneralElement = document.getElementById("total-general");
  
    // Función para calcular el total general del carrito
    function calcularTotalGeneral(cart) {
      return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    }
  
    // Función para actualizar el contenido de la tabla del carrito
    function cargarCarrito() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartItemsContainer.innerHTML = ""; // Limpia el contenido previo
  
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<tr><td colspan="6" class="text-center">El carrito está vacío.</td></tr>`;
        totalGeneralElement.textContent = "0";
        return;
      }
  
      cart.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><img src="${item.images[0]}" alt="${item.title}" class="img-thumbnail" style="width: 50px; height: 50px; object-fit: cover;"></td>
          <td>${item.title}</td>
          <td>$${item.price}</td>
          <td>
            <input type="number" class="form-control quantity-input" value="${item.quantity || 1}" data-index="${index}">
          </td>
          <td>$${(item.price * (item.quantity || 1)).toFixed(2)}</td>
          <td>
            <button class="btn btn-danger btn-sm delete-item" data-index="${index}"> <i class="fas fa-trash"></i> Eliminar</button>
          </td>
        `;
        cartItemsContainer.appendChild(row);
      });
  
      // Actualizar el total general
      totalGeneralElement.textContent = calcularTotalGeneral(cart).toFixed(2);
  
      // Añadir eventos a los inputs y botones
      document.querySelectorAll(".quantity-input").forEach(input => {
        input.addEventListener("input", actualizarCantidad);
      });
      document.querySelectorAll(".delete-item").forEach(button => {
        button.addEventListener("click", eliminarProducto);
      });
    }
  
    // Actualiza la cantidad de un producto en el carrito
    function actualizarCantidad(event) {
      const index = event.target.dataset.index;
      const newQuantity = parseInt(event.target.value, 10) || 1;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart[index].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      cargarCarrito(); // Recargar el carrito
    }
  
    // Elimina un producto del carrito
    function eliminarProducto(event) {
      const index = event.target.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.splice(index, 1); // Elimina el producto por índice
      localStorage.setItem("cart", JSON.stringify(cart));
      cargarCarrito(); // Recargar el carrito
    }
  
    // Cargar el carrito al cargar la página
    cargarCarrito();
  });

  document.getElementById("continue-shopping-button").addEventListener("click", () => {
    window.location.href = "productos.html"; // Redirige a la página de productos
  });