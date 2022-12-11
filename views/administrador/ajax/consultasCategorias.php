<?php

include '../../../conexion.php';

$type = $_POST['tipo'];

switch ($type) {
    case 1: //Mostrar categorias
        $getCategorias = "SELECT * FROM categorias";
        $execute = mysqli_query($con, $getCategorias);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

    case 4: //Mostrar categoria en especfio
        $id = $_POST['id'];
        $getCategorias = "SELECT * FROM categorias WHERE id = $id";
        $execute = mysqli_query($con, $getCategorias);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

    case 2: //crear categorias
        $informacion = $_POST['datos'];
        $nombre = $informacion[0];
        $descripcion = $informacion[1];

        $consulaCreate = "INSERT INTO categorias (nombre, descripcion) VALUES ('$nombre','$descripcion')";
        $execute = mysqli_query($con, $consulaCreate);

        if ($execute) {
            echo 1;
        } else {
            echo 0;
        }
        break;

    case 3: //editar categorias
        $informacion = $_POST['datos'];
        $nombre = $informacion[0];
        $descripcion = $informacion[1];
        $id = intval($informacion[2]);

        $consultaUpdate = "UPDATE categorias SET nombre='$nombre', descripcion='$descripcion' WHERE id=$id";
        $execute = mysqli_query($con, $consultaUpdate);

        if ($execute) {
            echo 1;
        } else {
            echo 0;
        }

        break;

}