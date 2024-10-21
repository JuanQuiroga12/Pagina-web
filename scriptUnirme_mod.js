// Leer usuarios desde el archivo JSON
async function cargarUsuarios() {
    const response = await fetch('database.json');  // Asegúrate de que la ruta sea correcta
    const data = await response.json();
    return data.usuarios;
}

// Verificar login de usuarios
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Obtener los valores ingresados por el usuario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const usuarios = await cargarUsuarios();
        const user = usuarios.find(u => u.username === username && u.password === password);

        if (user) {
            if (user.username === 'ADMIN') {
                // Redirigir a la página del administrador
                window.location.href = "pantallaprincipalADMIN.html"; 
            } else {
                // Redirigir a la página principal de usuarios regulares
                window.location.href = "pantallaprincipal.html";
            }
        } else {
            alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
        }
    } catch (error) {
        console.error('Error al verificar el inicio de sesión:', error);
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

    // Aquí es donde se debería guardar el nuevo usuario en el archivo JSON
    const nuevoUsuario = {
        username: regUsername,
        email: regEmail,
        password: regPassword
    };

    // Aquí normalmente necesitaríamos un backend para guardar el usuario en el archivo JSON
    alert('Usuario registrado exitosamente.');
    document.getElementById('registerForm').reset();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
