import { FaUpload, FaFileUpload, FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useCallback, useEffect } from "react";
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";

function CorregirFacturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [selectedItems, setSelectedItems] = useState<DataTableResponse | any>();

  const loadReports = useCallback(async () => {
    try {
      const response = await functions.loadingreport();
      if (response) {
        const originalData = response;
        const filterData = originalData?.data?.data?.filter(
          (data: any) => data.status_file === "Corregir"
        );
        console.log(filterData.commentF);
        if (filterData.length === 0) {
          console.log("No hay resultados en la tabla");
        } else {
          setInsertData(filterData);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

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
                <th>Herramientas</th>
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
                    <p>{data.commentf}</p>
                  </td>
                  <td>
                    <FaUpload
                      className="fs-4 option mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSendFactures"
                      title="Reenviar factura"
                    />
                    <FaTrashAlt
                      className="fs-4 option mx-1"
                      data-bs-toggle="modal"
                      data-bs-target="#modalCorrectFactures"
                      title="Borrar Factura"
                      onClick={() => setSelectedItems(data)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CorregirFacturas;
