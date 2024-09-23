document.addEventListener('DOMContentLoaded', function () {
    const totalPointsElement = document.getElementById('totalPoints');
    let totalPoints = loadUserPoints();

    // Mostrar los puntos actuales
    totalPointsElement.textContent = totalPoints;

    const canjearButtons = document.querySelectorAll('.btn-canjear');

    canjearButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productElement = this.closest('.reward');
            const productPoints = parseInt(productElement.getAttribute('data-points'));

            // Verificar si el usuario tiene suficientes puntos
            if (totalPoints >= productPoints) {
                totalPoints -= productPoints;
                saveUserPoints(totalPoints);
                totalPointsElement.textContent = totalPoints;

                // Guardar el producto canjeado en localStorage
                const productName = productElement.querySelector('img').alt;
                const product = {
                    name: productName,
                    points: productPoints,
                    image: productElement.querySelector('img').src
                };

                // Verificar si el producto ya fue canjeado
                if (!isProductRedeemed(productName)) {
                    saveProductToLocalStorage(product);
                    alert(`Has canjeado el producto: ${productName}`);
                } else {
                    alert(`Ya has canjeado el producto: ${productName}`);
                }
            } else {
                alert('No tienes suficientes puntos para canjear este producto.');
            }
        });
    });

    // Función para cargar los puntos del usuario desde localStorage
    function loadUserPoints() {
        const savedPoints = localStorage.getItem('userPoints');
        return savedPoints ? parseInt(savedPoints) : 1000;  // Valor inicial de 1000 si no hay puntos guardados
    }

    // Función para guardar los puntos del usuario en localStorage
    function saveUserPoints(points) {
        localStorage.setItem('userPoints', points);
    }

    // Función para guardar los productos canjeados en localStorage
    function saveProductToLocalStorage(product) {
        let redeemedProducts = JSON.parse(localStorage.getItem('redeemedProducts')) || [];
        redeemedProducts.push(product);
        localStorage.setItem('redeemedProducts', JSON.stringify(redeemedProducts));
    }

    // Función para verificar si un producto ya ha sido canjeado
    function isProductRedeemed(productName) {
        let redeemedProducts = JSON.parse(localStorage.getItem('redeemedProducts')) || [];
        return redeemedProducts.some(product => product.name === productName);
    }
});
