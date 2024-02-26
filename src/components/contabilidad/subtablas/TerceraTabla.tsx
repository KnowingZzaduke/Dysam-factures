import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoThirdCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";
function TerceraTablaContabilidad() {
  function handleSubmitParams() {
    console.log(infoThirdCells);
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
        data={infoThirdCells}
        colHeaders={[
          "HORA AUXILIO",
          "VALOR",
          "NÚMERO/HORAS",
          "TRANSPORTE",
          "VALOR/PAGAR",
        ]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        width="100%"
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        className="-z-0 custom-table"
      >
        <HotColumn />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn readOnly className="bg-gray-300" type="numeric" />
      </HotTable>
    </div>
  );
}

export default TerceraTablaContabilidad;
