let counter = 0;

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
        "<button class='btn btn-success rounded-pill'><i class='fa-solid fa-plus'></i></button>" +
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
                    document.getElementById("itemPCID").innerHTML += "<option value='" + element['id_producto'] + "'>" + element['referencia'] + "</option>";
                    $("#priceUnitario").val(element['precio']);
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

    setTimeout(showProduct, 500);
}

function addProduct() {

    let PorductID = $("# option:selected").val();
    let ProductoName = $("# option:selected").text();
    let cantidad = $("#cantidad").val();
    let precioUnitario = $("#priceUnitario").val();
    let precioTotal = $("#priceTotal").val(); //total items
    let cliente = $("#cliente").val();

    let estado = 1;




}

function removeProduct() {

}