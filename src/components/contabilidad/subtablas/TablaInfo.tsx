import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { infoCells } from "../../../data/dataCells";
import { Clientes } from "../../../types/clientes";
import functions from "../../../data/request";
import { Button, Checkbox } from "@nextui-org/react";
import { Operaciones } from "../../../types/operaciones";
registerAllModules();
registerLanguageDictionary(esMX);
type Props = {
  valores: Operaciones;
  actualizarValores: (nuevosValores: Operaciones) => void;
};
import { useEffect, useState, useRef } from "react";
function InfoTablaContabilidad({ valores, actualizarValores }: Props) {
  const [dataClients, setDataClients] = useState<Clientes[][]>([]);
  const hotComponenteTablaInfo = useRef(null);
  const [selectOptions, setSelectOptions] = useState({});
  const [isSelected, setIsSelected] = useState(false);

  function ejecutarFormulas() {
    const guardarDatos =
      hotComponenteTablaInfo?.current?.hotInstance?.getData();
    for (let i = 0; i < guardarDatos.length; i++) {
      if (i === 0) {
        const arrayEquipos = guardarDatos[i];
        if(arrayEquipos.length > 0){
          const actualizarValoresEquipo = {
            ...valores,
            fecha: arrayEquipos[0],
            nit: arrayEquipos[1],
            descripcion: arrayEquipos[2]
          };
          actualizarValores(actualizarValoresEquipo);
        }
      }
    }
  }

  useEffect(() => {
    async function useLoaderData() {
      try {
        const response = await functions.loadingclients();
        if (response?.data.salida === "exito") {
          setDataClients(response.data.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    useLoaderData();
  }, []);

  useEffect(() => {
    const selectOptionsData = dataClients.reduce((acc, item, index) => {
      acc[item?.nombres +  " " + "-" + " " + item?.id_cliente] = item?.nombres + " " + "-" + " " + item?.id_cliente;
      return acc;
    }, {});
    setSelectOptions(selectOptionsData);
  }, [dataClients]);

  useEffect(() => {
    if (isSelected === true) {
      const inter = setInterval(() => {
        ejecutarFormulas();
      }, 1000);
      setTimeout(() => {
        clearInterval(inter);
      }, 7000);
    }
  }, [isSelected]);

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start w-full flex-col">
      <h1 className="text-2xl text-center my-4  font-bold">
        COTIZACIÓN SERVICIOS DYSAM SAS
      </h1>
      <HotTable
        language={esMX.languageCode}
        ref={hotComponenteTablaInfo}
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
        <HotColumn type="select" selectOptions={selectOptions} />
        <HotColumn type="text" />
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

export default InfoTablaContabilidad;
