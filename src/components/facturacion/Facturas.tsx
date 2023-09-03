import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";
function Facturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [selectedItems, setSelectedItems] = useState<DataTableResponse | any>();
  async function loadReports() {
    try {
      const response = await functions.loadingreport();
      if (response) {
        setInsertData(response);
      }
    } catch (error) {
      console.log("Error");
    }
  }

  useEffect(() => {
    loadReports();
  }, []);
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
              {insertData?.data.data.map((data: any) => (
                <tr className="table-secondary text-center" key={data.id_files}>
                  <td>{data.status_file}</td>
                  <td>{data.date}</td>
                  <td>
                    <a href={data.file_path} target="_blank">
                      <FaFileUpload
                        className="fs-4 option"
                        title="Ver factura"
                      />
                    </a>
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
                      onClick={() => setSelectedItems(data)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* //Modal corregir */}
        <div
          className="modal"
          id="modalCorrectFactures"
          aria-labelledby="exampleModalLabel"
          tabIndex="-1"
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
                      {selectedItems && (
                        <option value={selectedItems.id_files}>
                          {selectedItems.user_name}
                        </option>
                      )}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                    ></textarea>
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
        {/* //Modal enviar */}
        <div
          className="modal fade"
          id="modalSendFactures"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enviar factura</h5>
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
                      Seleccionar facturador
                    </label>
                    <select className="form-select" defaultValue="0">
                      <option value="0">Selecciona un facturador</option>
                      <option value="1">Leo Luna</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message-text" className="col-form-label">
                      Mensaje
                    </label>
                    <textarea
                      className="form-control"
                      id="message-text"
                    ></textarea>
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
                  Enviar factura
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Facturas;
