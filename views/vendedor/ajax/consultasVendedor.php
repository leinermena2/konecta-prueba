<?php
include '../../../conexion.php';

$type = $_POST['tipo'];
$fecha_actual = date("Y-m-d H:i:s");

switch ($type) {
    case 1: //Mostrar productos
        $getProductos = "SELECT * FROM vproductos";
        $execute = mysqli_query($con, $getProductos);

        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

}