<?php
require_once('config.php');
$conexion = obtenerConexion();

// Datos de entrada
$idVehiculo = $_GET['vehicle_id'];

// SQL
$sql = "SELECT * FROM maintenance_records WHERE vehicle_id = $idVehiculo;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $mantenimientos[] = $fila; // Insertar la fila en el array
}

if ($mantenimientos) {
    // responder(datos, error, mensaje, conexion)
    responder($mantenimientos, false, "Listado de mantenimientos por vehículo obtenido", $conexion);
} else {
    // responder(datos, error, mensaje, conexion)
    responder(null, true, "No se encontraron mantenimientos para el vehículo", $conexion);
}

