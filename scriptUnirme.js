
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores ingresados por el usuario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Definir credenciales válidas (simulación)
    const validUsername = "Laura Tavares";
    const validPassword = "123456";

    // Verificar si las credenciales son correctas
    if (username === validUsername && password === validPassword) {
        // Redirigir a la página principal
        window.location.href = "pantallaprincipal.html"; // Asegúrate de que esta ruta sea correcta
    } else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

// Funcionalidad del botón "Volver al inicio"
document.querySelector('.home-btn').addEventListener('click', function() {
    window.location.href = "index.html";  // Redirige a la página de inicio
});
