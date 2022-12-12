<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../../head.php'; ?>
    <title>Administrador Konecta</title>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <div class="container">
        <?php include 'includes/tabs.php'; ?>
        <hr>
        
        <div id="productos">
            <button type="button" class="btn btn-primary rounded-pill" data-bs-toggle="modal"
                data-bs-target="#crearProductoModal" onclick="loadBodega()"><i class="fa-solid fa-plus"></i> Crear nuevo producto</button>
                <a href="../vendedor/" class="btn btn-danger rounded-pill">IR AL PANEL DE VENDEDORES</a>
                <div id="contenedorProductos" class="mt-2"></div>
                <?php include 'includes/tablaProductos.php'; ?>
        </div>
        <div id="categorias">
            <button type="button" class="btn btn-danger form-control rounded-pill" data-bs-toggle="modal"
                data-bs-target="#crearCategoriaModal"><i class="fa-solid fa-plus"></i> Crear nueva categoria</button>
            <br>
                <label for="">Buscar categoria:</label>
            <input type="text" class="form-control rounded-pill" id="SearchCategorias">
            <div id="contenedorCategorias" class="mt-2"></div>
        </div>
        
        <div id="reportes">
            <h3>LOS REPORTES AUN NO ESTAN DISPONIBLES, LAS CONSULTAS SERAN AJUNTADAS AL CORREO ELECTRONICO</h3>
        </div>
    </div>
    <?php include 'includes/modalCreateCategoria.php'; ?>
    <?php include 'includes/modalEditCategoria.php'; ?>
    <?php include 'includes/modalCreateProducto.php'; ?>
    <?php include 'includes/modalEditProducto.php'; ?>
    <?php include 'includes/modalGetHistorial.php'; ?>
</body>
<script src="js/funciones.js"></script>

</html>