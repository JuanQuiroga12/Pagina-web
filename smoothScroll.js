// smoothScroll.js

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        // Obtener la sección destino
        const target = document.querySelector(this.getAttribute('href'));

        // Hacer el desplazamiento suave
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
