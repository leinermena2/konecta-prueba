<div class="modal fade" id="editarCategoriaModal" tabindex="-1" aria-labelledby="editarCategoriaModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="editarCategoriaModalLabel">Editar categoria</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <label for="">Cambiar nombre de la categoria:</label>
        <input type="text" class="form-control rounded-pill" id="nombreCategoriaEdit">
        <textarea class="form-control mt-2" id="descripcionCategoriaEdit" placeholder="Escribir una descripcion"></textarea>
        <input type="hidden" class="form-control rounded-pill" id="idCategoria">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary rounded-pill" data-bs-dismiss="modal" id="btnCloseModalEditCC" >Cerrar</button>
        <button type="button" class="btn btn-danger rounded-pill" onclick="editCategoria()">Guardar</button> 
      </div>
    </div>
  </div>
</div>