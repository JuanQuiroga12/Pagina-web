
document.addEventListener('DOMContentLoaded', function () {
    const totalPointsElement = document.getElementById('totalPoints');
    let totalPoints = 1000; // Simulación de los puntos del usuario cargados desde JSON

    // Mostrar los puntos actuales
    totalPointsElement.textContent = totalPoints;

    // Cargar productos desde el archivo JSON
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            const products = data.productos;
            const canjearButtons = document.querySelectorAll('.btn-canjear');

            // Mostrar productos y gestionar redención
            products.forEach((product) => {
                const productElement = document.createElement('div');
                productElement.classList.add('reward');
                productElement.setAttribute('data-points', product.points);

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <p>${product.points} Puntos</p>
                        <button class="btn-canjear">Canjear</button>
                    </div>
                `;

                document.querySelector('.rewards-section').appendChild(productElement);

                // Añadir funcionalidad de canjear
                productElement.querySelector('.btn-canjear').addEventListener('click', function () {
                    if (totalPoints >= product.points) {
                        totalPoints -= product.points;
                        totalPointsElement.textContent = totalPoints;
                        alert(`Has canjeado el producto: ${product.name}`);
                    } else {
                        alert('No tienes suficientes puntos para canjear este producto.');
                    }
                });
            });
        })
        .catch(error => {
            console.error('Error cargando productos desde JSON:', error);
        });
});
