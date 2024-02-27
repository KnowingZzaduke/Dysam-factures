import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { Button, Spinner } from "@nextui-org/react";
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
  let infoSixthCells: number[][] = [];

  function calcularValoresFinales() {
    setLoader(false);
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
  }

  useEffect(() => {
    if (params) {
      const arrayParams = Object.values(params);
      infoSixthCells.push(arrayParams);
      console.log(infoSixthCells.length);

      // Actualiza la tabla manualmente
      if (hotComponentRef.current) {
        hotComponentRef.current.hotInstance.loadData(infoSixthCells);
      }
    }
  }, [params]);

  function handleSubmitParams() {
    console.log(infoSixthCells);
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
          <h2>Por favor, presiona cargar valores</h2>
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
            onClick={calcularValoresFinales}
          >
            <FaFileArrowUp />
            <p>Guardar</p>
          </Button>
        </div>
      )}
      {loader === true ? (
        <Button
          className="w-1/2 mx-auto mt-2"
          color="success"
          onClick={calcularValoresFinales}
        >
          Cargar valores
        </Button>
      ) : null}
    </div>
  );
}

export default SextaTablaContabilidad;
