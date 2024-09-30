// Obtener elementos del DOM
const purchaseModal = document.getElementById('purchaseModal');
const closePurchaseModal = document.getElementById('closePurchaseModal');
const buyButtons = document.querySelectorAll('.btn-block');
const purchaseForm = document.getElementById('purchaseForm');
const validationErrorModal = document.getElementById('validationErrorModal');
const closeValidationErrorModal = document.getElementById('closeValidationErrorModal');
const closeValidationErrorButton = document.getElementById('closeValidationErrorButton');
const purchaseConfirmationModal = document.getElementById('purchaseConfirmationModal');
const closePurchaseConfirmationModal = document.getElementById('closePurchaseConfirmationModal');
const closePurchaseConfirmationButton = document.getElementById('closePurchaseConfirmationButton');

// Función para abrir el modal de compra
function openPurchaseModal() {
  purchaseModal.style.display = 'flex';
}

// Función para cerrar el modal de compra
function closePurchaseModalFunc() {
  purchaseModal.style.display = 'none';
}

// Función para abrir el modal de error de validación
function openValidationErrorModal(message) {
  validationErrorModal.querySelector('p').textContent = message;
  validationErrorModal.style.display = 'flex';
}

// Función para cerrar el modal de error de validación
function closeValidationErrorModalFunc() {
  validationErrorModal.style.display = 'none';
}

// Función para abrir el modal de confirmación de compra
function openPurchaseConfirmationModal() {
  purchaseConfirmationModal.style.display = 'flex';
}

// Función para cerrar el modal de confirmación de compra
function closePurchaseConfirmationModalFunc() {
  purchaseConfirmationModal.style.display = 'none';
}

// Añadir evento de clic a los botones de compra
buyButtons.forEach(button => {
  button.addEventListener('click', openPurchaseModal);
});

// Añadir evento de clic al botón de cerrar del modal de compra
closePurchaseModal.addEventListener('click', closePurchaseModalFunc);

// Añadir evento de clic al botón de cerrar del modal de error de validación
closeValidationErrorModal.addEventListener('click', closeValidationErrorModalFunc);
closeValidationErrorButton.addEventListener('click', closeValidationErrorModalFunc);

// Añadir evento de clic al botón de cerrar del modal de confirmación de compra
closePurchaseConfirmationModal.addEventListener('click', closePurchaseConfirmationModalFunc);
closePurchaseConfirmationButton.addEventListener('click', closePurchaseConfirmationModalFunc);

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === purchaseModal) {
    closePurchaseModalFunc();
  }
  if (event.target === validationErrorModal) {
    closeValidationErrorModalFunc();
  }
  if (event.target === purchaseConfirmationModal) {
    closePurchaseConfirmationModalFunc();
  }
});

// Validar el formulario antes de enviarlo
purchaseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const cardName = document.getElementById('cardName').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;

  if (!email || !cardName || !cardNumber || !expiryDate || !cvv) {
    openValidationErrorModal('Por favor, rellena todos los campos.');
  } else if (!/^\d{16}$/.test(cardNumber)) {
    openValidationErrorModal('El número de tarjeta debe tener 16 dígitos.');
  } else if (!/^\d{3}$/.test(cvv)) {
    openValidationErrorModal('El CVV debe tener 3 dígitos.');
  } else {
    // Mostrar el modal de confirmación de compra
    openPurchaseConfirmationModal();
    closePurchaseModalFunc();
  }
});