<div class="modal fade" id="crearCategoriaModal" tabindex="-1" aria-labelledby="crearCategoriaModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="crearCategoriaModalLabel">Crear nueva categoria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="">Escribir el nombre de la categoria:</label>
        <input type="text" class="form-control rounded-pill" id="nombreCategoria">
        <textarea class="form-control mt-2" id="descripcionCategoria" placeholder="Escribir una descripcion"></textarea>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal" id="btnCloseModalCC" >Cerrar</button>
        <button type="button" class="btn btn-danger rounded-pill" onclick="createCategoria()">Guardar</button> 
      </div>
    </div>
  </div>
</div>