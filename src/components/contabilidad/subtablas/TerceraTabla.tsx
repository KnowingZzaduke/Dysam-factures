import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoThirdCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useRef } from "react";
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { Operaciones } from "../../../types/operaciones";
function TerceraTablaContabilidad({ valores, actualizarValores }: Props) {
  const hotComponenteTerceraTabla = useRef(null);
  function ejecutarFormulas() {
    const guardarDatos =
      hotComponenteTerceraTabla?.current?.hotInstance?.getData();
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 0) {
        const arrayEquipos = guardarDatos[i];
        for (let e = 0; e < arrayEquipos.length; e++) {
          if (e === 5) {
            const actualizarValoresEquipo = {
              ...valores,
              valorTotal: arrayEquipos[e],
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
        licenseKey="non-commercial-and-evaluation"
        ref={hotComponenteTerceraTabla}
        data={infoThirdCells}
        colHeaders={[
          "HORA AUXILIO",
          "VALOR",
          "NÚMERO/HORAS",
          "TRANSPORTE",
          "VALOR/PAGAR",
          "VALOR TOTAL",
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
        <HotColumn type="numeric" />
        <HotColumn readOnly className="bg-gray-300" type="numeric" />
      </HotTable>
      <Button className="w-1/2 mb-6 mt-2" color="success" onClick={ejecutarFormulas}>
        Guardar valores
      </Button>
    </div>
  );
}

export default TerceraTablaContabilidad;
