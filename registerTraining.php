<?php
// Configuración inicial
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://fitnessplus.free.nf');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Si es una solicitud OPTIONS, terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Método no permitido'
    ]);
    exit;
}

try {
    // Configuración de la base de datos
    $servername = "sql313.infinityfree.com";
    $username = "if0_37732549";
    $password = "Tecno321";
    $dbname = "if0_37732549_fitnessplus";
    $port = 3306;

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    // Verificar conexión
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    // Leer y decodificar el cuerpo de la solicitud
    $requestPayload = file_get_contents('php://input');
    $data = json_decode($requestPayload, true);

    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Error al decodificar JSON: ' . json_last_error_msg());
    }

    // Debug: Imprimir datos recibidos
    error_log("Datos recibidos: " . print_r($data, true));

    // Validar datos requeridos
    $requiredFields = ['username', 'tipoentrenamiento', 'TIME', 'DATE'];
    $missingFields = [];
    
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $missingFields[] = $field;
        }
    }
    
    if (!empty($missingFields)) {
        throw new Exception("Campos requeridos faltantes: " . implode(', ', $missingFields));
    }

    // Calcular puntos basado en la duración del entrenamiento
    $duration = intval($data['TIME']);
    $points = floor($duration / 30) * 50; // 50 puntos por cada 30 minutos

    // Obtener el ID del usuario
    $stmt = $conn->prepare("SELECT id FROM usuarios WHERE username = ?");
    $stmt->bind_param("s", $data['username']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception('Usuario no encontrado');
    }

    $user = $result->fetch_assoc();
    $userId = $user['id'];

    // Insertar el entrenamiento
    $stmt = $conn->prepare("INSERT INTO entrenamientos (user_id, DATE, tipoentrenamiento, TIME) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $userId, $data['DATE'], $data['tipoentrenamiento'], $data['TIME']);

    if (!$stmt->execute()) {
        throw new Exception('Error al insertar el entrenamiento: ' . $stmt->error);
    }

    // Actualizar puntos del usuario
    $stmt = $conn->prepare("UPDATE usuarios SET puntos = puntos + ? WHERE id = ?");
    $stmt->bind_param("ii", $points, $userId);

    if (!$stmt->execute()) {
        throw new Exception('Error al actualizar los puntos: ' . $stmt->error);
    }

    // Obtener los puntos actualizados del usuario
    $stmt = $conn->prepare("SELECT puntos FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $newPoints = $result->fetch_assoc()['puntos'];

    // Obtener entrenamientos actualizados
    $stmt = $conn->prepare("SELECT DATE, tipoentrenamiento, TIME FROM entrenamientos WHERE user_id = ? ORDER BY DATE DESC LIMIT 10");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $workouts = [];
    while ($row = $result->fetch_assoc()) {
        $workouts[] = $row;
    }

    // Devolver respuesta exitosa
    echo json_encode([
        'status' => 'success',
        'message' => 'Entrenamiento registrado exitosamente',
        'newPoints' => $newPoints,
        'updatedWorkouts' => $workouts
    ]);

} catch (Exception $e) {
    error_log("Error en registerTraining.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) {
        $stmt->close();
    }
    if (isset($conn)) {
        $conn->close();
    }
}
?>