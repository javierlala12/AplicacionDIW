<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idregistro = $_POST['record_id'];

// SQL
$sql = "SELECT * FROM maintenance_records WHERE record_id = $idregistro;";

$resultado = mysqli_query($conexion, $sql);

// Pedir una fila
$fila = mysqli_fetch_assoc($resultado);

if ($fila) { // Devuelve datos
    // responder(datos, error, mensaje, conexion)
    responder($fila, false, "Registro encontrado", $conexion);
} else { // No hay datos
    responder(null, true, "No existe el registro de mantenimiento", $conexion);
}
