<?php
require_once('config.php');
$conexion = obtenerConexion();

// No hay datos de entrada

// SQL
$sql = "SELECT * FROM vehicles;";

$resultado = mysqli_query($conexion, $sql);

while ($fila = mysqli_fetch_assoc($resultado)) {
    $vehiculos[] = $fila; // Insertar la fila en el array
}

if ($vehiculos) {
    // responder(datos, error, mensaje, conexion)
    responder($vehiculos, false, "Listado de vehículos obtenido", $conexion);
} else {
    // responder(datos, error, mensaje, conexion)
    responder(null, true, "No se encontraron vehículos", $conexion);
}