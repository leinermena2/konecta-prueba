<div class="modal fade" id="editProductoModal" tabindex="-1" aria-labelledby="editProductoModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editProductoModalLabel">Editar productos</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="">Referencia:</label>
                <input type="text" name="referenciaEdit" id="referenciaEdit" placeholder="Escribe una referencia unica"
                    class="mt-2 form-control rounded-pill">
                <label for="">Precio:</label>
                <input type="number" name="precioEdit" id="precioEdit" class="form-control rounded-pill mt-2"
                    placeholder="Precio">
                <label for="">Peso:</label>
                <input type="number" name="pesoEdit" id="pesoEdit" class="form-control rounded-pill mt-2"
                    placeholder="Peso">
                <label for="">Stock:</label>
                <input type="number" name="stockEdit" id="stockEdit" class="form-control rounded-pill mt-2 ">
                <input type="hidden" name="idEdit" id="idEdit" class="form-control rounded-pill mt-2">
                <label for="">Seleccionar una categoria:</label>
                <select name="categoria_idEdit" id="categoria_idEdit" class="form-control rounded-pill mt-2"></select>
                <label for="">Seleccionar una bodega:</label>
                <select name="bodega_idEdit" id="bodega_idEdit" class="form-control rounded-pill mt-2"></select>
            </div>
            <div class="modal-footer">

                <div id="AccionMuestreo"></div>
                <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal"
                id="btnCloseModalEditP">Cerrar</button>
                <button type="button" class="btn btn-danger rounded-pill" onclick="updateProducto()">Guardar</button>
            </div>
        </div>
    </div>
</div>