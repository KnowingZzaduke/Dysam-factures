function ModalCorregirFactura() {
  return (
    <div
      className="modal fade"
      id="modalCorrectFactures"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Corregir factura</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="recipient-name" className="col-form-label">
                  Nombre del contador
                </label>
                <select className="form-select" defaultValue="0">
                  <option value="0">Leo Luna</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message-text" className="col-form-label">
                  Mensaje
                </label>
                <textarea className="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button type="button" className="btn btn-primary">
              Regresar factura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalCorregirFactura;
