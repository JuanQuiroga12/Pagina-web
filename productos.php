<?php
// Configuración inicial
error_reporting(0);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://fitnessplus.free.nf');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

try {
    $servername = "sql313.infinityfree.com";
    $username = "if0_37732549";
    $password = "Tecno321";
    $dbname = "if0_37732549_fitnessplus";
    $port = 3306;

    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        throw new Exception('Error de conexión: ' . $conn->connect_error);
    }

    // Obtener datos de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);
    $action = $input['action'] ?? '';

    switch ($action) {
        case 'getProducts':
            // Obtener lista de productos disponibles con sus categorías
            $sql = "SELECT p.*, c.nombre as categoria 
                    FROM productos p 
                    INNER JOIN categorias c ON p.categoria_id = c.id 
                    WHERE p.activo = TRUE 
                    ORDER BY c.nombre, p.nombre";
            
            $result = $conn->query($sql);
            
            if (!$result) {
                throw new Exception('Error al obtener productos: ' . $conn->error);
            }
            
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = [
                    'id' => $row['id'],
                    'nombre' => $row['nombre'],
                    'puntos' => $row['puntos'],
                    'imagen' => $row['imagen'],
                    'stock' => $row['stock'],
                    'categoria' => $row['categoria']
                ];
            }
            
            if (empty($products)) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'No hay productos disponibles'
                ]);
                break;
            }
            
            echo json_encode([
                'status' => 'success',
                'products' => $products
            ]);
            break;
        
        // Modificación en el caso redeemProduct
        case 'redeemProduct':
            if (!isset($input['id']) || !isset($input['productId'])) {
                throw new Exception('Datos incompletos para el canje');
            }
        
            // Primero obtener el ID del usuario
            $stmt = $conn->prepare("SELECT id, puntos FROM usuarios WHERE username = ?");
            $stmt->bind_param("s", $input['username']);
            $stmt->execute();
            $userResult = $stmt->get_result();
            
            if ($userResult->num_rows === 0) {
                throw new Exception('Usuario no encontrado');
            }
            
            $userData = $userResult->fetch_assoc();
            $userId = $userData['id'];
            $userPoints = $userData['puntos'];

            $userId = $input['id'];
            $productId = $input['productId'];

            // Iniciar transacción
            $conn->begin_transaction();

            // Verificar producto y stock
            $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ? AND activo = TRUE AND stock > 0");
            $stmt->bind_param("i", $productId);
            $stmt->execute();
            $product = $stmt->get_result()->fetch_assoc();

            if (!$product) {
                throw new Exception('Producto no disponible');
            }

            // Verificar puntos del usuario
            $stmt = $conn->prepare("SELECT puntos FROM usuarios WHERE id = ?");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $user = $stmt->get_result()->fetch_assoc();

            if ($user['puntos'] < $product['puntos']) {
                throw new Exception('Puntos insuficientes');
            }

            // Registrar el canje
            $stmt = $conn->prepare("INSERT INTO canjes (user_id, producto_id, puntos_gastados) VALUES (?, ?, ?)");
            $stmt->bind_param("iii", $userId, $productId, $product['puntos']);
            $stmt->execute();

            // Actualizar puntos del usuario
            $newPoints = $user['puntos'] - $product['puntos'];
            $stmt = $conn->prepare("UPDATE usuarios SET puntos = ? WHERE id = ?");
            $stmt->bind_param("ii", $newPoints, $userId);
            $stmt->execute();

            // Actualizar stock del producto
            $newStock = $product['stock'] - 1;
            $stmt = $conn->prepare("UPDATE productos SET stock = ? WHERE id = ?");
            $stmt->bind_param("ii", $newStock, $productId);
            $stmt->execute();

            $conn->commit();

            echo json_encode([
                'status' => 'success',
                'message' => 'Canje realizado exitosamente',
                'newPoints' => $newPoints
            ]);
            break;

        case 'getRedemptionHistory':
            if (!isset($input['id'])) {
                throw new Exception('Usuario no especificado');
            }

            $userId = $input['id'];
            $sql = "SELECT c.*, p.nombre, p.imagen 
                    FROM canjes c 
                    JOIN productos p ON c.producto_id = p.id 
                    WHERE c.user_id = ? 
                    ORDER BY c.fecha_canje DESC";
            
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $redemptions = [];
            while ($row = $result->fetch_assoc()) {
                $redemptions[] = $row;
            }
            
            echo json_encode([
                'status' => 'success',
                'redemptions' => $redemptions
            ]);
            break;

        case 'getUserPoints':
            if (!isset($input['id'])) {
                throw new Exception('Usuario no especificado');
            }

            $userId = $input['id'];
            $stmt = $conn->prepare("SELECT puntos FROM usuarios WHERE id = ?");
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $user = $result->fetch_assoc();

            echo json_encode([
                'status' => 'success',
                'points' => $user['puntos']
            ]);
            break;

        default:
            throw new Exception('Acción no válida');
    }

} catch (Exception $e) {
    if (isset($conn) && $conn->connect_error === null) {
        $conn->rollback();
    }
    
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