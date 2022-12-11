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

    case 2: // mostrar producto en especifico    
        $id = $_POST['id'];
        $getOneProductos = "SELECT pdt.* , bd.nombre as nombre_bodega, ct.nombre as nombre_categoria 
        FROM productos pdt INNER JOIN bodegas bd ON bd.id = pdt.bodega_id INNER JOIN categorias ct ON ct.id = pdt.categoria_id
        WHERE pdt.id_producto = $id";

        $execute = mysqli_query($con, $getOneProductos);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

    case 3: //obtener categorias
        $getCategorias = "SELECT * FROM categorias";
        $execute = mysqli_query($con, $getCategorias);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

    case 4: //obtener bodegas
        $getBodegas = "SELECT * FROM bodegas";
        $execute = mysqli_query($con, $getBodegas);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

    case 5: //crear productos

        $informacion = $_POST['datos'];
        $referencia = $informacion[0];
        $precio = intval($informacion[1]);
        $peso = intval($informacion[2]);
        $categoria_id = intval($informacion[3]);
        $bodega_id = intval($informacion[4]);
        $stock = intval($informacion[5]);
        $user_id = intval($informacion[6]);
        $user_name = intval($informacion[7]);

        $consultaCreate = "INSERT INTO productos (referencia,precio,peso,categoria_id,bodega_id,stock,fecha_creacion) VALUES
       ('$referencia',$precio,$peso,$categoria_id,$bodega_id,$stock,'$fecha_actual')";

        $execute = mysqli_query($con, $consultaCreate);

        if ($execute) {
            $id_producto = mysqli_insert_id($con);
            $historico = "El dia $fecha_actual el usuario $user_name creo el producto $referencia, stock actual $stock, precio $precio; ver tabla de productos para mas informacion";
            $consultaCreateHistorial = "INSERT INTO historial_productos (item_id,usuario_id,informacion,fecha) VALUES 
            ($id_producto,$user_id,'$historico','$fecha_actual')";

            $executeH = mysqli_query($con, $consultaCreateHistorial);

            if ($executeH) {
                echo 1;
            } else {
                echo 2;
            }

        } else {
            echo 0;
        }

        break;

    case 6: // actualizar productos
        $informacion = $_POST['datos'];
        $referencia = $informacion[0];
        $precio = intval($informacion[1]);
        $peso = intval($informacion[2]);
        $categoria_id = intval($informacion[3]);
        $bodega_id = intval($informacion[4]);
        $stock = intval($informacion[5]);
        $user_id = intval($informacion[6]);
        $user_name = intval($informacion[7]);
        $id = $_POST['id'];
        $consultaUpdate = "UPDATE productos SET referencia='$referencia', precio=$precio,peso = $peso, categoria_id = $categoria_id, bodega_id = $bodega_id,stock = $stock  WHERE id_producto = $id";
        $execute = mysqli_query($con, $consultaUpdate);

        if ($execute) {
            $id_producto = $id;
            $historico = "El dia $fecha_actual el usuario $user_name actualizo el producto $referencia, stock actual $stock, precio $precio; ver tabla de productos para mas informacion";
            $consultaCreateHistorial = "INSERT INTO historial_productos (item_id,usuario_id,informacion,fecha) VALUES 
            ($id_producto,$user_id,'$historico','$fecha_actual')";

           
            $executeH = mysqli_query($con, $consultaCreateHistorial);

            if ($executeH) {
                echo 1;
            } else {
                echo 2;
            }

        } else {
            echo 0;
        }
        break;

    case 7: // inhabilitar item productos 
        $id = $_POST['id'];
        $user_name = $_POST['user_name'];
        $user_id = $_POST['user_id'];
        $referencia = $_POST['referencia'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $historico = "El dia $fecha_actual el usuario $user_name inhabilito el producto $referencia, stock actual $stock, precio $precio; ver tabla de productos para mas informacion";

        $consultaInhabilitar = "UPDATE productos SET estado = 0 WHERE id_producto = $id";
        $execute = mysqli_query($con, $consultaInhabilitar);
        if ($execute) {
            $id_producto = $id;
            $consultaCreateHistorial = "INSERT INTO historial_productos (item_id,usuario_id,informacion,fecha) VALUES 
            ($id_producto,$user_id,'$historico','$fecha_actual')";

            $executeH = mysqli_query($con, $consultaCreateHistorial);

            if ($executeH) {
                echo 1;
            } else {
                echo 2;
            }

        } else {
            echo 0;
        }
        break;

    case 8: // habilitar item productos 
        $id = $_POST['id'];
        $user_name = $_POST['user_name'];
        $user_id = $_POST['user_id'];
        $referencia = $_POST['referencia'];
        $stock = $_POST['stock'];
        $precio = $_POST['precio'];
        $historico = "El dia $fecha_actual el usuario $user_name habilito el producto $referencia, stock actual $stock, precio $precio; ver tabla de productos para mas informacion";

        $consultaHabilitar = "UPDATE productos SET estado = 1 WHERE id_producto = $id";
        $execute = mysqli_query($con, $consultaHabilitar);
        if ($execute) {
            $id_producto = $id;
            $consultaCreateHistorial = "INSERT INTO historial_productos (item_id,usuario_id,informacion,fecha) VALUES 
            ($id_producto,$user_id,'$historico','$fecha_actual')";

            $executeH = mysqli_query($con, $consultaCreateHistorial);

            if ($executeH) {
                echo 1;
            } else {
                echo 2;
            }

        } else {
            echo 0;
        }
        break;

    case 9:
        $id = $_POST['id'];
        $getHistorialItem = "SELECT * FROM historial_productos WHERE item_id=$id";
        $execute = mysqli_query($con, $getHistorialItem);
        $dataR = [];
        foreach ($execute as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);
        break;

}