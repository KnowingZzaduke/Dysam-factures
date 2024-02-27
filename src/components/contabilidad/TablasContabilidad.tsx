import InfoTablaContabilidad from "./subtablas/TablaInfo";
import PrimeraTablaContabilidad from "./subtablas/PrimeraTabla";
import SegundaTablaContabilidad from "./subtablas/SegundaTabla";
import TerceraTablaContabilidad from "./subtablas/TerceraTabla";
import CuartaTablaContabilidad from "./subtablas/CuartaTabla";
import QuintaTablaContabilidad from "./subtablas/QuintaTabla";
import SextaTablaContabilidad from "./subtablas/SextaTabla";
import { Operaciones } from "../../types/operaciones";
import { useEffect, useState } from "react";
function TablasContabilidad() {
  const [operacionesTablas, setOperacionesTablas] = useState<Operaciones>({
    equipos: 0,
    manoObraDirecta: 0,
    valorTotal: 0,
    totalTransporte: 0,
    totalOtrosCostos: 0,
  });

  // Función para actualizar los valores desde el componente hijo
  const actualizarValores = (nuevosValores: Operaciones) => {
    setOperacionesTablas(nuevosValores);
  };

  useEffect(() => {
    console.log(operacionesTablas);
  }, [operacionesTablas])
  return (
    <div className="min-h-screen flex flex-col items-center gap-6 max-w-screen-xl	mx-auto">
      <InfoTablaContabilidad />
      <PrimeraTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <SegundaTablaContabilidad />
      <TerceraTablaContabilidad />
      <CuartaTablaContabilidad />
      <QuintaTablaContabilidad />
      <SextaTablaContabilidad />
    </div>
  );
}

export default TablasContabilidad;
