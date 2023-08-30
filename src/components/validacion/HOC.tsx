import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { useNavigate } from "react-router-dom";
import functions from "../../data/request";
import Cookies from "js-cookie";
interface AuthChildren {
  children: React.ReactNode;
}
function Autenticacion({ children }: AuthChildren) {
  const { validateSesion, } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    const SESION = Cookies.get("dysam-fac");
    if (SESION === undefined) {
      navigate("/");
    } else {
      const SESIONDECRYPT = functions.decryptdata(SESION);
      if (validateSesion()) {
        console.log(SESIONDECRYPT);
        switch (SESIONDECRYPT.level) {
          case 0:
            navigate("/facturacion/bienvenida");
            break;
          case 1:
            navigate("/contabilidad/bienvenida");
            break;
        }
      } else {
        if (SESIONDECRYPT.user === null) {
          Cookies.remove("dysam-fac");
          navigate("/");
        }
      }
    }
  }, []);
  return children ? children : <Outlet />;
}

export default Autenticacion;
