<?php

// Configuración de encabezados para permitir CORS
header('Access-Control-Allow-Origin: http://fitnessplus.free.nf');
header('Access-Control-Allow-Methods: POST');
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

// Leer datos enviados desde el frontend
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? null;

// Validar la entrada
if (!$username) {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no especificado.']);
    exit;
}

// Consultar información básica del usuario
$sql = "SELECT id, username, email, points, productos FROM usuarios WHERE username = ?";
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

    $userData = [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'points' => (int)$user['points'], // Asegurar que los puntos sean un entero
        'products' => json_decode($user['productos'], true), // Decodificar JSON de productos
    ];

    // Consultar reservas del usuario
    $sqlReservations = "SELECT date, time, trainerImage FROM reservas WHERE user_id = ?";
    $stmtReservations = $conn->prepare($sqlReservations);
    $stmtReservations->bind_param("i", $user['id']);
    $stmtReservations->execute();
    $resultReservations = $stmtReservations->get_result();

    $reservations = [];
    while ($row = $resultReservations->fetch_assoc()) {
        $reservations[] = $row;
    }

    // Consultar entrenamientos del usuario
    $sqlWorkouts = "SELECT date, type, duration, points FROM entrenamientos WHERE user_id = ?";
    $stmtWorkouts = $conn->prepare($sqlWorkouts);
    $stmtWorkouts->bind_param("i", $user['id']);
    $stmtWorkouts->execute();
    $resultWorkouts = $stmtWorkouts->get_result();

    $workouts = [];
    while ($row = $resultWorkouts->fetch_assoc()) {
        $workouts[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'user' => array_merge($userData, [
            'reservations' => $reservations,
            'workouts' => $workouts,
        ]),
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuario no encontrado.']);
}

$stmt->close();
$conn->close();
?>
