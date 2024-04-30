import { HotTable, HotColumn } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import { registerLanguageDictionary, esMX } from "handsontable/i18n";
import HyperFormula from "hyperformula";
import "handsontable/dist/handsontable.full.css";
import { Button, Spinner, Input } from "@nextui-org/react";
import functions from "../../../data/request";
registerAllModules();
registerLanguageDictionary(esMX);
import React, { useEffect, useRef, useState } from "react";
import { FaFileArrowUp } from "react-icons/fa6";
type Props = {
  valores: Operaciones;
  setShowModalSendValues: React.Dispatch<React.SetStateAction<boolean>>;
};
import { Params } from "../../../types/params";
import { Operaciones } from "../../../types/operaciones";
function SextaTablaContabilidad({ valores, setShowModalSendValues }: Props) {
  const [params, setParams] = useState<Params>();
  const hotComponentRef = useRef(null);
  const [loader, setLoader] = useState(true);
  const infoSixthCells: number[][] = [];
  const [showTrueSend, setShowTrueSend] = useState(true);

  useEffect(() => {
    setParams((prevData) => {
      // Calcula el total de costos
      const totalCostos =
        valores.equipos +
        valores.manoObraDirecta +
        valores.totalOtrosCostos +
        valores.totalTransporte +
        valores.valorTotal;

      // Calcula la administración como el 5% del total de costos y lo redondea
      const administracion = totalCostos * 0.05;

      // Calcula la utilidad bruta estimada como el 50% del total de costos y lo redondea
      const utilidadBrutaEstimada = totalCostos * 0.5;

      // Calcula el total a cobrar sin IVA sumando los costos, la administración y la utilidad bruta estimada y lo redondea
      const totalACobrarSinIva =
        parseFloat(totalCostos) +
        parseFloat(administracion) +
        parseFloat(utilidadBrutaEstimada);

      // Calcula el total a cobrar con IVA agregando el 19% de IVA al total a cobrar sin IVA y lo redondea
      const totalConIva = parseFloat(totalACobrarSinIva) * 1.19;

      // Formatea los valores para agregar puntos como separadores de miles
      const formatNumber = (value) => {
        return parseFloat(value).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
        });
      };

      return {
        ...prevData,
        totalCostos: totalCostos,
        administracion: administracion,
        utilidadBrutaEstimada: utilidadBrutaEstimada,
        totalACobrarSinIva: totalACobrarSinIva,
        totalConIva: totalConIva,
        fecha: valores.fecha,
        nit: valores.nit,
        descripcion: valores.descripcion,
      };
    });
  }, [valores]);

  useEffect(() => {
    if (params) {
      console.log(params);
      if (params.totalCostos !== 0) {
        setLoader(false);
        setTimeout(() => {
          setShowTrueSend(false);
        }, 7000);
      }
      const arrayParams = Object.values(params);
      infoSixthCells.push(arrayParams);
      if (hotComponentRef.current) {
        hotComponentRef.current.hotInstance.loadData(infoSixthCells);
        hotComponentRef.current.hotInstance.render();
      }
    } else {
      console.log("Aún no llega la formula");
    }
  }, [params]);

  async function handleSubmitParams() {
    if (params) {
      try {
        const response = await functions.sendfacture(params);
        if (response?.data?.salida === "exito") {
          setShowModalSendValues(true);
          setLoader(true);
          setTimeout(() => {
            location.reload();
          }, 3000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Al parecer hubo un problema y los datos son indefinidos, contacta con el programador"
      );
    }
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    // to use an external HyperFormula instance,
    // initialize it with the `'internal-use-in-handsontable'` license key
    licenseKey: "internal-use-in-handsontable",
  });

  return (
    <div className="flex justify-start flex-col w-full">
      {loader === true ? (
        <div className="flex flex-col items-center gap-4 mt-8">
          <h2>Esperando datos válidos para ejecutar las fórmulas</h2>
          <Spinner size="lg" color="primary" />
        </div>
      ) : (
        <div className="flex justify-start flex-col w-full items-center lg:items-start">
          <form className="w-[320px] lg:w-[450px] bg-white p-6 rounded-2xl border border-none">
            <legend className="my-4 text-xl font-semibold text-center">
              Valores
            </legend>
            <div className="flex flex-col gap-4">
              <Input
                type="text"
                value={params?.totalCostos || "cargando"}
                label="Total costos"
                readOnly
                color="success"
              />
              <Input
                type="text"
                value={params?.administracion || "cargando"}
                label="Administración"
                readOnly
                color="success"
              />
              <Input
                type="text"
                value={params?.utilidadBrutaEstimada || "cargando"}
                label="Utilidad bruta estimada"
                readOnly
                color="success"
              />
              <Input
                type="text"
                value={params?.totalACobrarSinIva || "cargando"}
                label="Total sin Iva"
                readOnly
                color="success"
              />
              <Input
                type="text"
                value={params?.totalConIva || "cargando"}
                label="Total con Iva"
                readOnly
                color="success"
              />
            </div>
            {showTrueSend === true ? (
              <div className="flex gap-2 justify-center mt-4 items-center">
                <Spinner size="lg" color="primary" />
                <p className="text-sm font-semibold">
                  Cargando valores, espere por favor
                </p>
              </div>
            ) : (
              <Button
                className="w-full mb-2 mt-4 flex justify-center items-center"
                color="warning"
                onClick={handleSubmitParams}
              >
                <FaFileArrowUp />
                <p>Guardar</p>
              </Button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default SextaTablaContabilidad;
