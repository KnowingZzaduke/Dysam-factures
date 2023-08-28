import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import ModalEnviarFactura from "../modals/ModalEnviarFactura";
import ModalCorregirFactura from "../modals/ModalCorregirFactura";
function Facturas() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <h1 className="my-4">
          Tabla de facturas <FaFileAlt />
        </h1>
        <div className="table-responsive">
          <table className="table table-light">
            <thead>
              <tr className="table-light text-center">
                <th>Estado</th>
                <th>Fecha</th>
                <th>Facturas</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="table-secondary text-center">
                <td>Por revisar</td>
                <td>Hoy</td>
                <td>
                  <FaFileUpload className="fs-4 option" title="Ver factura"/>
                </td>
                <td>
                  <FaCheckCircle
                    className="fs-4 option mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalSendFactures"
                    title="Enviar factura"
                  />
                  <FaExclamationTriangle
                    className="fs-4 option mx-1"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCorrectFactures"
                    title="Corregir factura"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <ModalEnviarFactura />
        <ModalCorregirFactura />
      </div>
    </div>
  );
}

export default Facturas;
