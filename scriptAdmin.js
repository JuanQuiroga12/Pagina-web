// Datos de ejemplo
let users = [
    { username: 'Laura Tavares', email: 'laura@gmail.com', points: 1000 },
    { username: 'Carlos López', email: 'carlos@gmail.com', points: 500 }
];

// Elementos del DOM
const userTableBody = document.getElementById('userTableBody');
const userModal = document.getElementById('userModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addUserBtn = document.getElementById('addUserBtn');
const modalTitle = document.getElementById('modalTitle');
const modalUsername = document.getElementById('modalUsername');
const modalEmail = document.getElementById('modalEmail');
const modalPoints = document.getElementById('modalPoints');
const userForm = document.getElementById('userForm');

// Para editar usuarios existentes
let editIndex = null;

userModal.style.display = 'none';

// Función para renderizar la tabla de usuarios
function renderUsers() {
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.points}</td>
                <td>
                    <button onclick="editUser(${index})">Editar</button>
                    <button onclick="deleteUser(${index})">Eliminar</button>
                </td>
            </tr>
        `;
        userTableBody.innerHTML += row;
    });
}

// Función para abrir el modal y añadir un nuevo usuario
addUserBtn.addEventListener('click', () => {
    editIndex = null;
    modalTitle.textContent = 'Añadir Usuario';
    modalUsername.value = '';
    modalEmail.value = '';
    modalPoints.value = '';
    userModal.style.display = 'flex';
});

// Función para cerrar el modal
closeModalBtn.addEventListener('click', () => {
    userModal.style.display = 'none';
});

// Función para editar un usuario existente (se ejecuta solo al hacer clic en "Editar")
function editUser(index) {
    editIndex = index;
    const user = users[index];
    modalTitle.textContent = 'Editar Usuario';
    modalUsername.value = user.username;
    modalEmail.value = user.email;
    modalPoints.value = user.points;
    userModal.style.display = 'flex'; // Abre el modal solo al hacer clic en "Editar"
}

// Función para eliminar un usuario
function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

// Función para guardar el nuevo/editar usuario
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newUser = {
        username: modalUsername.value,
        email: modalEmail.value,
        points: modalPoints.value
    };
    
    if (editIndex === null) {
        // Añadir nuevo usuario
        users.push(newUser);
    } else {
        // Editar usuario existente
        users[editIndex] = newUser;
    }
    
    userModal.style.display = 'none'; // Cierra el modal al guardar
    renderUsers();
});

// Renderizar usuarios al cargar la página
renderUsers();

document.querySelector('.logout-btn').addEventListener('click', function () {

    alert("Has cerrado sesión como administrador");
    window.location.href = "index.html";
});
