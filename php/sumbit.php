<?php
#En un futuro los datos seran guardados en una base de datos online
$servername = "undefined";
$username = "root";
$password = "root";
$dbname = "pruebasdb";
error_reporting(E_All);
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexion fallida : " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $numeroCuenta = $_POST['numeroCuenta'];
    $nombreBanco = $_POST['nombreBanco'];
    $tipoCuenta = $_POST['tipoCuenta'];
    $estadoCuenta = $_POST['estadoCuenta'];
    $fechaApertura = $_POST['fechaApertura'];
    $saldo = $_POST['saldo'];
    $descripcion = $_POST['descripcion'];
}

$sql = "INSERT INTO cuentabancaria (numeroCuenta,nombreBanco,tipoCuenta,estadoCuenta,fechaApertura,saldo,descripcion) VALUES ('$numeroCuenta', '$nombreBanco', '$tipoCuenta', '$estadoCuenta', '$fechaApertura', '$saldo', '$descripcion')";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error" . $sql . $conn->error;
}

$conn->close();
?>