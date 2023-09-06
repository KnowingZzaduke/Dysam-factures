import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";
import { FaTriangleExclamation } from "react-icons/fa6";

function FilterFacturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [notResults, setNotResults] = useState(false);

  const loadReports = useCallback(async () => {
    try {
      const response: DataTableResponse | any = await functions.loadingreport();
      if (
        response?.data.salida === "exito" &&
        response?.data.data === "No se encontraron registros en la tabla archivos"
      ) {
        setNotResults(true);
        setTimeout(() => {
          setNotResults(false);
        }, 3000);
      } else if (
        response?.data.salida === "exito" &&
        response?.data.data !== "No se encontraron registros en la tabla archivos"
      ) {
        const originalData = response;
        const filterData = originalData?.data?.data?.filter(
          (data: any) => data.status_file === "Verificado"
        );
        if (filterData.length === 0) {
          setNotResults(true);
          setTimeout(() => {
            setNotResults(false);
          }, 3000);
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
        <div className="my-5">
          <h1 className="my-4">
            Tabla de facturas <FaFileAlt />
          </h1>
          <div className="table-responsive">
            <table className="table table-light">
              <thead>
                <tr className="table-light text-center">
                  <th>Estado</th>
                  <th>Nombre del contador/a</th>
                  <th>Fecha & hora</th>
                  <th>Facturas</th>
                </tr>
              </thead>
              <tbody>
                {insertData?.map((data: any) => (
                  <tr className="table-secondary text-center" key={data.id_files}>
                    <td>{data.status_file}</td>
                    <td>{data.user_name}</td>
                    <td>{data.date}</td>
                    <td>
                      <a href={data.file_path} target="_blank">
                        <FaFileUpload
                          className="fs-4 option"
                          title="Ver factura"
                        />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {notResults === true ? (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 my-3"
                role="alert"
              >
                <FaTriangleExclamation />
                <div className="text-center">No hay facturas verificadas</div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterFacturas;
