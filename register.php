<?php
// Configuración de la base de datos
$servername = "sql108.infinityfree.com";
$username = "if0_37726901"; // Cambiar por tu usuario de la base de datos
$password = "Tecnologias321"; // Cambiar por tu contraseña de la base de datos
$dbname = "if0_37726901_fitnessplus"; // Cambiar por el nombre de tu base de datos

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Error de conexión con la base de datos']));
}

// Leer datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];
$password = $data['password'];

// Verificar si el usuario ya existe
$sqlCheck = "SELECT * FROM usuarios WHERE username = ? OR email = ?";
$stmtCheck = $conn->prepare($sqlCheck);
$stmtCheck->bind_param("ss", $username, $email);
$stmtCheck->execute();
$resultCheck = $stmtCheck->get_result();

if ($resultCheck->num_rows > 0) {
    echo json_encode(['status' => 'error', 'message' => 'El usuario o correo ya está registrado']);
} else {
    // Insertar nuevo usuario
    $sqlInsert = "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)";
    $stmtInsert = $conn->prepare($sqlInsert);
    $stmtInsert->bind_param("sss", $username, $email, $password);

    if ($stmtInsert->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Usuario registrado exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Error al registrar el usuario']);
    }

    $stmtInsert->close();
}

$stmtCheck->close();
$conn->close();
?>
