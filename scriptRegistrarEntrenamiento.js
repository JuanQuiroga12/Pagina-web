// Obtener los elementos del DOM
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Asegurarse de que el modal esté oculto al cargar la página
    modal.style.display = "none";

    // Función para abrir el modal
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "flex"; // Mostrar el modal al hacer clic en el botón
    });

    // Función para cerrar el modal cuando se hace clic en la 'X'
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none"; // Ocultar el modal
    });

    // Cerrar el modal si el usuario hace clic fuera del contenido del modal
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none"; // Ocultar el modal
        }
    });
});

