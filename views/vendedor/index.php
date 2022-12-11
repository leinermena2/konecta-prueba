<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php include '../../head.php'; ?>
    <title>Store | Konecta</title>
</head>

<body>
    <?php include 'includes/navbar.php'; ?>
    <div class="container">
        <button type="button" class="btn btn-danger form-control rounded-pill mt-4" data-bs-toggle="modal"
            data-bs-target="#crearCotizacionModal"><i class="fa-solid fa-plus"></i> Crear nueva cotizacion</button>
        <br>
        <label for="">Buscar cotizacion:</label>
        <input type="text" class="form-control rounded-pill" id="SearchCotizaciones">
        <div id="contenedorcotizaciones" class="mt-2"></div>
    </div>
</body>

</html>