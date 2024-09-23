// scriptIndex.js

// Capturamos el botón con id "uneteBtn"
document.getElementById('uneteBtn').addEventListener('click', function() {
    // Redirigir a la página de "Unirme"
    window.location.href = "Unirme.html";
});

// Capturamos el botón "Conoce como"
document.getElementById('conoceComoBtn').addEventListener('click', function() {
    // Desplazar a la sección "¿Cómo funciona?"
    document.getElementById('section-info').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Capturamos el botón "Conoce nuestros planes"
document.getElementById('conocePlanesBtn').addEventListener('click', function() {
    // Desplazar a la sección "Planes"
    document.getElementById('planes').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
