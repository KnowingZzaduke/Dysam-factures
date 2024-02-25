import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { SecondCells, infoSecondCells } from "../../data/dataCells";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";
function TablaEnviarFacturas() {

  useEffect(() => {
    console.log(infoSecondCells);
    formulasPlugin.engine.changeNamedExpression('ADDITIONAL_COST', );
  }, [infoSecondCells]);

  return (
    <div className="h-screen flex justify-center">
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
        ]}
        rowHeaders={true}
        columnSorting={true}
        mergeCells={true}
        contextMenu={["row_above", "row_below"]}
        readOnly={false}
        autoWrapCol={true}
        autoWrapRow={true}
        manualRowMove={true}
        formulas={{
          engine: HyperFormula,
        }}
        className="-z-0"
      >
        <HotColumn data={1} />
        <HotColumn data={2} />
        <HotColumn data={3} />
        <HotColumn data={4} />
        <HotColumn data={5} />
        <HotColumn data={6} />
        <HotColumn data={7} />
      </HotTable>
    </div>
  );
}

export default TablaEnviarFacturas;
