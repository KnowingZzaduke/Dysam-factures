import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoSecondCells } from "../../../data/dataCells";
import { Button, Checkbox } from "@nextui-org/react";
registerAllModules();
registerLanguageDictionary(esMX);
import { useEffect, useRef, useState } from "react";
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { Operaciones } from "../../../types/operaciones";
function SegundaTablaContabilidad({ valores, actualizarValores }: Props) {
  const hotComponenteSegundaTabla = useRef(null);
  const [isSelected, setIsSelected] = useState(false);
  function ejecutarFormulas() {
    const guardarDatos =
      hotComponenteSegundaTabla?.current?.hotInstance?.getData();
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 0) {
        const arrayEquipos = guardarDatos[i];
        for (let e = 0; e < arrayEquipos.length; e++) {
          if (e === 7) {
            const actualizarValoresEquipo = {
              ...valores,
              manoObraDirecta: arrayEquipos[e],
            };
            actualizarValores(actualizarValoresEquipo);
          }
        }
      }
    }
  }

  useEffect(() => {
    if (isSelected === true) {
      ejecutarFormulas();
    }
  }, [isSelected]);

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start flex-col w-full">
      <HotTable
        language={esMX.languageCode}
        ref={hotComponenteSegundaTabla}
        licenseKey="non-commercial-and-evaluation"
        width="100%"
        data={infoSecondCells}
        colHeaders={[
          "DETALLE DE M.O.D.",
          "BASICO HORA",
          "HOR-EST",
          "TOTAL TIEMPO/ HORAS",
          "VR DIA ",
          "DIA ESTIMADOS",
          "TOTAL DIAS",
          "MANO DE OBRA DIRECTA",
        ]}
        rowHeaders={true}
        columnSorting={true}
        contextMenu={["row_above", "row_below"]}
        autoWrapCol={true}
        autoWrapRow={true}
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
        <HotColumn type="numeric" />
        <HotColumn type="numeric" />
        <HotColumn readOnly className="bg-gray-300" />
      </HotTable>
      <div className="my-2 p-2 border rounded-lg w-2/5 bg-green-500">
        <Checkbox
          isSelected={isSelected}
          onValueChange={setIsSelected}
          size="lg"
        >
          <p className="text-xs">Capturar valores</p>
        </Checkbox>
      </div>
    </div>
  );
}

export default SegundaTablaContabilidad;
