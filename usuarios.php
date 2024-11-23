<?php

header('Access-Control-Allow-Origin: http://fitnessplus.free.nf');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Conexión a la base de datos
$servername = "sql313.infinityfree.com";
$username = "if0_37732549"; // Cambiar por tu usuario de la base de datos
$password = "Tecno321"; // Cambiar por tu contraseña de la base de datos
$dbname = "if0_37732549_fitnessplus"; // Cambiar por el nombre de tu base de datos
$port = 3306; // Puerto de la base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Manejar solicitudes POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'login') {
        // Validar usuario
        $username = $_POST['username'];
        $password = $_POST['password'];

        $sql = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Usuario válido"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Usuario o contraseña incorrectos"]);
        }
    } elseif ($action === 'register') {
        // Registrar nuevo usuario
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];

        $sql = "INSERT INTO usuarios (username, password, email) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $password, $email);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Usuario registrado exitosamente"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error al registrar usuario"]);
        }
    }
}

$conn->close();
?>
