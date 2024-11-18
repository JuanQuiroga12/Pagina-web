
<?php
// Configuración de la base de datos
$servername = "sql108.infinityfree.com";
$username = "if0_37726901"; // Cambiar por tu usuario de la base de datos
$password = "Tecnologias321"; // Cambiar por tu contraseña de la base de datos
$dbname = "if0_37726901_fitnessplus"; // Cambiar por el nombre de tu base de datos
$port = 3306; // Puerto de la base de datos

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname, $port);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $conn->connect_error]));
}

// Leer datos del cuerpo de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? null;
$password = $data['password'] ?? null;

// Validar entrada
if (!$username || !$password) {
    echo json_encode(['status' => 'error', 'message' => 'Por favor, complete todos los campos.']);
    exit;
}

// Consulta para verificar usuario
$sql = "SELECT * FROM usuarios WHERE username = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verificar contraseña
    if (password_verify($password, $user['password'])) {
        $redirect = ($user['username'] === 'ADMIN') ? 'pantallaprincipalADMIN.html' : 'pantallaprincipal.html';
        echo json_encode(['status' => 'success', 'redirect' => $redirect]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado.']);
}

$stmt->close();
$conn->close();
?>
