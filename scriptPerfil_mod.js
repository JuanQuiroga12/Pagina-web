
document.addEventListener('DOMContentLoaded', function () {
    const productsSection = document.querySelector('.products');

    // Cargar productos redimidos desde el archivo JSON
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            const redeemedProducts = data.usuarios.find(user => user.username === 'Laura Tavares').products_redeemed;

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
                // Si no hay productos redimidos
                const emptyMessage = document.createElement('p');
                emptyMessage.textContent = "No has redimido ningún producto.";
                productsSection.appendChild(emptyMessage);
            }
        })
        .catch(error => {
            console.error('Error cargando productos redimidos desde JSON:', error);
        });
});

document.querySelector('.logout-btn').addEventListener('click', function () {
    alert("Has cerrado sesión. Tus productos redimidos seguirán guardados.");
    window.location.href = "index.html";
});
