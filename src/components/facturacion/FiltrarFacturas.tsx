import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaFileUpload,
  FaFileAlt,
} from "react-icons/fa";
import {useState, useEffect, useCallback} from 'react';
import { DataTableResponse } from "../../types/table";
import functions from "../../data/request";
function FilterFacturas() {
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
      <div className="container">¿
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
