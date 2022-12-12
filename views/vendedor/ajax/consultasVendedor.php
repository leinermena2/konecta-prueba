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

    case 3: // guardarItems INDEVIDUARTES EN LA BASE DE DATOS Y CREAR COTIZACIONES
        $datosUser = $_POST['datosCot'];
        $datosDetalle = $_POST['datosProd'];


        $consultaBuscarCotizacionesActivasUser = "SELECT * FROM vcotizaciones WHERE user_id = $datosUser[0] AND estado = 1";
        $executeSearch = mysqli_query($con, $consultaBuscarCotizacionesActivasUser);

        if (mysqli_num_rows($executeSearch) > 0) {
            $id = 0;
            while ($rowCatData = mysqli_fetch_array($executeSearch)) {
                $id = $rowCatData['cotID'];
            }
            $sqlInsertDetalle = "INSERT INTO detalle_cotizacion (id_cotizacion,item_id,cantidad,costo_unitario,total,fecha) VALUES
            ($id,$datosDetalle[0],$datosDetalle[1],$datosDetalle[2],$datosDetalle[3],'$fecha_actual')";

            $executeID = mysqli_query($con, $sqlInsertDetalle);

            if ($executeID) {
                $sqlGetDetails = "SELECT * FROM vcotizaciones WHERE user_id = $datosUser[0] and estado = 1";
                $executeD = mysqli_query($con, $sqlGetDetails);
                $dataR = [];
                foreach ($executeD as $value) {
                    $dataR[] = $value;
                }
                echo json_encode($dataR);

            }
        } else {

            $consultaInsertCot = "INSERT INTO cotizacion (usuario_id,cliente,sub_total,iva,total,fecha_creacion,estado) VALUES 
            ($datosUser[0],'$datosUser[1]',0,0,0,'$fecha_actual',1)";

            $executeCreteCot = mysqli_query($con, $consultaInsertCot);
            $id = mysqli_insert_id($con);
            if ($executeCreteCot) {
                $sqlInsertDetalle = "INSERT INTO detalle_cotizacion (id_cotizacion,item_id,cantidad,costo_unitario,total,fecha) VALUES
                ($id,$datosDetalle[0],$datosDetalle[1],$datosDetalle[2],$datosDetalle[3],'$fecha_actual')";

                $executeID = mysqli_query($con, $sqlInsertDetalle);

                if ($executeID) {
                    $sqlGetDetails = "SELECT * FROM vcotizaciones WHERE user_id = $datosUser[0] and estado = 1";
                    $executeD = mysqli_query($con, $sqlGetDetails);
                    $dataR = [];
                    foreach ($executeD as $value) {
                        $dataR[] = $value;
                    }
                    echo json_encode($dataR);

                } else {
                    echo 2;
                }
            } else {
                echo 0;
            }
        }

        break;

    case 4:
        $userId = $_POST['userID'];

        $consultaGetId = mysqli_query($con, "SELECT * FROM vcotizaciones WHERE user_id = $userId and estado = 1");

        while ($rowCatData = mysqli_fetch_array($consultaGetId)) {
            $id = $rowCatData['cotID'];
        }

        $consultaUpdate = "UPDATE cotizacion SET estado = 2 WHERE id_cotizacion = $id";
        $execute = mysqli_query($con, $consultaUpdate);

        if ($execute) {
            $selectDetails = mysqli_query($con, "SELECT * FROM vcotizaciones WHERE cotID = $id");
            $total = 0;
            $iva = 0;
            $subtotal = 0;
            while ($val = mysqli_fetch_array($selectDetails)) {
                $itemId = $val['item_id'];
                $nombreUser = $val['nombre_user'];
                $referencia = $val['referencia'];
                $cliente = $val['cliente'];
                $cotNumber = $val['cotID'];
                $precio = $val['unitarioItem'];
            
                $stockActual = 0;

                $total += $precio;

                $nuevoStock = intval($val['stock']) - intval($val['cantidad']);
                $updateStock = mysqli_query($con, "UPDATE productos SET stock = $nuevoStock WHERE id_producto = $itemId");
                if ($updateStock) {
                    $historico = "El dia $fecha_actual el usuario $nombreUser vendio el producto $referencia al cliente $cliente en la cotizacion numero $cotNumber, stock actual $nuevoStock, precio $precio; ver tabla de cotizaciones para mas informacion";
                    $consultaCreateHistorial = "INSERT INTO historial_productos (item_id,usuario_id,informacion,fecha) VALUES 
        ($itemId,$userId,'$historico','$fecha_actual')";

                    $executeH = mysqli_query($con, $consultaCreateHistorial);


                } else {
                    echo 3;
                }

            }

            $subtotal = $total / 1.19;
            $iva = $subtotal - $total;
            $consultaUpdateC = "UPDATE cotizacion SET sub_total = $subtotal, iva = $iva, total = $total WHERE id_cotizacion = $id";
            $executec = mysqli_query($con, $consultaUpdateC);
            if ($executec) {
                echo 1;
            } else {
                echo 2;
            }

        } else {
            echo 0;
        }
        break;

    case 5:
        $sqlGetCotizaciones = "SELECT * FROM cotizacion WHERE estado = 2";
        $executeD = mysqli_query($con, $sqlGetCotizaciones);
        $dataR = [];
        foreach ($executeD as $value) {
            $dataR[] = $value;
        }
        echo json_encode($dataR);

        break;

        
    case 6:
        $user_id = $_POST['user_id'];
        $sqlGetDetails = "SELECT * FROM vcotizaciones WHERE user_id = $user_id and estado = 1";
        $executeD = mysqli_query($con, $sqlGetDetails);
        $dataR = [];
        foreach ($executeD as $value) {
            $dataR[] = $value;
        }
        if ($dataR != []) {

            echo json_encode($dataR);
        } else {
            echo 0;
        }
        break;

}