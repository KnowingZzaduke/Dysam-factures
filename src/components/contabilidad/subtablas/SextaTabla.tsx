import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { Button, Spinner } from "@nextui-org/react";
import functions from "../../../data/request";
registerAllModules();
registerLanguageDictionary(esMX);
import React, { useEffect, useRef, useState } from "react";
import { FaFileArrowUp } from "react-icons/fa6";
type Props = {
  valores: Operaciones;
  setShowModalSendValues: React.Dispatch<React.SetStateAction<boolean>>;
};
import { Params } from "../../../types/params";
import { Operaciones } from "../../../types/operaciones";
function SextaTablaContabilidad({ valores, setShowModalSendValues }: Props) {
  const [params, setParams] = useState<Params>();
  const hotComponentRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const infoSixthCells: number[][] = [];

  useEffect(() => {
    setParams((prevData) => {
      // Calcula el total de costos
      const totalCostos =
        valores.equipos +
        valores.manoObraDirecta +
        valores.totalOtrosCostos +
        valores.totalTransporte +
        valores.valorTotal;

      // Calcula la administración como el 5% del total de costos y lo redondea
      const administracion = totalCostos * 0.05;

      // Calcula la utilidad bruta estimada como el 50% del total de costos y lo redondea
      const utilidadBrutaEstimada = totalCostos * 0.5;

      // Calcula el total a cobrar sin IVA sumando los costos, la administración y la utilidad bruta estimada y lo redondea
      const totalACobrarSinIva =
        parseFloat(totalCostos) +
        parseFloat(administracion) +
        parseFloat(utilidadBrutaEstimada);

      // Calcula el total a cobrar con IVA agregando el 19% de IVA al total a cobrar sin IVA y lo redondea
      const totalConIva = parseFloat(totalACobrarSinIva) * 1.19;

      // Formatea los valores para agregar puntos como separadores de miles
      const formatNumber = (value) => {
        return parseFloat(value).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
        });
      };

      return {
        ...prevData,
        totalCostos: totalCostos,
        administracion: administracion,
        utilidadBrutaEstimada: utilidadBrutaEstimada,
        totalACobrarSinIva: totalACobrarSinIva,
        totalConIva: totalConIva,
        fecha: valores.fecha,
        nit: valores.nit,
        descripcion: valores.descripcion,
      };
    });
  }, [valores]);

  useEffect(() => {
    if (params) {
      if (params.totalCostos !== 0) {
        setLoader(false);
      }
      const arrayParams = Object.values(params);
      infoSixthCells.push(arrayParams);
      if (hotComponentRef.current) {
        hotComponentRef.current.hotInstance.loadData(infoSixthCells);
        hotComponentRef.current.hotInstance.render();
      }
    } else {
      console.log("Aún no llega la formula");
    }
  }, [params]);

  async function handleSubmitParams() {
    if (params) {
      console.log(params);
      try {
        const response = await functions.sendfacture(params);
        if (response?.data?.salida === "exito") {
          setShowModalSendValues(true);
          setLoader(true);
          setTimeout(() => {
            location.reload();
          }, 3000)
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Al parecer hubo un problema y los datos son indefinidos, contacta con el programador"
      );
    }
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start flex-col w-full">
      {loader === true ? (
        <div className="flex flex-col items-center gap-4 mt-8">
          <h2>Esperando datos válidos para ejecutar las fórmulas</h2>
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="flex justify-start flex-col w-full">
          <HotTable
            language={esMX.languageCode}
            ref={hotComponentRef}
            licenseKey="non-commercial-and-evaluation"
            data={infoSixthCells}
            colHeaders={[
              "TOTAL COSTOS",
              "ADMINISTACIÓN",
              "UTILIDAD BRUTA ESTIMADA",
              "TOTAL A COBRAR SIN IVA",
              "TOTAL CON IVA",
            ]}
            rowHeaders={true}
            columnSorting={true}
            contextMenu={["row_above", "row_below"]}
            autoWrapCol={true}
            autoWrapRow={true}
            mergeCells={false}
            dragToScroll={true}
            width="100%"
            formulas={{
              engine: hyperformulaInstance,
              sheetName: "Sheet1",
            }}
            className="-z-0 custom-table"
          >
            <HotColumn type="numeric" />
            <HotColumn type="numeric" />
            <HotColumn type="numeric" />
            <HotColumn type="numeric" />
            <HotColumn readOnly className="bg-gray-300" type="numeric" />
          </HotTable>
          <Button
            className="w-1/2 mb-6 mt-2 flex justify-center items-center"
            color="warning"
            onClick={handleSubmitParams}
          >
            <FaFileArrowUp />
            <p>Guardar</p>
          </Button>
        </div>
      )}
    </div>
  );
}

export default SextaTablaContabilidad;
