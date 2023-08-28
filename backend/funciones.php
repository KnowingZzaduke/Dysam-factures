<?php
// Conexión a la base de datos
$usuario = "root";
$password = "";
$servidor = 'localhost';
$basededatos = 'dysam_facturas';

$conexion = new mysqli($servidor, $usuario, $password, $basededatos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

?>
