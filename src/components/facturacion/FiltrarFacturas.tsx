import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
function FilterFacturas() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className=" border border-dark p-2 rounded mb-4">
          <div className="d-flex flex-column flex-md-row gap-3 w-100 ">
            <div className="d-flex align-items-center">
              <p className="m-0">Filtrar por:</p>
            </div>
            <div className="d-flex justify-content-between justify-content-md-end mt-md-0 mt-2">
              <div>{/* Agrega otros elementos aquí si es necesario */}</div>
              <div className="d-flex gap-2">
                <button
                  className="btn bg-primary text-white btn-outline-primary px-md-4"
                  type="button"
                >
                  Verificados
                </button>
                <button
                  className="btn bg-danger text-white px-md-4"
                  type="button"
                >
                  Corregidos
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h1 className="my-4">
            Tabla de facturas <FaFileAlt />
          </h1>
          <div className="table-responsive">
            <table className="table table-light">
              <thead>
                <tr className="table-light text-center">
                  <th>Estado</th>
                  <th>Fecha & hora</th>
                  <th>Facturas</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-secondary text-center">
                  <td>Por revisar</td>
                  <td>Hoy</td>
                  <td>
                    <FaFileUpload className="fs-4 option" title="Ver factura" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterFacturas;
