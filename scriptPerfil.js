document.addEventListener('DOMContentLoaded', function () {
    const productsSection = document.querySelector('.products');

    // Obtener productos canjeados de localStorage
    const redeemedProducts = JSON.parse(localStorage.getItem('redeemedProducts')) || [];

    if (redeemedProducts.length > 0) {
        redeemedProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');

            // Generar el HTML del producto
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
            `;

            // Añadirlo a la sección de productos
            productsSection.appendChild(productElement);
        });
    } else {
        // Si no hay productos canjeados
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No has canjeado ningún producto.";
        productsSection.appendChild(emptyMessage);
    }
});

document.querySelector('.logout-btn').addEventListener('click', function () {
    // Restablecer puntos a 1000 en lugar de eliminarlos
    localStorage.setItem('userPoints', 1000);

    // Eliminar productos canjeados
    localStorage.removeItem('redeemedProducts');

    alert("Has cerrado sesión. Tus puntos han sido restablecidos a 1000 y tus productos canjeados se han reiniciado.");
    window.location.href = "index.html";
});
