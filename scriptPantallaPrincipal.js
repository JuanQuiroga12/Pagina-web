document.addEventListener('DOMContentLoaded', function () {
    // Obtener el username desde la sesión
    const username = sessionStorage.getItem('username');

    if (!username) {
        alert('Por favor, inicia sesión.');
        window.location.href = 'index.html';
        return;
    }

    const userNameElement = document.getElementById('username');
    const userPointsElement = document.getElementById('puntos');
    const userImageElement = document.getElementById('userImage');
    const reservationListElement = document.getElementById('reservationList');
    const workoutListElement = document.getElementById('workoutList');

    // Función para cargar los datos del usuario
    function loadUserData() {
        fetch('getUserData.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                const user = data.user;
                userNameElement.textContent = user.username;
                userPointsElement.textContent = `${user.puntos} PUNTOS`;
                userImageElement.src = user.profileImage || 'public/images/default-profile.png';
                
                // Verificar si hay reservas y entrenamientos
                if (user.reservas) {
                    renderReservations(user.reservas);
                }
                if (user.entrenamientos) {
                    renderWorkouts(user.entrenamientos);
                }
            } else {
                console.error('Error del servidor:', data.message);
                alert('Error al cargar los datos del usuario: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del usuario:', error);
            alert('Error de conexión. Por favor, intenta nuevamente más tarde.');
        });
    }

    // Cargar datos iniciales
    loadUserData();

    function renderReservations(reservations) {
        reservationListElement.innerHTML = '';
        if (reservations && reservations.length > 0) {
            reservations.forEach(reservation => {
                const formattedDate = new Date(reservation.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const item = `
                    <div class="reservation-item">
                        <div class="reservation-date">
                            <h3>${formattedDate}</h3>
                            <p>${reservation.time}</p>
                        </div>
                        <img class="reservation-avatar" src="${reservation.trainerImage || 'public/images/default-avatar.png'}" alt="Avatar">
                    </div>`;
                reservationListElement.insertAdjacentHTML('beforeend', item);
            });
        } else {
            reservationListElement.innerHTML = '<p>No tienes reservas próximas.</p>';
        }
    }

    function renderWorkouts(workouts) {
        workoutListElement.innerHTML = '';
        if (workouts && workouts.length > 0) {
            workouts.forEach(workout => {
                // Formatear la fecha
                const formattedDate = new Date(workout.DATE).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                // Crear el elemento del entrenamiento
                const workoutItem = `
                    <div class="workout-item">
                        <h3>${formattedDate}</h3>
                        <p>${workout.tipoentrenamiento} - ${workout.TIME} MINUTOS</p>
                    </div>`;
                workoutListElement.insertAdjacentHTML('beforeend', workoutItem);
            });
        } else {
            workoutListElement.innerHTML = '<p>No tienes entrenamientos registrados.</p>';
        }
    }

    // Manejar el registro de entrenamientos
    document.getElementById('registerTrainingBtn').addEventListener('click', function() {
        const trainingPart = document.getElementById('tipoentrenamiento').value;
        const trainingDuration = document.getElementById('TIME').value;
        const trainingDate = document.getElementById('DATE').value;

        if (!trainingDate || !trainingPart || !trainingDuration) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Calcular puntos basado en la duración
        const points = Math.floor(parseInt(trainingDuration) / 30) * 50;

        const trainingData = {
            username: username,
            tipoentrenamiento: trainingPart,
            TIME: trainingDuration,
            DATE: trainingDate,
            puntos: points
        };

        fetch('registerTraining.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => Promise.reject(err));
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Entrenamiento registrado exitosamente.');
                // Actualizar puntos en la interfaz
                userPointsElement.textContent = `${data.newPoints} PUNTOS`;
                // Recargar todos los datos del usuario
                loadUserData();
                // Cerrar el modal si existe
                const modal = document.getElementById('modal');
                if (modal) modal.style.display = 'none';
                // Limpiar el formulario
                document.getElementById('tipoentrenamiento').value = '';
                document.getElementById('TIME').value = '';
                document.getElementById('DATE').value = '';
            } else {
                throw new Error(data.message || 'Error al registrar el entrenamiento');
            }
        })
        .catch(error => {
            console.error('Error al registrar el entrenamiento:', error);
            alert(error.message || 'Error al registrar el entrenamiento. Por favor, intenta nuevamente.');
        });
    });

    // Manejo del modal de registro de entrenamiento
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'block';
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            if (modal) modal.style.display = 'none';
        });
    }

    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
});