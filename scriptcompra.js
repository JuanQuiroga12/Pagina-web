// Obtener elementos del DOM
const purchaseModal = document.getElementById('purchaseModal');
const closePurchaseModal = document.getElementById('closePurchaseModal');
const buyButtons = document.querySelectorAll('.btn-block');
const purchaseForm = document.getElementById('purchaseForm');
const validationErrorModal = document.getElementById('validationErrorModal');
const closeValidationErrorModal = document.getElementById('closeValidationErrorModal');
const closeValidationErrorButton = document.getElementById('closeValidationErrorButton');

// Función para abrir el modal de compra
function openPurchaseModal() {
  purchaseModal.style.display = 'flex';
}

// Función para cerrar el modal de compra
function closePurchaseModalFunc() {
  purchaseModal.style.display = 'none';
}

// Función para abrir el modal de error de validación
function openValidationErrorModal() {
  validationErrorModal.style.display = 'flex';
}

// Función para cerrar el modal de error de validación
function closeValidationErrorModalFunc() {
  validationErrorModal.style.display = 'none';
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

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === purchaseModal) {
    closePurchaseModalFunc();
  }
  if (event.target === validationErrorModal) {
    closeValidationErrorModalFunc();
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
    openValidationErrorModal();
  } else {
    // Aquí puedes agregar la lógica para procesar el formulario
    alert('Compra confirmada');
    closePurchaseModalFunc();
  }
});