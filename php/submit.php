<?php
$servername = "localhost";
$username = "migueldb";
$password = "root";
$dbname = "finanzasmalbin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $numeroCuenta = $_POST['numeroCuenta'];
    $nombreBanco = $_POST['nombreBanco'];
    $tipoCuenta = $_POST['tipoCuenta'];
    $estadoCuenta = $_POST['estadoCuenta'];
    $fechaApertura = $_POST['fechaApertura'];
    $saldo = $_POST['saldo'];
    $descripcion = $_POST['descripcion'];

    $sql = "INSERT INTO cuentasbancarias (numeroCuenta, nombreBanco, tipoCuenta, estadoCuenta, fechaApertura, saldo, descripcion)
            VALUES ('$numeroCuenta', '$nombreBanco', '$tipoCuenta', '$estadoCuenta', '$fechaApertura', '$saldo', '$descripcion')";

    if ($conn->query($sql) === TRUE) {
        echo "Datos insertados correctamente";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
} else {
    echo "No se recibieron datos por POST.";
}
?>
