import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoFourthCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";
function CuartaTablaContabilidad() {
  function handleSubmitParams() {
    console.log(infoFourthCells);
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
        data={infoFourthCells}
        colHeaders={["I", "I", "I", "I", "I", "TOTAL TRANSPORTE"]}
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
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn readOnly className="bg-gray-300" />
      </HotTable>
      <Button onClick={handleSubmitParams}>Enviar</Button>
    </div>
  );
}

export default CuartaTablaContabilidad;
