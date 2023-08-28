import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";

function CorregirFacturas() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h1 className="my-4">
          Tabla de corregir facturas <FaFileAlt />
        </h1>
        <div className="table-responsive">
          <table className="table table-light border">
            <thead>
              <tr className="table-light text-center">
                <th>Estado</th>
                <th>Fecha</th>
                <th>Facturas</th>
                <th>Observaciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-secondary text-center">
                <td>
                  <span className="h-100" style={{display: "inline-block"}}>Por revisar</span>
                </td>
                <td className="">Hoy</td>
                <td>
                  <FaFileUpload className="fs-4 option" title="Ver factura" />
                </td>
                <td className="col-5">
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quae itaque labore explicabo beatae est sequi ullam
                    perspiciatis. In, veritatis numquam nam minima excepturi
                    mollitia odit alias est consectetur asperiores suscipit!
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CorregirFacturas;
