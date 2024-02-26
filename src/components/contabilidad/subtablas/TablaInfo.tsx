import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";
function InfoTablaContabilidad() {
  function handleSubmitParams() {
    console.log(infoCells);
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start w-full flex-col">
      <h1 className="text-2xl text-center my-4  font-bold">COTIZACIÓN SERVICIOS DYSAM SAS</h1>
      <HotTable
        language={esMX.languageCode}
        licenseKey="non-commercial-and-evaluation"
        data={infoCells}
        colHeaders={["FECHA", "CLIENTE Y NIT", "DESCRIPCIÓN"]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        width="100%"
        colWidths={[300, 300, 500]}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        className="-z-0 custom-table"
      >
        <HotColumn type="date" />
        <HotColumn type="select" selectOptions={{ cliente1: "Cliente 1" }} />
        <HotColumn type="numeric" />
      </HotTable>
    </div>
  );
}

export default InfoTablaContabilidad;
