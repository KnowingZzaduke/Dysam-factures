import { FaFileUpload, FaFileAlt, FaTrashAlt } from "react-icons/fa";
import { useState, useCallback, useEffect, useContext, useMemo } from "react";
import { DataTableResponse } from "../../types/table";
import { useNavigate } from "react-router-dom";
import functions from "../../data/request";
import { FaTriangleExclamation } from "react-icons/fa6";
import { DataContext } from "../../context/DataContext";
import PaginationTable from "../utilities/Pagination";

function CorregirFacturas() {
  const [insertData, setInsertData] = useState<DataTableResponse | any>();
  const [notResults, setNotResults] = useState(false);
  const navigate = useNavigate();
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
          (data: any) => data.status_file === "Corregir" && data.user_name
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

  async function deleteReports(id: string) {
    try {
      const response = await functions.deletereport(id);
      if (response) {
        navigate("/contabilidad/enviar-facturas");
      }
    } catch (error) {}
  }
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
                    <FaTrashAlt
                      className="fs-4 option mx-1"
                      title="Borrar Factura"
                      onClick={() => deleteReports(data.id_files)}
                    />
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
              <div className="text-center">No hay facturas por corregir</div>
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
  );
}

export default CorregirFacturas;
