document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores ingresados por el usuario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Definir credenciales válidas de usuario y administrador
    const validUsername = "Laura";
    const validPassword = "123456";
    
    const adminUsername = "ADMIN";
    const adminPassword = "1234";

    // Verificar si es un usuario regular
    if (username === validUsername && password === validPassword) {
        // Redirigir a la página principal de usuarios regulares
        window.location.href = "pantallaprincipal.html"; // Asegúrate de que esta ruta sea correcta
    }
    // Verificar si es el administrador
    else if (username === adminUsername && password === adminPassword) {
        // Redirigir a la página del administrador
        window.location.href = "pantallaprincipalADMIN.html"; // Página para el administrador
    } 
    else {
        // Mostrar mensaje de error si las credenciales son incorrectas
        alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
});

// Alternar entre formularios de login y registro
document.getElementById('showRegisterForm').addEventListener('click', function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLoginForm').addEventListener('click', function() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

// Manejar el registro de nuevos usuarios
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (regPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Simulación: guardar los datos en la base de datos (aquí usarías el backend real)
    alert('Usuario registrado exitosamente.');
    // Redirigir o limpiar el formulario
    document.getElementById('registerForm').reset();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
