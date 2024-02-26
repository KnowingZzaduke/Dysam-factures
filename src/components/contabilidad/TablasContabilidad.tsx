import SegundaTablaContabilidad from "./subtablas/SegundaTabla";
import TerceraTablaContabilidad from "./subtablas/TerceraTabla";
import CuartaTablaContabilidad from "./subtablas/CuartaTabla";
function TablasContabilidad() {
  return (
    <div className="h-screen flex flex-col items-center gap-6 max-w-screen-xl	mx-auto">
      <SegundaTablaContabilidad />
      <TerceraTablaContabilidad />
      <CuartaTablaContabilidad />
    </div>
  );
}

export default TablasContabilidad;
