function EnviarFacturas() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <form className="was-validated border border-dark p-5 rounded bg-light">
        <h1>Enviar facturas</h1>
        <div className="my-4">
          <input
            type="text"
            className="form-control"
            value="Nombre de usuario"
            disabled
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            className="form-control"
            aria-label="file example"
            required
          />
          <div className="invalid-feedback">
            Por favor selecciona un archivo válido
          </div>
        </div>

        <div className="mb-3">
          <button className="btn btn-primary" type="submit">
            Enviar factura
          </button>
        </div>
      </form>
    </div>
  );
}

export default EnviarFacturas;
