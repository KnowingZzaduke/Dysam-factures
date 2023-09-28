import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import { useState, useEffect, useCallback, useContext, useMemo } from "react";
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";
import { FaTriangleExclamation } from "react-icons/fa6";
import { DataContext } from "../../context/DataContext";
import PaginationTable from "../utilities/Pagination";

function FilterFacturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [notResults, setNotResults] = useState(false);
  const [notItems, setNotItems] = useState(false);
  const { page } = useContext(DataContext);
  const rowsPrePage = 10;
  const items = useMemo(() => {
    const start = (page - 1) * rowsPrePage;
    const end = start + rowsPrePage;
    return insertData?.slice(start, end);
  }, [page, insertData]);

  useEffect(() => {
    if (items?.length === 0) {
      setNotItems(true);
      setTimeout(() => {
        setNotItems(false);
      }, 4000);
    }
  }, [items]);

  const loadReports = useCallback(async () => {
    try {
      const response: DataTableResponse | any = await functions.loadingreport();
      if (
        response?.data.salida === "exito" &&
        response?.data.data ===
          "No se encontraron registros en la tabla archivos"
      ) {
        setNotResults(true);
        setTimeout(() => {
          setNotResults(false);
        }, 3000);
      } else if (
        response?.data.salida === "exito" &&
        response?.data.data !==
          "No se encontraron registros en la tabla archivos"
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
      className="d-flex align-items-center justify-content-center my-5"
      style={{ minHeight: "100vh" }}
    >
      <div className="container" style={{ backgroundColor: "#EAEDED" }}>
        <div className="my-5">
          <h1 className="my-4">
            Tabla de facturas <FaFileAlt />
          </h1>
          <div className="table-responsive">
            <table className="table table-light table-striped">
              <thead>
                <tr className="table-dark text-center">
                  <th>Estado</th>
                  <th>Nombre del contador/a</th>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Facturas</th>
                </tr>
              </thead>
              <tbody>
                {items?.map((data: any) => (
                  <tr
                    className="table-secondary text-center"
                    key={data.id_files}
                  >
                    <td>{data.status_file}</td>
                    <td>{data.user_name}</td>
                    <td>{data.date}</td>
                    <td>{data.time}</td>
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
            <PaginationTable />
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
            {notItems === true ? (
              <div
                className="alert alert-danger d-flex align-items-center gap-2 my-3"
                role="alert"
              >
                <FaTriangleExclamation />
                <div className="text-center">No se encontraron facturas</div>
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
