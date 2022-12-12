<?php
include '../../../conexion.php';

$type = $_POST['type'];

switch ($type) {
    case 1:
        $informacion = $_POST['datos'];

        $nombre = $informacion[0];
        $password = $informacion[1];

        $consultarExistencia = "SELECT * FROM usuarios WHERE nombre = '$nombre' AND passw = '$password'";
        $execute = mysqli_query($con, $consultarExistencia);
        if (mysqli_num_rows($execute) > 0) {
            while ($rowCatData = mysqli_fetch_array($execute)) {
                echo json_encode($rowCatData);
            }
        }
        if (mysqli_num_rows($execute) == 0) {
            echo 0;
        }

        break;
    case 2:
        $informacion = $_POST['datos'];
        $nombre = $informacion[0];
        $apellido = $informacion[1];
        $tipo_usuario_id = $informacion[2];
        $contraseña = $informacion[3];

        $ConsultaExistencia = $con->query("SELECT count(id_usuario) as existencia FROM usuarios WHERE nombre = '$nombre'");

        foreach ($ConsultaExistencia as $datos) {
            $counterExistencia = $datos['existencia'];

            if ($counterExistencia > 0) {
                echo 2;

            }
        }


        $ConsultaInsertData = "INSERT INTO usuarios (tipo_usuario_id,nombre,apellido,passw,estado) 
VALUES ($tipo_usuario_id,'$nombre','$apellido','$contraseña',1)";

        $execute = $con->query($ConsultaInsertData);


        if ($execute) {
            echo 1;

        } else {
            echo 0;

        }
        break;



}