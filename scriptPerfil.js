document.addEventListener('DOMContentLoaded', function () {
    const productsSection = document.querySelector('.products');
    const qrModal = document.getElementById('qrModal');
    const closeModal = document.querySelector('.close');
    const qrCodeImage = document.getElementById('qrCode');
    const qr = new QRious({
        size: 150
    });

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
                <button class="redeem-btn">Redimir</button>
            `;

            // Añadirlo a la sección de productos
            productsSection.appendChild(productElement);

            // Añadir funcionalidad al botón de redimir
            const redeemButton = productElement.querySelector('.redeem-btn');
            redeemButton.addEventListener('click', function () {
                // Generar código QR y mostrar el modal
                qr.value = `Producto: ${product.name}`;
                qrCodeImage.src = qr.toDataURL();
                qrModal.style.display = 'flex';
            });
        });
    } else {
        // Si no hay productos canjeados
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "No has canjeado ningún producto.";
        productsSection.appendChild(emptyMessage);
    }

    // Cerrar el modal de QR
    closeModal.addEventListener('click', function () {
        qrModal.style.display = 'none';
    });

    // Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function (event) {
    if (event.target === qrModal) {
        qrModal.style.display = 'none';
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
});
