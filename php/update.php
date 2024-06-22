<?php
// Conectar a la base de datos
$dsn = 'mysql:host=localhost;dbname=finanzasmalbin';
$username = "migueldb";
$password = "root";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error de conexión: " . $e->getMessage();
    exit();
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $numeroCuenta = $_POST['numeroCuenta'];
    $nombreBanco = $_POST['nombreBanco'];
    $tipoCuenta = $_POST['tipoCuenta'];
    $estadoCuenta = $_POST['estadoCuenta'];
    $fechaApertura = $_POST['fechaApertura'];
    $saldo = $_POST['saldo'];
    $descripcion = $_POST['descripcion'];

    $sql = "UPDATE cuentasbancarias
            SET 
                nombreBanco = :nombreBanco,
                tipoCuenta = :tipoCuenta,
                estadoCuenta = :estadoCuenta,
                fechaApertura = :fechaApertura,
                saldo = :saldo,
                descripcion = :descripcion
            WHERE numeroCuenta = :numeroCuenta";

    $stmt = $pdo->prepare($sql);

    $stmt->bindParam(':nombreBanco', $nombreBanco);
    $stmt->bindParam(':tipoCuenta', $tipoCuenta);
    $stmt->bindParam(':estadoCuenta', $estadoCuenta);
    $stmt->bindParam(':fechaApertura', $fechaApertura);
    $stmt->bindParam(':saldo', $saldo);
    $stmt->bindParam(':descripcion', $descripcion);
    $stmt->bindParam(':numeroCuenta', $numeroCuenta);

    if ($stmt->execute()) {
        echo "Cuenta actualizada exitosamente.";
    } else {
        echo "Error al actualizar la cuenta.";
    }
}
?>