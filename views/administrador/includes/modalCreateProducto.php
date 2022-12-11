<div class="modal fade" id="crearProductoModal" tabindex="-1" aria-labelledby="crearProductoModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="crearProductoModalLabel">Crear Productos</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <input type="text" name="referencia" id="referencia" placeholder="Escribe una referencia unica" class="mt-2 form-control rounded-pill">
        <input type="number" name="precio" id="precio" class="form-control rounded-pill mt-2" placeholder="Precio">
        <input type="number" name="peso" id="peso" class="form-control rounded-pill mt-2" placeholder="Peso">
        <input type="number" name="stock" id="stock" class="form-control rounded-pill mt-2" placeholder="Stock">
        <label for="">Seleccionar una categoria:</label>
        <select name="categoria_id" id="categoria_id" class="form-control rounded-pill mt-2"></select>
        <label for="">Seleccionar una bodega:</label>
        <select name="bodega_id" id="bodega_id" class="form-control rounded-pill mt-2"></select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal" id="btnCloseModalCreateP">Cerrar</button>
        <button type="button" class="btn btn-danger rounded-pill" onclick="crearProductos()">Guardar</button> 
      </div>
    </div>
  </div>
</div>