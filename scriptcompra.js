// Obtener elementos del DOM
const purchaseModal = document.getElementById('purchaseModal');
const closePurchaseModal = document.getElementById('closePurchaseModal');
const buyButtons = document.querySelectorAll('.btn-block');

// Función para abrir el modal de compra
function openPurchaseModal() {
  purchaseModal.style.display = 'flex';
}

// Función para cerrar el modal de compra
function closePurchaseModalFunc() {
  purchaseModal.style.display = 'none';
}

// Añadir evento de clic a los botones de compra
buyButtons.forEach(button => {
  button.addEventListener('click', openPurchaseModal);
});

// Añadir evento de clic al botón de cerrar
closePurchaseModal.addEventListener('click', closePurchaseModalFunc);

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === purchaseModal) {
    closePurchaseModalFunc();
  }
});