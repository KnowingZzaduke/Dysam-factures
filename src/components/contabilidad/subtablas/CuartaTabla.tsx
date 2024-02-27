import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoFourthCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useRef } from "react";
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { Operaciones } from "../../../types/operaciones";
function CuartaTablaContabilidad({ valores, actualizarValores }: Props) {
  const hotComponenteCuartaTabla = useRef(null);
  function ejecutarFormulas() {
    const guardarDatos =
      hotComponenteCuartaTabla?.current?.hotInstance?.getData();
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 0) {
        const arrayEquipos = guardarDatos[i];
        for (let e = 0; e < arrayEquipos.length; e++) {
          if (e === 4) {
            const actualizarValoresEquipo = {
              ...valores,
              totalTransporte: arrayEquipos[e],
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
        language={esMX.languageCode}
        ref={hotComponenteCuartaTabla}
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

export default CuartaTablaContabilidad;
