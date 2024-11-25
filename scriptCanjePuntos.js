// scriptCanjePuntos.js
document.addEventListener('DOMContentLoaded', function () {
    const totalPointsElement = document.getElementById('totalPoints');
    const mainContainer = document.querySelector('[role="main"]');
    let username = localStorage.getItem('username');

    // Cargar puntos y productos al inicio
    loadUserPoints();
    loadProducts();

    async function loadUserPoints() {
        try {
            const response = await fetch('getUserData.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            });

            const data = await response.json();
            if (data.status === 'success') {
                totalPointsElement.textContent = data.user.puntos;
                updateProductAvailability(data.user.puntos);
            } else {
                console.error('Error al cargar puntos:', data.message);
            }
        } catch (error) {
            console.error('Error al cargar puntos:', error);
        }
    }

    async function loadProducts() {
        try {
            const response = await fetch('productos.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'getProducts'
                })
            });

            const data = await response.json();
            if (data.status === 'success') {
                const productsByCategory = groupProductsByCategory(data.products);
                renderProducts(productsByCategory);
            } else {
                console.error('Error al cargar productos:', data.message);
            }
        } catch (error) {
            console.error('Error en la petición:', error);
        }
    }

    function groupProductsByCategory(products) {
        return products.reduce((acc, product) => {
            if (!acc[product.categoria]) {
                acc[product.categoria] = [];
            }
            acc[product.categoria].push(product);
            return acc;
        }, {});
    }

    function renderProducts(productsByCategory) {
        const rewardsSection = document.createElement('div');
        rewardsSection.className = 'rewards-section';

        Object.entries(productsByCategory).forEach(([category, products]) => {
            const categorySection = document.createElement('div');
            categorySection.className = 'rewards-category';

            const categoryTitle = document.createElement('h2');
            categoryTitle.textContent = category;
            categorySection.appendChild(categoryTitle);

            const productsGrid = document.createElement('div');
            productsGrid.className = 'rewards-grid';

            products.forEach(product => {
                productsGrid.appendChild(createProductElement(product));
            });

            categorySection.appendChild(productsGrid);
            rewardsSection.appendChild(categorySection);
        });

        // Limpiar y actualizar el contenedor principal
        const existingRewardsSection = document.querySelector('.rewards-section');
        if (existingRewardsSection) {
            existingRewardsSection.replaceWith(rewardsSection);
        } else {
            mainContainer.appendChild(rewardsSection);
        }
    }

    function createProductElement(product) {
        const productDiv = document.createElement('div');
        productDiv.className = 'reward';
        productDiv.setAttribute('data-product-id', product.id);
        productDiv.setAttribute('points', product.puntos);

        productDiv.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}">
            <div class="product-info">
                <h3>${product.nombre}</h3>
                <p>${product.puntos} Puntos</p>
                <button class="btn-canjear" onclick="handleProductRedemption(event)">Canjear</button>
            </div>
        `;

        return productDiv;
    }

    window.handleProductRedemption = async function(event) {
        const productElement = event.target.closest('.reward');
        const productId = productElement.dataset.productId;
        const productPoints = parseInt(productElement.getAttribute('points'));

        // Mostrar modal de confirmación
        const confirmationModal = document.getElementById('confirmationModal');
        if (confirmationModal) {
            confirmationModal.style.display = 'block';
            
            // Manejar confirmación
            const confirmButton = confirmationModal.querySelector('.modal-buttons button:first-child');
            const cancelButton = confirmationModal.querySelector('.modal-buttons button:last-child');
            
            confirmButton.onclick = async () => {
                confirmationModal.style.display = 'none';
                try {
                    const response = await fetch('productos.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            action: 'redeemProduct',
                            username: username,
                            productId: productId
                        })
                    });

                    const result = await response.json();
                    
                    if (result.status === 'success') {
                        totalPointsElement.textContent = result.newPoints;
                        updateProductAvailability(result.newPoints);
                        showSuccessModal(result.newPoints);
                        loadProducts(); // Recargar productos después del canje
                    } else {
                        alert(result.message || 'Error al canjear el producto');
                    }
                } catch (error) {
                    console.error('Error en el canje:', error);
                    alert('Error al procesar el canje');
                }
            };
            
            cancelButton.onclick = () => {
                confirmationModal.style.display = 'none';
            };
        } else {
            // Si no hay modal, proceder directamente
            handleRedemption();
        }
    }

    function updateProductAvailability(userPoints) {
        document.querySelectorAll('.reward').forEach(product => {
            const points = parseInt(product.getAttribute('points'));
            const redeemButton = product.querySelector('.btn-canjear');
            
            if (points > userPoints) {
                redeemButton.style.opacity = '0.5';
                redeemButton.style.cursor = 'not-allowed';
                redeemButton.disabled = true;
            } else {
                redeemButton.style.opacity = '1';
                redeemButton.style.cursor = 'pointer';
                redeemButton.disabled = false;
            }
        });
    }

    function showSuccessModal(remainingPoints) {
        const successModal = document.getElementById('successModal');
        const remainingPointsElement = document.getElementById('remainingPoints');
        
        if (remainingPointsElement) {
            remainingPointsElement.textContent = remainingPoints;
        }
        
        if (successModal) {
            successModal.style.display = 'block';
            
            // Agregar manejador para el botón de aceptar
            const acceptButton = successModal.querySelector('button');
            if (acceptButton) {
                acceptButton.onclick = () => {
                    successModal.style.display = 'none';
                };
            }
            
            // Cerrar automáticamente después de 3 segundos
            setTimeout(() => {
                successModal.style.display = 'none';
            }, 3000);
        }
    }
});