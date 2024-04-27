import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import functions from "../../data/request";
import Cookies from "js-cookie";
interface AuthChildren {
  children: React.ReactNode;
}
import { useLocation } from "react-router-dom";
function Autenticacion({ children }: AuthChildren) {
  const { validateSesion } = useContext(DataContext);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const SESION = Cookies.get("dysam-fac");
    if (SESION === undefined) {
      console.log("No tienes cookies guardadas 😶");
      navigate("/");
    } else {
      const SESIONDECRYPT = functions.decryptdata(SESION);
      if (validateSesion()) {
        if (SESIONDECRYPT.level === 0) {
          if (location.pathname === "/contabilidad/enviar-facturas" || location.pathname === "/") {
            navigate("/contabilidad/enviar-facturas");
          } else if (location.pathname === "/contabilidad/corregir-facturas") {
            navigate("/contabilidad/corregir-facturas");
          }
        } else if (SESIONDECRYPT.level === 1) {
          navigate("/contabilidad/corregir-facturas");
        } else if (SESIONDECRYPT.level === 2) {
          navigate("/revision");
        }
      } else {
        if (SESIONDECRYPT.user === null) {
          Cookies.remove("dysam-fac");
          navigate("/");
        } else if (SESION === undefined) {
          navigate("/");
        }
      }
    }
  }, []);
  return children ? children : <Outlet />;
}

export default Autenticacion;
