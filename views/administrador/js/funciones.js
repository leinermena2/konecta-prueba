

let userId;
let userName;
$(document).ready(function () {

    // get user information 

    let userData = localStorage.getItem('usuario');

    userId = userData[0];
    userName = userData[2];


    $("#productos").css("display", "block");
    $("#categorias").css("display", "none");
    $("#reportes").css("display", "none");

    //muestreo por click
    $("#tabProductos").click(function () {
        $("#tabProductos").addClass("active");
        $("#tabCategorias").removeClass("active");
        $("#tabReportes").removeClass("active");

        $("#productos").css('display', 'block');
        $("#categorias").css('display', 'none');
        $("#reportes").css('display', 'none');
    });
    $("#tabCategorias").click(function () {
        $("#tabCategorias").addClass("active");
        $("#tabProductos").removeClass("active");
        $("#tabReportes").removeClass("active");

        $("#categorias").css('display', 'block');
        $("#productos").css('display', 'none');
        $("#reportes").css('display', 'none');
    });
    $("#tabReportes").click(function () {
        $("#tabReportes").addClass("active");
        $("#tabProductos").removeClass("active");
        $("#tabCategorias").removeClass("active");

        $("#reportes").css('display', 'block');
        $("#productos").css('display', 'none');
        $("#categorias").css('display', 'none');
    });

    $("#tabProductos").trigger("click");    
});



function createCategoria() {
    let nombre = $("#nombreCategoria").val();
    let descripcion = $("#descripcionCategoria").val();

    if (nombre == "" || nombre == null) {
        Swal.fire('Upss', 'El campo nombre es obligatorio', 'info');
        return
    }

    if (descripcion == "" || descripcion == null) {
        Swal.fire('Upss', 'El campo descripcion es obligatorio', 'info');
        return
    }

    let CatInfo = [nombre, descripcion]
    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion va a crear una nueva categoria en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasCategorias.php",
                data: {
                    tipo: 2,
                    datos: CatInfo
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito', 'Categoria creada exitosamente', 'success');
                        $("#btnCloseModalCC").trigger("click");
                        getCategorias();
                    }
                }
            });

        }
    })
}


function editCategoria() {
    let nombre = $("#nombreCategoriaEdit").val();
    let descripcion = $("#descripcionCategoriaEdit").val();
    let idCategoria = $("#idCategoria").val();
    if (nombre == "" || nombre == null) {
        Swal.fire('Upss', 'El campo nombre es obligatorio', 'info');
        return
    }

    if (descripcion == "" || descripcion == null) {
        Swal.fire('Upss', 'El campo descripcion es obligatorio', 'info');
        return
    }

    let CatInfo = [nombre, descripcion, idCategoria]

    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion edita los datos de la categoria en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasCategorias.php",
                data:
                {
                    tipo: 3,
                    datos: CatInfo
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito!!', 'La categoria se actualizo correctamente', 'success');
                        $("#btnCloseModalEditCC").trigger("click");
                        getCategorias()

                    } else {
                        Swal.fire('Upss', 'Ocurrio un error al actualizar la categoria', 'error');
                    }
                }
            });

        }
    })
}

function getCategorias() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasCategorias.php",
        data: {
            tipo: 1

        }, success: function (response) {
            let dataCategoria = JSON.parse(response);
            document.getElementById('contenedorCategorias').innerHTML = '';
            dataCategoria.forEach(element => {
                let catComponente = "<ul>" +
                    "<li class='form-control listaCategorias rounded border-secondary mt-1'><strong>" + element['nombre'].toUpperCase() + "</strong><p>" + element['descripcion'] + "</p> <button class='btn btn-primary btnEditC' idCat='" + element['id'] + "' data-bs-toggle='modal' data-bs-target='#editarCategoriaModal'><i class='fa-regular fa-pen-to-square'></i> Editar</button></li>" +
                    "</ul>";
                $("#contenedorCategorias").append(catComponente);
            });

            $(".btnEditC").click(function () {
                let idCat = $(this).attr("idCat");
                $.ajax({
                    type: "POST",
                    url: "ajax/consultasCategorias.php",
                    data: {
                        tipo: 4,
                        id: parseInt(idCat)
                    },
                    success: function (response) {
                        let infoTipoList = JSON.parse(response);

                        document.getElementById('nombreCategoriaEdit').innerHTML = "";
                        document.getElementById('descripcionCategoriaEdit').innerHTML = "";
                        document.getElementById('idCategoria').innerHTML = "";
                        $("#nombreCategoriaEdit").val(infoTipoList[0]['nombre'])
                        $("#descripcionCategoriaEdit").val(infoTipoList[0]['descripcion'])
                        $("#idCategoria").val(infoTipoList[0]['id'])
                    }

                })
            });
        }
    });

}

