<?php

include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos del formulario
$maintenance_date = $_POST['maintenance_date'];
$maintenance_type = $_POST['maintenance_type'];
$maintenance_description = $_POST['maintenance_description'];
$cost = $_POST['cost'];
$vehicle_id = $_POST['vehicle_id'];
$technician = $_POST['technician'];
$assigned_box = $_POST['assigned_box'];
print_r($_POST);

// Validar datos si es necesario
$sql = "INSERT INTO maintenance_records (maintenance_date, maintenance_type, maintenance_description, cost, vehicle_id, technician, assigned_box) VALUES ('$maintenance_date', '$maintenance_type', '$maintenance_description', '$cost', '$vehicle_id', '$technician', '$assigned_box')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    // Log del error
    error_log("Error $numerror: $descrerror", 0);

    // Mensaje al usuario
    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    // Cerrar la conexión
    mysqli_close($conexion);

    // Mensaje al usuario
    responder(null, false, "Se ha dado de alta el registro de mantenimiento", $conexion);
}


