import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoFifthCells } from "../../../data/dataCells";
import { Button } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useRef } from "react";
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { Operaciones } from "../../../types/operaciones";
function QuintaTablaContabilidad({ valores, actualizarValores }: Props) {
  const hotComponenteQuintaTabla = useRef(null);
  function ejecutarFormulas() {
    const guardarDatos =
      hotComponenteQuintaTabla?.current?.hotInstance?.getData();
    console.log(guardarDatos);
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 0) {
        const arrayEquipos = guardarDatos[i];
        for (let e = 0; e < arrayEquipos.length; e++) {
          if (e === 4) {
            const actualizarValoresEquipo = {
              ...valores,
              totalOtrosCostos: arrayEquipos[e],
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
      <h1 className="text-xl font-semibold text-center my-4">
        Impuestos y otros gastos
      </h1>
      <HotTable
        language={esMX.languageCode}
        licenseKey="non-commercial-and-evaluation"
        ref={hotComponenteQuintaTabla}
        data={infoFifthCells}
        colHeaders={[
          "DESCRIPCIÓN",
          "VALOR",
          "CANTIDAD",
          "T0TAL",
          "TOTAL OTROS COSTOS",
        ]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
        colWidths={[500, 100, 100, 100, 200]}
        width="100%"
        comments={true}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: "Sheet1",
        }}
        className="-z-0 custom-table"
        cell={[
          {
            row: 5,
            col: 0,
            comment: { value: "Maira Alejandra Zea: Colocaría UN" },
            readOnly: true,
          },
        ]}
      >
        <HotColumn />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn readOnly className="bg-gray-300" type="numeric" />
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

export default QuintaTablaContabilidad;