$("#SearchCategorias").on("keyup", function () {

    var patron = $(this).val().toUpperCase();
    if (patron == "") {
        $(".listaCategorias").css("display", "list-item");
    } else {
        $(".listaCategorias").each(function () {

            if ($(this).text().indexOf(patron) < 0) {
                $(this).css("display", "none");
            } else {
                $(this).css("display", "list-item");
            }

        });
    }

});

//funiones productos 

function getProductos() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasProductos.php",
        data: {
            tipo: 1

        }, success: function (response) {
            let datosUsers = JSON.parse(response);
            document.getElementById('tbodyItems').innerHTML = '';
            datosUsers.forEach(element => {
                let tableBody = "<tr>" +
                    "<td>" + element['referencia'] + "</td>" +
                    "<td>" + element['nombre_categoria'] + "</td>" +
                    "<td>" + element['nombre_bodega'] + "</td>" +
                    "<td>" + element['stock'] + "</td>" +
                    "<td>" + element['precio'] + "</td>" +
                    "<td>" + element['peso'] + "</td>" +
                    "<td><button class='button is-danger is-small btnEditP'  data-bs-toggle='modal' data-bs-target='#editProductoModal' idProd='" + element['id_producto'] + "'><i class='fa-solid fa-memo-circle-info'></i> Editar</button></td>" +
                    "<td><button class='button is-warning is-small btnMHP'  data-bs-toggle='modal' data-bs-target='#modalHistorialproductos' idProd='" + element['id_producto'] + "'><i class='fa-solid fa-folder-tree'></i> Historial</button></td>" +
                    "</tr>";
                $("#tbodyItems").append(tableBody);
                $('#tableItems').DataTable();
         
            });


            $(".btnEditP").click(function () {
                let idProd = $(this).attr("idProd");
                $.ajax({
                    type: "POST",
                    url: "ajax/consultasProductos.php",
                    data: {
                        tipo: 2,
                        id: parseInt(idProd)
                    },
                    success: function (response) {
                        let infoPorductoEdit = JSON.parse(response);
                        let buttonAccion 
                        document.getElementById('referenciaEdit').innerHTML = "";
                        document.getElementById('precioEdit').innerHTML = "";
                        document.getElementById('pesoEdit').innerHTML = "";
                        document.getElementById('stockEdit').innerHTML = "";
                        document.getElementById('idEdit').innerHTML = "";
                        document.getElementById('AccionMuestreo').innerHTML = "";
                        $("#referenciaEdit").val(infoPorductoEdit[0]['referencia'])
                        $("#precioEdit").val(infoPorductoEdit[0]['precio'])
                        $("#pesoEdit").val(infoPorductoEdit[0]['peso'])
                        $("#stockEdit").val(infoPorductoEdit[0]['stock'])
                        $("#idEdit").val(infoPorductoEdit[0]['id_producto'])
                        if(infoPorductoEdit[0]['estado'] == 1){
                             buttonAccion = "<button type='button' onclick='inhabilitarItem()' class='btn btn-warning rounded-pill'>Inhabilitar</button>"
                        }else{
                             buttonAccion = "<button type='button' onclick='habilitarProducto()' class='btn btn-info rounded-pill'>Habilitar</button>"
                        }
                        $("#AccionMuestreo").append(buttonAccion);
                        loadBodegaEdit()

                    }

                })
            });
            $(".btnMHP").click(function () {
                let idProd = $(this).attr("idProd");
                $.ajax({
                    type: "POST",
                    url: "ajax/consultasProductos.php",
                    data: {
                        tipo: 9,
                        id: parseInt(idProd)
                    },
                    success: function (response) {
                        let infoHistorico = JSON.parse(response);

                        document.getElementById('containerHistorial').innerHTML = "";

                        infoHistorico.forEach(element => {
                            let historicoComponente = "<ul>" +
                                "<li class='form-control listaCategorias rounded border-secondary mt-1'><strong>" + element['fecha'] + "</strong><p>" + element['informacion'] + "</p></li>" +
                                "</ul>";
                            $("#containerHistorial").append(historicoComponente);
                        });

                    }

                })
            });
        }
    });

}

