<?php
// Conexión a la base de datos
$servername = "sql108.infinityfree.com"; // Cambiar por el servidor de la base de datos
$username = "if0_37726901"; // Usuario de la base de datos
$password = "Tecnologias321 "; // Contraseña de la base de datos
$dbname = "if0_37726901_fitnessplus"; // Nombre de la base de datos

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
