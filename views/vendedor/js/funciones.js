
$(document).ready(function () {

    let userData = localStorage.getItem('usuario');

    userId = userData[0];
    userName = userData[2];


    $.ajax({
        type: "POST",
        url: "ajax/consultasVendedor.php",
        data: {
            tipo: 5
        }, success: function (response) {
            let dataCotizaciones = JSON.parse(response);
            document.getElementById('contenedorcotizaciones').innerHTML = '';
            dataCotizaciones.forEach(element => {
                let cotComponent = "<ul>" +
                    "<li class='form-control listaCotizaciones rounded border-secondary mt-1'><strong>" + element['cliente'].toUpperCase() + "</strong><p>" + element['fecha_creacion'] + "</p> <button class='btn btn-primary btnCot' idCat='" + element['id_cotizacion'] + "' data-bs-toggle='modal' data-bs-target='#editarCategoriaModal'><i class='fa-regular fa-pen-to-square'></i> Editar</button></li>" +
                    "</ul>";
                $("#contenedorcotizaciones").append(cotComponent);
            });
        }

    });
});
let counter = 0;
let userId;
let userName
function getListaCotizaciones() {

}

function createCotizacion() {

}

function generateNewForm() {
    counter++;
    if (counter > 1) {
        return;
    }

    let formProduct = "<table class='table mt-2' id='tableAdd'>" +
        "<tr>" +
        "<td>" +
        "<select class='itemPCID form-control rounded-pill' id='itemPCID'>" +
        "<option>Agregar un producto</option>" +
        "</select>" +
        "</td>" +
        "<td>" +
        "<input class='form-control rounded-pill ' id='cantidad' placeholder='cantidad'>" +
        "</td>" +
        "<td>" +
        "<input class='form-control rounded-pill ' readonly id='priceUnitario'>" +
        "</td>" +
        "<td>" +
        "<input class='form-control rounded-pill ' readonly id='priceTotal'>" +
        "</td>" +
        "<td>" +
        "<input class='form-control rounded-pill ' readonly id='stockActual'>" +
        "</td>" +
        "<td>" +
        "<button class='btn btn-success rounded-pill addItemCot' ><i class='fa-solid fa-plus'></i></button>" +
        "</td>" +
        "</tr>" +
        "</table>";

    $("#formProducts").append(formProduct);

    function showProduct() {
        $.ajax({
            type: "POST",
            url: "ajax/consultasVendedor.php",
            data: {
                tipo: 1

            },
            success: function (response) {
                document.getElementById("itemPCID").innerHTML = "";

                let r = JSON.parse(response)

                r.forEach(element => {
                    document.getElementById("itemPCID").innerHTML += "<option class='optionss' idChange='" + element['id_producto'] + "' value='" + element['id_producto'] + "'>" + element['referencia'] + "</option>";
                    $("#priceUnitario").val(element['precio']);
                    $("#stockActual").val(element['stock']);
                });
            }
        });
    }


    $("#cantidad").keyup(function () {
        let precioU = $("#priceUnitario").val();
        let cantidad = $(this).val();

        let Total = precioU * cantidad;
        $("#priceTotal").val(Total);
    });

    $(".addItemCot").click(function () {
        let productoId = $("#itemPCID option:selected").val();
        let ProductoName = $("#itemPCID option:selected").text();
        let cantidad = $("#cantidad").val();
        let precioUnitario = $("#priceUnitario").val();
        let precioTotal = $("#priceTotal").val(); //total items
        let cliente = $("#nombreCliente").val();
        let stockA = $("#stockActual").val();

        if (stockA < cantidad) {
            Swal.fire('UPSS', 'No puedes vender mas que el stock disponible', 'error');

            return;
        }

        if (cantidad == "" || cantidad == null || cliente == null || cliente == "") {
            Swal.fire('Upss', 'El nombre del cliente y la cantidad del item son obligatorios', 'info')
            console.log(cantidad, cliente);
            return;
        }

        let estado = 1;
        let item = [];
        let arr1 = [productoId,
            ProductoName,
            cantidad,
            precioUnitario,
            precioTotal,
            cliente,
            estado];
        item.push(
            arr1
        );

        let datosCot = [userId, cliente, 0, 0, 0];
        let datosProdCot = [productoId, cantidad, precioUnitario, precioTotal]

        $.ajax({
            type: "POST",
            url: "ajax/consultasVendedor.php",
            data: {
                tipo: 3,
                datosCot: datosCot,
                datosProd: datosProdCot

            },
            success: function (response) {
                if (response != 0 && response != 2) {
                    Swal.fire('Agregado', 'Producto agregado correctamente', 'success');
                    document.getElementById("formProducts").innerHTML = "";
                    let datosCotizacion = JSON.parse(response);
                    document.getElementById('tbodyCreateCot').innerHTML = '';
                    datosCotizacion.forEach(element => {
                        let tableBody = "<tr>" +
                            "<td>" + element['item_id'] + "</td>" +
                            "<td>" + element['referencia'] + "</td>" +
                            "<td>" + element['cantidad'] + "</td>" +
                            "<td>" + element['unitarioItem'] + "</td>" +
                            "<td>" + element['totalItem'] + "</td>" +
                            "<td><button class='button is-danger is-small'> Eliminar</button></td>" +
                            "</tr>";
                        $("#tbodyCreateCot").append(tableBody);
                        // $('#tableItems').DataTable();

                    });

                } else {
                    Swal.fire(' Upss', 'ALGO SALIO MAL', 'error');
                }

            }
        });



        // localStorage.setItem("infoDetalleCot", item);
        // document.getElementById("formProducts").innerHTML = "";
        // let ItemStorage = localStorage.getItem("infoDetalleCot");
        // if (ItemStorage != null || ItemStorage.length != 0) {
        //     $("#nombreCliente").attr('readonly', true)

        // let TbodyElements = "<tr>"+
        // "<td>"+ItemStorage[0]+"</td>"+
        // "<td>"+ItemStorage[0]+"</td>"+
        // "<td>"+ItemStorage[0]+"</td>"+
        // "<td>"+ItemStorage[0]+"</td>"+
        // "<td>"+ItemStorage[0]+"</td>"+
        // "</tr>";

        // $("#tbodyCreateCot").append(TbodyElements);

        counter = 0;
    });

    $("#itemPCID").change(function () {
        let idOK = $(".optionss").attr('idChange')
        $.ajax({
            type: "POST",
            url: "ajax/consultasVendedor.php",
            data: {
                tipo: 2,
                id: idOK,
            },
            success: function (response) {
                let r = JSON.parse(response)
                r.forEach(elementos => {
                    $("#priceUnitario").val(elementos['precio']);
                    $("#stockActual").val(elementos['stock']);
                });
            }
        });
    });

    setTimeout(showProduct, 200);
}



