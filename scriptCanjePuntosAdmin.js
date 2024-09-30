document.addEventListener('DOMContentLoaded', function () {
    const addProductModal = document.getElementById('addProductModal');
    const addProductBox = document.getElementById('addProductBox');
    const closeModal = document.querySelector('.close');
    let editMode = false;  // Indica si estamos en modo edición
    let currentProduct = null;  // Almacena el producto que se está editando

    // scriptCanjePuntosAdmin.js
    
    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function (event) {
        if (event.target === addProductModal) {
            addProductModal.style.display = 'none';
            resetModal();
        }
    });
    
    addProductModal.style.display = 'none';
    
    // Abrir modal al hacer clic en el bloque entero
    addProductBox.addEventListener('click', function () {
        openModal();
    });
    
    // Cerrar modal
    closeModal.addEventListener('click', function () {
        addProductModal.style.display = 'none';
        resetModal();
    });
    
    // Guardar o editar producto
    document.getElementById('addProductForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const productName = document.getElementById('productName').value;
        const productPoints = document.getElementById('productPoints').value;
        const productImage = document.getElementById('productImage').value;
    
        addProductModal.style.display = 'none';
    
        if (editMode) {
            // Modo edición
            currentProduct.querySelector('img').src = productImage;
            currentProduct.querySelector('img').alt = productName;
            currentProduct.querySelector('.product-info p').textContent = `${productPoints} Puntos`;
        } else {
            // Modo agregar nuevo producto
            const rewardsSection = document.getElementById('rewardsSection');
            const newProduct = document.createElement('div');
            newProduct.classList.add('reward');
            newProduct.setAttribute('data-points', productPoints);
    
            newProduct.innerHTML = `
                <img src="${productImage}" alt="${productName}">
                <div class="product-info">
                    <p>${productPoints} Puntos</p>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </div>
            `;

            rewardsSection.insertBefore(newProduct, addProductBox);
            addProductEventListeners(newProduct);  // Añadir listeners de edición y eliminación
        }

        addProductModal.style.display = 'none';
        resetModal();
    });

    // Función para abrir el modal en modo agregar o editar
    function openModal(product = null) {
        if (product) {
            editMode = true;
            currentProduct = product;
            document.getElementById('productName').value = product.querySelector('img').alt;
            document.getElementById('productPoints').value = product.getAttribute('data-points');
            document.getElementById('productImage').value = product.querySelector('img').src;
        } else {
            editMode = false;
            currentProduct = null;
        }

        addProductModal.style.display = 'flex';
    }

    // Resetear el modal después de cerrar
    function resetModal() {
        document.getElementById('addProductForm').reset();
        editMode = false;
        currentProduct = null;
    }

    // Función para añadir listeners a los botones de editar y eliminar
    function addProductEventListeners(product) {
        const editButton = product.querySelector('.btn-edit');
        const deleteButton = product.querySelector('.btn-delete');

        // Editar producto
        editButton.addEventListener('click', function () {
            openModal(product);
        });

        // Eliminar producto
        deleteButton.addEventListener('click', function () {
            product.remove();
        });
    }

    // Añadir listeners a los productos iniciales
    document.querySelectorAll('.reward').forEach(addProductEventListeners);
});
