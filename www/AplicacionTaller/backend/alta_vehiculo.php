<?php

include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos del formulario
$vehicle_make = $_POST['vehicle_make'];
$vehicle_model = $_POST['vehicle_model'];
$vehicle_year = $_POST['vehicle_year'];
$license_plate = $_POST['license_plate'];
$owner = $_POST['owner'];
$fuel_type = $_POST['fuel_type'];
$kilometers = $_POST['kilometers'];
$transmission_type = $_POST['transmission_type'];
$color = $_POST['color'];

$sql = "INSERT INTO vehicles (vehicle_make, vehicle_model, vehicle_year, license_plate, owner, fuel_type, kilometers, color) VALUES ('$vehicle_make', '$vehicle_model', '$vehicle_year', '$license_plate', '$owner', '$fuel_type', '$kilometers', '$color')";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);
} else {
    responder(null, false, "Se ha insertado el vehículo", $conexion);
}

