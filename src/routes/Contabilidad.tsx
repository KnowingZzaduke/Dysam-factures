import Navbar from "../components/utilities/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/utilities/FooterDysam";
function Contabilidad() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}
export default Contabilidad;
