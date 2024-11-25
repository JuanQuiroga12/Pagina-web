<?php
// Configuración inicial
error_reporting(0); // Desactivar la salida de errores PHP
header('Content-Type: application/json'); // Asegurar que la respuesta sea JSON
header('Access-Control-Allow-Origin: http://fitnessplus.free.nf');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $servername = "sql313.infinityfree.com";
    $username = "if0_37732549";
    $password = "Tecno321";
    $dbname = "if0_37732549_fitnessplus";
    $port = 3306;

    // Crear conexión con manejo de excepciones
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        throw new Exception('Error de conexión: ' . $conn->connect_error);
    }

    // Obtener y validar datos de entrada
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!isset($data['username']) || empty($data['username'])) {
        throw new Exception('Usuario no especificado.');
    }

    $username = $data['username'];

    // Consulta principal de usuario
    $sql = "SELECT id, username, email, puntos, productos FROM usuarios WHERE username = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        throw new Exception('Error en la preparación de la consulta: ' . $conn->error);
    }

    $stmt->bind_param("s", $username);
    
    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar la consulta: ' . $stmt->error);
    }

    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        throw new Exception('Usuario no encontrado.');
    }

    $user = $result->fetch_assoc();
    
    // Preparar datos del usuario
    $userData = [
        'id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'puntos' => (int)$user['puntos'],
        'productos' => json_decode($user['productos'] ?? '[]', true)
    ];

    // Obtener reservas
    $sqlReservations = "SELECT date, time, trainerImage FROM reservas WHERE user_id = ?";
    $stmtReservations = $conn->prepare($sqlReservations);
    
    if (!$stmtReservations) {
        throw new Exception('Error al preparar consulta de reservas.');
    }

    $stmtReservations->bind_param("i", $user['id']);
    $stmtReservations->execute();
    $resultReservations = $stmtReservations->get_result();
    
    $reservations = [];
    while ($row = $resultReservations->fetch_assoc()) {
        $reservations[] = $row;
    }

    // Obtener entrenamientos
    $sqlWorkouts = "SELECT DATE, tipoentrenamiento, TIME FROM entrenamientos WHERE user_id = ?";
    $stmtWorkouts = $conn->prepare($sqlWorkouts);
    
    if (!$stmtWorkouts) {
        throw new Exception('Error al preparar consulta de entrenamientos.');
    }

    $stmtWorkouts->bind_param("i", $user['id']);
    $stmtWorkouts->execute();
    $resultWorkouts = $stmtWorkouts->get_result();
    
    $workouts = [];
    while ($row = $resultWorkouts->fetch_assoc()) {
        $workouts[] = $row;
    }

    // Preparar respuesta final
    $response = [
        'status' => 'success',
        'user' => array_merge($userData, [
            'reservas' => $reservations,
            'entrenamientos' => $workouts
        ])
    ];

    echo json_encode($response);

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
} finally {
    if (isset($stmt)) $stmt->close();
    if (isset($stmtReservations)) $stmtReservations->close();
    if (isset($stmtWorkouts)) $stmtWorkouts->close();
    if (isset($conn)) $conn->close();
}
?>