function crearProductos() {
    let referencia = $("#referencia").val();
    let precio = $("#precio").val();
    let peso = $("#peso").val();
    let stock = $("#stock").val();
    let categoria_id = $("#categoria_id option:selected").val();
    let bodega_id = $("#bodega_id option:selected").val();

    if (referencia == "" || precio == null || peso == null || categoria_id == null || bodega_id == null || stock == null) {
        Swal.fire('Upss', 'Todos los campos son obligatorios', 'info');
        return
    }

    let CatInfo = [referencia, precio, peso, categoria_id, bodega_id, stock, userId, userName]

    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion creara un nuevo item en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasproductos.php",
                data: {
                    tipo: 5,
                    datos: CatInfo
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito', 'Producto creado exitosamente', 'success');
                        $("#btnCloseModalCreateP").trigger("click");
                        getProductos();
                    }
                }
            });

        }
    })
}


function loadBodega() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasProductos.php",
        data: {
            tipo: 4
        },
        success: function (response) {
            document.getElementById("bodega_id").innerHTML = "";

            let r = JSON.parse(response)

            r.forEach(element => {
                document.getElementById("bodega_id").innerHTML += "<option value='" + element['id'] + "'>" + element['nombre'] + "</option>";
            });
        }
    });

    $.ajax({
        type: "POST",
        url: "ajax/consultasProductos.php",
        data: {
            tipo: 3
        },
        success: function (response) {
            document.getElementById("categoria_id").innerHTML = "";
            let r = JSON.parse(response)
            r.forEach(element => {
                document.getElementById("categoria_id").innerHTML += "<option value='" + element['id'] + "'>" + element['nombre'] + "</option>";
            });

        }
    });

}
function loadBodegaEdit() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasProductos.php",
        data: {
            tipo: 4
        },
        success: function (response) {
            document.getElementById("bodega_idEdit").innerHTML = "";

            let r = JSON.parse(response)

            r.forEach(element => {
                document.getElementById("bodega_idEdit").innerHTML += "<option value='" + element['id'] + "'>" + element['nombre'] + "</option>";
            });
        }
    });

    $.ajax({
        type: "POST",
        url: "ajax/consultasProductos.php",
        data: {
            tipo: 3
        },
        success: function (response) {
            document.getElementById("categoria_idEdit").innerHTML = "";
            let r = JSON.parse(response)
            r.forEach(element => {
                document.getElementById("categoria_idEdit").innerHTML += "<option value='" + element['id'] + "'>" + element['nombre'] + "</option>";
            });

        }
    });

}

function updateProducto()
{
    let referencia = $("#referenciaEdit").val();
    let precio = $("#precioEdit").val();
    let peso = $("#pesoEdit").val();
    let stock = $("#stockEdit").val();
    let categoria_id = $("#categoria_idEdit option:selected").val();
    let bodega_id = $("#bodega_idEdit option:selected").val();
    let idProd = $("#idEdit").val();

    if (referencia == "" || precio == null || peso == null || categoria_id == null || bodega_id == null || stock == null) {
        Swal.fire('Upss', 'Todos los campos son obligatorios', 'info');
        return
    }

    let CatInfo = [referencia, precio, peso, categoria_id, bodega_id, stock, userId, userName]

    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion actualiza el producto en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasproductos.php",
                data: {
                    tipo: 6,
                    id:idProd,
                    datos: CatInfo
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito', 'Producto editado exitosamente', 'success');
                        $("#btnCloseModalEditP").trigger("click");
                        getProductos();
                    }
                }
            });

        }
    })
}

function inhabilitarItem(){
    let id = $("#idEdit").val();
    let referencia = $("#referenciaEdit").val();
    let stock = $("#stockEdit").val();
    let precio = $("#precioEdit").val();
 
    
    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion inhabilita la venta del producto en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasproductos.php",
                data: {
                    tipo: 7,
                    id:id,
                    user_name:userName,
                    user_id:userId,
                    referencia:referencia,
                    stock: stock,
                    precio:precio,
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito', 'Producto inhabilitado exitosamente', 'success');
                        $("#btnCloseModalEditP").trigger("click");
                        getProductos();
                    }
                }
            });

        }
    })
}

function habilitarProducto(){
    let id = $("#idEdit").val();
    let referencia = $("#referenciaEdit").val();
    let stock = $("#stockEdit").val();
    let precio = $("#precioEdit").val();
    Swal.fire({
        title: 'Estas seguro?',
        text: "Recuerda que esta accion habilita la venta del producto en el sistema!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasproductos.php",
                data: {
                    tipo: 8,
                    id:id,
                    user_name:userName,
                    user_id:userId,
                    referencia:referencia,
                    stock: stock,
                    precio:precio,
                },
                success: function (response) {
                    if (response == 1) {
                        Swal.fire('Exito', 'Producto Habilitado exitosamente', 'success');
                        $("#btnCloseModalEditP").trigger("click");
                        getProductos();
                    }
                }
            });

        }
    })
}