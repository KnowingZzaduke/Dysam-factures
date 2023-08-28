import Navbar from "../components/utilities/Navbar";
import { Outlet } from "react-router-dom";
function Contabilidad() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default Contabilidad;
