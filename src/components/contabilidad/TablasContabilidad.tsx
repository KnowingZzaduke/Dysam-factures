import InfoTablaContabilidad from "./subtablas/TablaInfo";
import PrimeraTablaContabilidad from "./subtablas/PrimeraTabla";
import SegundaTablaContabilidad from "./subtablas/SegundaTabla";
import TerceraTablaContabilidad from "./subtablas/TerceraTabla";
import CuartaTablaContabilidad from "./subtablas/CuartaTabla";
import QuintaTablaContabilidad from "./subtablas/QuintaTabla";
import SextaTablaContabilidad from "./subtablas/SextaTabla";
import { Operaciones } from "../../types/operaciones";
import { useEffect, useState } from "react";
import ModalBloqueo from "../utilities/modal/ModalBloqueo";
function TablasContabilidad() {
  const [operacionesTablas, setOperacionesTablas] = useState<Operaciones>({
    equipos: 0,
    manoObraDirecta: 0,
    valorTotal: 0,
    totalTransporte: 0,
    totalOtrosCostos: 0,
    fecha: "",
    nit: "",
    descripcion: "",
  });

  // Función para actualizar los valores desde el componente hijo
  const actualizarValores = (nuevosValores: Operaciones) => {
    setOperacionesTablas(nuevosValores);
  };

  const [showModalSendValues, setShowModalSendValues] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center gap-6 max-w-screen-xl	mx-auto">
      <InfoTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <PrimeraTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <SegundaTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <TerceraTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <CuartaTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <QuintaTablaContabilidad
        valores={operacionesTablas}
        actualizarValores={actualizarValores}
      />
      <SextaTablaContabilidad
        valores={operacionesTablas}
        setShowModalSendValues={setShowModalSendValues}
      />
      <ModalBloqueo
        showModalSendValues={showModalSendValues}
        setShowModalSendValues={setShowModalSendValues}
      />
    </div>
  );
}

export default TablasContabilidad;
