document.addEventListener("DOMContentLoaded", function () {
    // --- FUNCIONALIDAD PARA REDIRECCIONAR BOTONES Y HACER SCROLL SUAVE ---
    
    // Capturamos el botón con id "uneteBtn" y redirigimos a la página "Unirme"
    document.getElementById('uneteBtn').addEventListener('click', function() {
        window.location.href = "Unirme.html";
    });

    // Capturamos el botón "Conoce como" para desplazar a la sección "¿Cómo funciona?"
    document.getElementById('conoceComoBtn').addEventListener('click', function() {
        document.getElementById('section-info').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Capturamos el botón "Conoce nuestros planes" para desplazar a la sección "Planes"
    document.getElementById('conocePlanesBtn').addEventListener('click', function() {
        document.getElementById('planes').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // --- FUNCIONALIDAD DEL MODAL ---
    
    // Obtener el botón y el modal
    var openModalBtn = document.getElementById("openModalBtn");
    var modal = document.getElementById("reservaModal");
    var closeModalBtn = document.getElementById("closeModal");

    // Abrir el modal al hacer clic en el botón "UNIRME"
    openModalBtn.addEventListener("click", function () {
        modal.style.display = "flex";
    });

    // Cerrar el modal al hacer clic en la "X"
    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener("click", function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});

