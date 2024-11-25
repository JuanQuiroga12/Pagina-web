<?php
// Configuración de encabezados para permitir CORS
header('Access-Control-Allow-Origin: http://fitnessplus.free.nf'); // Cambiar a tu dominio si es necesario
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de la base de datos
$servername = "sql313.infinityfree.com";
$username = "if0_37732549";
$password = "Tecno321";
$dbname = "if0_37732549_fitnessplus";
$port = 3306;



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

// Consulta para verificar el usuario
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

    // Comparar contraseña sin encriptación
    if ($password === $user['password']) {
        $redirect = ($user['username'] === 'admin') ? 'pantallaprincipalADMIN.html' : 'pantallaprincipal.html';

        // Generar una respuesta exitosa con información adicional
        echo json_encode([
            'status' => 'success',
            'redirect' => $redirect,
            'user' => [
                'id' => $user['id'],
                'username' => $user['username'],
                'puntos' => $user['puntos'],
                'email' => $user['email'],
            ],
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Contraseña incorrecta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado.']);
}

$stmt->close();
$conn->close();
?>