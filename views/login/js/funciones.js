
function crearCuenta() {
    //verificar datos
    let nombre = $("#nombreR").val();
    let apellido = $("#apellidoR").val();
    let tipo_usuario_id = $("#tipo_usuario_id option:selected").val();
    let contrasena = MD5($("#passwR").val());

    let arrDatos = [
        nombre,
        apellido,
        tipo_usuario_id,
        contrasena
    ];
    if (nombre == "" || nombre == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes escribir tu nombre!",
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }
    if (apellido == "" || apellido == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes escribir tu apellido!",
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }


    if (contrasena == "" || contrasena == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes escribir tu contraseña!",
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }

    if (tipo_usuario_id == "" || tipo_usuario_id == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes seleccionar tu tipo de usuario!",
            showConfirmButton: false,
            timer: 2500,
        });
        return;
    }

    Swal.fire({
        title: "¿Verificaste tus datos?",
        text: "Gracias por confiar en nosotros!",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#00c4a7",
        cancelButtonColor: "#CDCDCD",
        confirmButtonText: "Si, Enviar datos",
        cancelButtonText: "No, Verificar datos",
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultas.php",
                data: {
                    type: 2,
                    datos: arrDatos
                },
                success: function (response) {
                    if (response.data == 1) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Exitoso',
                            showConfirmButton: false,
                            timer: 2500,
                            position: "top-end"
                        })
                    }
                    $("#nombre").val(nombre);
                    $("#passw").val(contrasena);
                    $("#loginButton").trigger("click");
                    if (response.data == 2) {
                        Swal.fire({
                            icon: 'info',
                            title: 'Usuario Existente',
                            text: 'Los datos ingresados ya se encuentran registrados en nuestro sistema!',
                            showConfirmButton: false,
                            timer: 2500,
                            position: "bottom-end"
                        })
                    }

                    if (response.data == 0) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Ocurrio un error al crear tu cuenta!",
                            footer: '<a href="">Reportar error!!</a>'
                        });
                    }
                },
            });
        }
    });
}
// $(document).ready(function () {
// let session = localStorage.getItem("usuario");
// if (session != null || session.length != 0) {
//   window.location.href ="../store/";
// }
// });

function login() {
    let nombre = $("#nombre").val();
    let password = MD5($("#passw").val());
    let arrDatos = [nombre, password];

    if (nombre == "" || nombre == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes escribir tu nombre!",
            showConfirmButton: false,
            timer: 2500,
        });

        $("#nombre").addClass("border-danger");
        return;
    }

    if (password == "" || password == null) {
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Debes escribir tu password!",
            showConfirmButton: false,
            timer: 2500,
        });
        $("#passw").addClass("border-danger");
        return;
    }

    $.ajax({
        type: "POST",
        url: "ajax/consultas.php",
        data: {
            type: 1,
            datos: arrDatos,
        },
        success: function (response) {
            if (response != 0) {
                let dataArr = JSON.parse(response);
                let id = dataArr["id_usuario"];
                let nombres = dataArr["nombre"];
                let tipo_usuario_id = dataArr["tipo_usuario_id"];
                let apellidos = dataArr["apellido"];

                let item = [
                    id,
                    tipo_usuario_id,
                    nombres,
                    apellidos
                ];
                //guardamos la data en el localstorage
                localStorage.setItem("usuario", item);
                //mensaje de bienvenido
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Acceso Exitoso",
                    text: " Bienvenido " + nombres,
                    showConfirmButton: false,
                    timer: 2500,
                });

                //redireccionamiento apartir de tipo de usuario
                if (tipo_usuario_id == 1) {
                    window.location.replace("../administrador/");
                }
            }

            if (response == 0) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Verificar credenciales!",
                });
            }
        },
    });
}
