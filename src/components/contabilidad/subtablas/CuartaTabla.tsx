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
        colHeaders={["I", "I", "I", "I", "I", "I", "TOTAL TRANSPORTE"]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        colWidths={[300, 400, 50, 50, 50, 50, 200]}
        width="100%"
        className="-z-0 custom-table"
      >
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn />
        <HotColumn readOnly className="bg-gray-300" />
      </HotTable>
    </div>
  );
}

export default CuartaTablaContabilidad;
