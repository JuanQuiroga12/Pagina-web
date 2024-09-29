document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulación: validación de usuario
    const validUsername = "Laura Tavares";
    const validPassword = "123456";

    if (username === validUsername && password === validPassword) {
        window.location.href = "pantallaprincipal.html";
    } else {
        alert('Usuario o contraseña incorrectos.');
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
