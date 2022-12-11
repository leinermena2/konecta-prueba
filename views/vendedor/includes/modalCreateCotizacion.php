<div class="modal fade" id="createCotizacionModal" tabindex="-1" aria-labelledby="createCotizacionModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createCotizacionModalLabel">Crear Cotrzacion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div id="ContainerInfoCot">
                    <div id="infoCot" class="informacionGeneralCogt">
                        <div>
                            <label for="">Escribir el nombre del cliente:</label>
                            <input type="text" id="nombreCliente" class="form-control rounded-pill">
                        </div>
                        <br>
                        <button class="btn btn-primary rounded-pill" onclick="generateNewForm()"> Agregar un producto</button>
                        <div id="formProducts"></div>
                        <div id="detallesCotizacion">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Rerencia</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Total</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>    
                        <tbody id="tbodyCreateCot"></tbody>
                    </table>    
                    </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal"
                    id="btnCloseModalCreateCot">Cerrar</button>
                <button type="button" class="btn btn-danger rounded-pill">Guardar</button>
            </div>
        </div>
    </div>
</div>
