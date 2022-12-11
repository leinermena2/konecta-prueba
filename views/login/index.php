<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Login / Registro</title>
  <?php include '../../head.php'; ?>
  <link rel="stylesheet" href="css/style.css">
</head>

<body>
  <div class="container">
    <input type="checkbox" id="check">
    <div class="login form">
      <header>INGRESAR - KONECTA</header>

      <input type="text" id="nombre" class="rounded-pill" placeholder="Escribe tu nombre">
      <input type="password" id="passw" class="rounded-pill" placeholder="Constraseña">

      <input type="button" class="button rounded-pill" id="loginButton" onclick="login()" value="Ingresar">
      </form>
      <div class="signup">
        <span class="signup">No tienes una cuenta?
          <label for="check">Registrarse</label>
        </span>
      </div>
    </div>
    <div class="registration form">
      <header>REGISTRARSE - KONECTA</header>

      <input type="text" id="nombreR" class="rounded-pill" placeholder="Escribe tu nombre">
      <input type="text" id="apellidoR" class="rounded-pill" placeholder="Escribe tu apellido">
      <input type="password" id="passwR" class="rounded-pill" placeholder="Crear una contraseña">
      <select class="form-control rounded-pill" class="rounded-pill" id="tipo_usuario_id">
        <option value="">Seleccionar una opcion</option>
        <option value="1">ADMINISTRADOR</option>
        <option value="2">VENDEDOR</option>
      </select>

      <input type="button" onclick="crearCuenta()" class="button" class="rounded-pill" value="Registrarse">

      <div class="signup">
        <span class="signup">Ya tienes una cuenta?
          <label for="check">Ingresar</label>
        </span>
      </div>
    </div>
  </div>
</body>
<script src="js/funciones.js"></script>

</html>