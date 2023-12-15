<?php

include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$registro_mantenimiento = json_decode($_POST['registro_mantenimiento']);

$sql = "UPDATE maintenance_records
        SET maintenance_date = '$registro_mantenimiento->maintenance_date', 
            maintenance_type = '$registro_mantenimiento->maintenance_type', 
            maintenance_description = '$registro_mantenimiento->maintenance_description', 
            cost = $registro_mantenimiento->cost, 
            vehicle_id = '$registro_mantenimiento->vehicle_id', 
            technician = '$registro_mantenimiento->technician', 
            assigned_box = '$registro_mantenimiento->assigned_box'
        WHERE record_id = $registro_mantenimiento->record_id";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha modificado el registro de mantenimiento", $conexion);
}

