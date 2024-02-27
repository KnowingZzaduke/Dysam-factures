import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { Button, Spinner } from "@nextui-org/react";
import functions from "../../../data/request";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect, useRef, useState } from "react";
import { FaFileArrowUp } from "react-icons/fa6";
type Props = {
  valores: Operaciones;
};
import { Params } from "../../../types/params";
import { Operaciones } from "../../../types/operaciones";
function SextaTablaContabilidad({ valores }: Props) {
  const [params, setParams] = useState<Params>();
  const hotComponentRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const infoSixthCells: number[][] = [];

  function calcularValoresFinales() {}

  useEffect(() => {
    setParams((prevData) => ({
      ...prevData,
      totalCostos:
        valores.equipos +
        valores.manoObraDirecta +
        valores.totalOtrosCostos +
        valores.totalTransporte +
        valores.valorTotal,
      administracion:
        prevData?.totalCostos === undefined ? 0 : prevData.totalCostos * 0.05,
      utilidadBrutaEstimada:
        prevData?.totalCostos === undefined ? 0 : prevData.totalCostos * 0.5,
      totalACobrarSinIva:
        prevData?.totalCostos === undefined &&
        prevData?.administracion === undefined &&
        prevData?.utilidadBrutaEstimada === undefined
          ? 0
          : prevData.totalCostos +
            prevData.administracion +
            prevData.utilidadBrutaEstimada,
      totalConIva:
        prevData?.totalACobrarSinIva === undefined
          ? 0
          : prevData?.totalACobrarSinIva * 0.19 + prevData?.totalACobrarSinIva,
    }));
  }, [valores]);

  useEffect(() => {
    console.log(params);
    if (params && params.totalACobrarSinIva !== 0 && params.totalConIva !== 0) {
      const arrayParams = Object.values(params);
      infoSixthCells.push(arrayParams);

      if (hotComponentRef.current) {
        hotComponentRef.current.hotInstance.loadData(infoSixthCells);
        hotComponentRef.current.hotInstance.render();
      }
      setLoader(false);
    } else {
      console.log("Aún no llega la formula");
    }
  }, [params]);

  async function handleSubmitParams() {
    if (params) {
      try {
        const response = await functions.sendfacture(params);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Al parecer hiubo un problema y los datos son indefinidos, contacta con el programador"
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
