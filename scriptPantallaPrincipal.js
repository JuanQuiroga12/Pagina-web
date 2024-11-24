document.addEventListener('DOMContentLoaded', function () {
    // Obtiene el username desde la sesión
    const username = sessionStorage.getItem('username');


    // Referencias a elementos HTML
    const userNameElement = document.querySelector('.user-name');
    const userPointsElement = document.querySelector('.user-points');
    const reservationListElement = document.querySelector('.reservation-list');
    const workoutListElement = document.querySelector('.previous-workouts');

    // Cargar datos del usuario
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
                userNameElement.textContent = user.username;
                userPointsElement.textContent = `${user.points} PUNTOS`;
                renderWorkouts(user.products || []);
            } else {
                alert('Error al cargar los datos del usuario.');
            }
        })
        .catch(error => {
            console.error('Error al cargar los datos del usuario:', error);
        });

    // Función para mostrar los productos (si aplica)
    function renderWorkouts(products) {
        workoutListElement.innerHTML = '';
        if (products.length > 0) {
            products.forEach(product => {
                const workoutItem = `
                    <div class="workout-item">
                        <h3>${product.date}</h3>
                        <p>${product.type} ${product.duration} MINUTOS</p>
                        <span>${product.points} PUNTOS</span>
                    </div>`;
                workoutListElement.insertAdjacentHTML('beforeend', workoutItem);
            });
        } else {
            workoutListElement.innerHTML = '<p>No tienes entrenamientos registrados.</p>';
        }
    }
});
