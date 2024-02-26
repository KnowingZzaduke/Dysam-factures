import InfoTablaContabilidad from "./subtablas/TablaInfo";
import PrimeraTablaContabilidad from "./subtablas/PrimeraTabla";
import SegundaTablaContabilidad from "./subtablas/SegundaTabla";
import TerceraTablaContabilidad from "./subtablas/TerceraTabla";
import CuartaTablaContabilidad from "./subtablas/CuartaTabla";
import QuintaTablaContabilidad from "./subtablas/QuintaTabla";
import SextaTablaContabilidad from "./subtablas/SextaTabla";
function TablasContabilidad() {
  
  return (
    <div className="h-screen flex flex-col items-center gap-6 max-w-screen-xl	mx-auto">
      <InfoTablaContabilidad />
      <PrimeraTablaContabilidad />
      <SegundaTablaContabilidad />
      <TerceraTablaContabilidad />
      <CuartaTablaContabilidad />
      <QuintaTablaContabilidad />
      <SextaTablaContabilidad />
    </div>
  );
}

export default TablasContabilidad;
