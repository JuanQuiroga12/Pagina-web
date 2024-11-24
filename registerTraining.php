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

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode([
        'status' => 'error',
        'message' => 'Error al conectar con la base de datos: ' . $conn->connect_error,
    ]));
}

// Leer el cuerpo de la solicitud
$requestPayload = file_get_contents('php://input');
$data = json_decode($requestPayload, true);

// Validar datos recibidos
if (!isset($data['userId'], $data['type'], $data['duration'], $data['date'], $data['points'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos incompletos para registrar el entrenamiento.',
    ]);
    exit;
}

$userId = $conn->real_escape_string($data['userId']);
$type = $conn->real_escape_string($data['type']);
$duration = $conn->real_escape_string($data['duration']);
$date = $conn->real_escape_string($data['date']);
$points = (int)$data['points'];

// Insertar el entrenamiento en la base de datos
$insertWorkoutQuery = "
    INSERT INTO workouts (user_id, date, type, duration, points)
    VALUES ('$userId', '$date', '$type', '$duration', $points)
";

if ($conn->query($insertWorkoutQuery) === TRUE) {
    // Actualizar los puntos del usuario
    $updatePointsQuery = "UPDATE users SET points = points + $points WHERE id = '$userId'";
    if ($conn->query($updatePointsQuery) === TRUE) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Entrenamiento registrado exitosamente.',
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Entrenamiento registrado, pero no se pudo actualizar los puntos del usuario.',
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al registrar el entrenamiento: ' . $conn->error,
    ]);
}

$conn->close();
?>