function removeProduct() {

}

function getCotizaciones() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasVendedor.php",
        data: {
            tipo: 5
        }, success: function (response) {
            let dataCotizaciones = JSON.parse(response);
            document.getElementById('contenedorcotizaciones').innerHTML = '';
            dataCotizaciones.forEach(element => {
                let cotComponent = "<ul>" +
                    "<li class='form-control listaCotizaciones rounded border-secondary mt-1'><strong>" + element['cliente'].toUpperCase() + "</strong><p>" + element['fecha_creacion'] + "</p> <button class='btn btn-primary btnCot' idCat='" + element['id_cotizacion'] + "' data-bs-toggle='modal' data-bs-target='#editarCategoriaModal'><i class='fa-regular fa-pen-to-square'></i> Editar</button></li>" +
                    "</ul>";
                $("#contenedorcotizaciones").append(cotComponent);
            });
        }

    });
}


function getElemento() {
    $.ajax({
        type: "POST",
        url: "ajax/consultasVendedor.php",
        data: {
            tipo: 6,
            user_id: userId
        },
        success: function (response) {
            if (response != 0) {
                Swal.fire('Cuidado', 'Ya tienes una cotizacion abierta', 'info');

                let datosCotizacion = JSON.parse(response);
                document.getElementById('tbodyCreateCot').innerHTML = '';
                let clientName = "";
                datosCotizacion.forEach(element => {
                    clientName = element['cliente'];
                    let tableBody = "<tr>" +
                        "<td>" + element['item_id'] + "</td>" +
                        "<td>" + element['referencia'] + "</td>" +
                        "<td>" + element['cantidad'] + "</td>" +
                        "<td>" + element['unitarioItem'] + "</td>" +
                        "<td>" + element['totalItem'] + "</td>" +
                        "<td><button class='button is-danger is-small'> Eliminar</button></td>" +
                        "</tr>";
                    $("#tbodyCreateCot").append(tableBody);
                    // $('#tableItems').DataTable();

                });
                $("#nombreCliente").val(clientName)
            } else {

            }

        }
    });
}

function CreateCot() {
    Swal.fire({
        title: 'Estas seguro?',
        text: "Confirmar esta accion guarda la cotizacion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardar!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                type: "POST",
                url: "ajax/consultasVendedor.php",
                data: {
                    tipo: 4,
                    userID: userId,
                },
                success: function (response) {
                    console.log(response);

                    if (response != 0) {
                        $("#btnCloseModalCreateCot").trigger("click");

                        getCotizaciones()
                    }

                }
            });
        }
    })


}