document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    // Obtener los valores ingresados por el usuario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Cargar usuarios desde el archivo JSON
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            const user = data.usuarios.find(u => u.username === username && u.password === password);

            if (user) {
                if (user.username === 'ADMIN') {
                    // Redirigir a la página del administrador
                    window.location.href = "pantallaprincipalADMIN.html"; 
                } else {
                    // Redirigir a la página principal de usuarios regulares
                    window.location.href = "pantallaprincipal.html";
                }
            } else {
                // Mostrar mensaje de error si las credenciales son incorrectas
                alert('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error al verificar el inicio de sesión:', error);
        });
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

    // Crear un nuevo objeto de usuario
    const newUser = {
        username: regUsername,
        email: regEmail,
        password: regPassword,
        puntos: 0,
        productosRedimidos: []
    };

    // Leer el archivo JSON, agregar el nuevo usuario y guardar los cambios
    fetch('database.json')
        .then(response => response.json())
        .then(data => {
            // Agregar el nuevo usuario al array de usuarios
            data.usuarios.push(newUser);

            // Guardar los datos actualizados en el archivo JSON (necesita servidor para persistencia)
            return fetch('database.json', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            alert('Usuario registrado exitosamente.');
            // Restablecer y mostrar el formulario de login
            document.getElementById('registerForm').reset();
            document.getElementById('registerForm').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
        })
        .catch(error => {
            console.error('Error al registrar usuario:', error);
            alert('Hubo un error al registrar el usuario. Inténtalo nuevamente.');
        });
});
