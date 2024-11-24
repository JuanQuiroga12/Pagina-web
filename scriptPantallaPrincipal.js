document.addEventListener('DOMContentLoaded', function () {
    // Obtener el username desde la sesión
    const username = sessionStorage.getItem('username');


    // Referencias a los elementos HTML
    const userNameElement = document.getElementById('userName');
    const userPointsElement = document.getElementById('userPoints');
    const userImageElement = document.getElementById('userImage');
    const reservationListElement = document.getElementById('reservationList');
    const workoutListElement = document.getElementById('workoutList');

    // Solicitar datos del usuario al backend
    fetch('getUserData.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const user = data.user;

                // Actualizar la información del usuario
                userNameElement.textContent = user.username;
                userPointsElement.textContent = `${user.points} PUNTOS`;
                userImageElement.src = user.profileImage || 'public/images/default-profile.png';

                // Mostrar reservas
                renderReservations(user.reservations || []);

                // Mostrar entrenamientos previos
                renderWorkouts(user.workouts || []);
            } else {
                alert('Error al cargar los datos del usuario.');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del usuario:', error);
        });

    // Función para renderizar las reservas
    function renderReservations(reservations) {
        reservationListElement.innerHTML = '';
        if (reservations.length > 0) {
            reservations.forEach(reservation => {
                const reservationItem = `
                    <div class="reservation-item">
                        <div class="reservation-date">
                            <h3>${reservation.date}</h3>
                            <p>${reservation.time}</p>
                        </div>
                        <img class="reservation-avatar" src="${reservation.trainerImage || 'public/images/default-avatar.png'}" alt="Avatar">
                    </div>`;
                reservationListElement.insertAdjacentHTML('beforeend', reservationItem);
            });
        } else {
            reservationListElement.innerHTML = '<p>No tienes reservas próximas.</p>';
        }
    }

    // Función para renderizar entrenamientos previos
    function renderWorkouts(workouts) {
        workoutListElement.innerHTML = '';
        if (workouts.length > 0) {
            workouts.forEach(workout => {
                const workoutItem = `
                    <div class="workout-item">
                        <h3>${workout.date}</h3>
                        <p>${workout.type} ${workout.duration} MINUTOS</p>
                        <span>${workout.points} PUNTOS</span>
                    </div>`;
                workoutListElement.insertAdjacentHTML('beforeend', workoutItem);
            });
        } else {
            workoutListElement.innerHTML = '<p>No tienes entrenamientos registrados.</p>';
        }
    }

    // Manejar el registro de entrenamientos
    document.getElementById('registerTrainingBtn').addEventListener('click', function () {
        const trainingPart = document.getElementById('trainingPart').value;
        const trainingDuration = document.getElementById('trainingDuration').value;
        const trainingDate = document.getElementById('trainingDate').value;

        if (!trainingDate) {
            alert('Por favor, selecciona una fecha.');
            return;
        }

        const trainingData = {
            username, // Se envía el username para identificar al usuario
            trainingPart,
            trainingDuration,
            trainingDate,
        };

        fetch('registerTraining.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trainingData),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    alert('Entrenamiento registrado exitosamente.');
                    userPointsElement.textContent = `${data.newPoints} PUNTOS`; // Actualizar puntos
                    renderWorkouts(data.updatedWorkouts); // Actualizar lista de entrenamientos
                } else {
                    alert('Error al registrar el entrenamiento.');
                }
            })
            .catch(error => {
                console.error('Error al registrar el entrenamiento:', error);
            });
    });

    // Manejo del modal de registro de entrenamiento
    const modal = document.getElementById('modal');
    document.getElementById('openModalBtn').addEventListener('click', function () {
        modal.style.display = 'block';
    });

    document.getElementById('closeModalBtn').addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
