document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el FullCalendar en la página principal
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [
            {
                title: 'Reserva de entrenamiento',
                start: '2024-08-02',
                end: '2024-08-02'
            },
            {
                title: 'Reserva de entrenamiento',
                start: '2024-08-09',
                end: '2024-08-09'
            },
            {
                title: 'Reserva de entrenamiento',
                start: '2024-08-10',
                end: '2024-08-10'
            }
        ]
    });

    calendar.render();

    // Modal y elementos interactivos
    var modal = document.getElementById('reservaModal');
    var openModalBtn = document.getElementById('openModalBtn');
    var closeModalBtn = document.querySelector('.close');
    var timeSlots = document.querySelectorAll('.time-slot');
    var reserveBtn = document.getElementById('reserveBtn');
    var clearBtn = document.getElementById('clearBtn');
    var fechaInput = document.getElementById('fechaReserva');
    var entrenadorSelect = document.getElementById('entrenadorSelect');

    // Abre el modal cuando se hace clic en el botón de reservar
    openModalBtn.addEventListener('click', function() {
        modal.style.display = 'flex';
    });

    // Cierra el modal cuando se hace clic en el botón de cerrar
    closeModalBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Selección de hora
    timeSlots.forEach(function(slot) {
        slot.addEventListener('click', function() {
            timeSlots.forEach(function(s) {
                s.classList.remove('selected');
            });
            slot.classList.add('selected');
        });
    });

    // Botón Limpiar
    clearBtn.addEventListener('click', function() {
        timeSlots.forEach(function(s) {
            s.classList.remove('selected');
        });
        fechaInput.value = '';  // Limpiar el input de fecha
        entrenadorSelect.selectedIndex = 0;  // Limpiar la selección del entrenador
    });

    // Reservar y agregar al FullCalendar
    reserveBtn.addEventListener('click', function() {
        var selectedTime = document.querySelector('.time-slot.selected');
        var selectedDate = fechaInput.value;
        var selectedEntrenador = entrenadorSelect.value;

        if (selectedTime && selectedDate && selectedEntrenador) {
            // Crear título del evento con la hora seleccionada y el entrenador
            var eventTitle = `Reserva ${selectedTime.textContent} con ${selectedEntrenador}`;

            // Crear un nuevo evento en el calendario
            calendar.addEvent({
                title: eventTitle,
                start: selectedDate, // La fecha seleccionada
                allDay: true // Muestra el evento como de todo el día
            });

            // Confirmación y cierre del modal
            console.log('Reserva confirmada:', selectedDate, selectedTime.textContent, 'Entrenador:', selectedEntrenador);
            alert('Reserva confirmada');
            modal.style.display = 'none';
        } else {
            alert('Por favor, selecciona una fecha, hora y entrenador para la reserva.');
        }
    });

    // Cierra el modal si se hace clic fuera de él
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});
