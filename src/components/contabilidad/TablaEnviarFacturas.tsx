import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import "handsontable/dist/handsontable.full.css";
import { SecondCells, infoSecondCells } from "../../data/dataCells";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect } from "react";

function TablaEnviarFacturas() {
  return (
    <div className="h-screen flex justify-center">
      <HotTable
        language={esMX.languageCode}
        licenseKey="non-commercial-and-evaluation"
        data={infoSecondCells.detalleMod}
        colHeaders={true}
        rowHeaders={true}
        columnSorting={true}
        mergeCells={true}
        contextMenu={["row_above", "row_below"]}
        readOnly={false}
        className="-z-0"
      >
        <HotColumn data="name" title="Detalle de mod" />
        <HotColumn title="Básico ahora" />
        <HotColumn title="Hor-Est" />
        <HotColumn title="Total tiempo/horas" />
        <HotColumn title="Vr día" />
        <HotColumn title="Días estimados" />
        <HotColumn title="Total días" />
        <HotColumn title="Mano obra directa" />
      </HotTable>
    </div>
  );
}

export default TablaEnviarFacturas;
