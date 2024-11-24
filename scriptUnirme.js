document.addEventListener('DOMContentLoaded', function () {
    // Manejo de inicio de sesión
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
    
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Guardar el username en sessionStorage
                    sessionStorage.setItem('username', username);
    
                    // Redirigir a la página principal
                    window.location.href = data.redirect;
                } else {
                    alert(data.message || 'Usuario o contraseña incorrectos.');
                }
            })
            .catch(error => {
                console.error('Error en el inicio de sesión:', error);
            });
    });
    
    // Alternar entre formularios de login y registro
    document.getElementById('showRegisterForm').addEventListener('click', function () {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('registerForm').style.display = 'block';
    });

    document.getElementById('showLoginForm').addEventListener('click', function () {
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    });

    // Manejo de registro de nuevos usuarios
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const regUsername = document.getElementById('regUsername').value.trim();
        const regEmail = document.getElementById('regEmail').value.trim();
        const regPassword = document.getElementById('regPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (!regUsername || !regEmail || !regPassword || !confirmPassword) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (regPassword !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        fetch('register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', // Usar este formato para PHP
            },
            body: JSON.stringify({
                username: regUsername,
                email: regEmail,
                password: regPassword
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al contactar con el servidor.');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') {
                    alert('Usuario registrado exitosamente.');
                    document.getElementById('registerForm').reset();
                    document.getElementById('registerForm').style.display = 'none';
                    document.getElementById('loginForm').style.display = 'block';
                } else {
                    alert(data.message || 'Error al registrar usuario.');
                }
            })
            .catch(error => {
                console.error('Error al procesar el registro:', error);
                alert('Hubo un problema al intentar registrar al usuario. Inténtalo más tarde.');
            });
    });
});
