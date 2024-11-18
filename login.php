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
$password = $data['password'];

// Consulta para verificar usuario
$sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if ($user['username'] === 'ADMIN') {
        echo json_encode(['status' => 'success', 'redirect' => 'pantallaprincipalADMIN.html']);
    } else {
        echo json_encode(['status' => 'success', 'redirect' => 'pantallaprincipal.html']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuario o contraseña incorrectos']);
}

$stmt->close();
$conn->close();
?>
