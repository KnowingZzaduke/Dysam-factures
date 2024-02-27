import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoFirthCells } from "../../../data/dataCells";
registerAllModules();
registerLanguageDictionary(esMX);
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { Operaciones } from "../../../types/operaciones";
import { useRef } from "react";
import { Button } from "@nextui-org/react";
function PrimeraTablaContabilidad({ valores, actualizarValores }: Props) {
  const hotComponentePrimeraTabla = useRef(null);
  function ejecutarFormulas() {
    const guardarDatos =
      hotComponentePrimeraTabla?.current?.hotInstance?.getData();
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 34) {
        const arrayEquipos = guardarDatos[i];
        for (let e = 0; e < arrayEquipos.length; e++) {
          if (e === 3) {
            const actualizarValoresEquipo = {
              ...valores,
              equipos: arrayEquipos[e],
            };
            actualizarValores(actualizarValoresEquipo);
          }
        }
      }
    }
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start flex-col w-full">
      <HotTable
        ref={hotComponentePrimeraTabla}
        language={esMX.languageCode}
        licenseKey="non-commercial-and-evaluation"
        data={infoFirthCells}
        colHeaders={["CÓDIGO", "CANTIDAD", "V. UNITARIO", "VALOR"]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        width="100%"
        colWidths={[400, 150, 150, 150, 200]}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        className="-z-0 custom-table"
      >
        <HotColumn type="select" selectOptions={{ 5: "Código A001" }} />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
      </HotTable>
      <Button
        className="w-1/2 mb-6 mt-2"
        color="success"
        onClick={ejecutarFormulas}
      >
        Guardar valores
      </Button>
    </div>
  );
}

export default PrimeraTablaContabilidad;
