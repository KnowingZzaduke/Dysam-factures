import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoSecondCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";
function SegundaTablaContabilidad() {
  function handleSubmitParams() {
    console.log(infoSecondCells);
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start w-full">
      <HotTable
        language={esMX.languageCode}
        licenseKey="non-commercial-and-evaluation"
        data={infoSecondCells}
        colHeaders={[
          "DETALLE DE M.O.D.",
          "BASICO HORA",
          "HOR-EST",
          "TOTAL TIEMPO/ HORAS",
          "VR DIA ",
          "DIA ESTIMADOS",
          "TOTAL DIAS",
          "MANO DE OBRA DIRECTA",
        ]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        className="-z-0"
      >
        <HotColumn />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn readOnly className="bg-gray-300" />
      </HotTable>
      <Button onClick={handleSubmitParams}>Enviar</Button>
    </div>
  );
}

export default SegundaTablaContabilidad;
