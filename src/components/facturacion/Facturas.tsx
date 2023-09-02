import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import ModalEnviarFactura from "../modals/ModalEnviarFactura";
import ModalCorregirFactura from "../modals/ModalCorregirFactura";
import { useEffect, useState } from "react";
import { TypeFormFile } from "../../types/file";
import functions from "../../data/request";
import { useLocation } from "react-router-dom";
import $ from "jquery";
function Facturas() {
  const [insertData, setInsertData] = useState<any>();
  const location = useLocation();
  async function loadReports() {
    try {
      const response = await functions.loadingreport();
      if (response) {
        console.log(response);
        setInsertData(response.data.data);
      } else {
        console.log("Error");
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
              {insertData?.map((data: any) => (
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
                    />
                  </td>
                </tr>
              ))}
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
