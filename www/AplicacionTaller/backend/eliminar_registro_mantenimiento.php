<?php
require_once('config.php');
$conexion = obtenerConexion();

// Recoger datos de entrada
$idregistro = $_POST['idregistro'];

// SQL
$sql = "DELETE FROM maintenance_records WHERE record_id = $idregistro;";

$resultado = mysqli_query($conexion, $sql);

// responder(datos, error, mensaje, conexion)
responder(null, false, "Datos eliminados", $conexion);