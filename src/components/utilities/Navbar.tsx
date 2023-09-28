import React, { useEffect, useState, useContext } from "react";
import {
  FaFileExport,
  FaFileSignature,
  FaRegUserCircle,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import Cookies from "js-cookie";
import functions from "../../data/request";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkFacture, setLinkFacture] = useState(false);
  const [linkFilterFacture, setLinkFilterFacture] = useState(false);
  const [linkCorrectFact, setLinkCorrectFact] = useState(false);
  const [linkSendFact, setLinkSendFact] = useState(false);
  const { setData, reloadData, setReloadData } = useContext(DataContext);
  const [changeMenu, setChangeMenu] = useState<boolean>();
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();
  function closeSession() {
    Cookies.remove("dysam-fac");
    setData({ salida: "error", data: "Cerró sesión" });
    navigate("/");
  }

  useEffect(() => {
    if (location.pathname === "/facturacion/facturas" || location.pathname === "/contabilidad/enviar-facturas") {
      setLinkFacture(true);
    } else {
      setLinkFacture(false);
    }
    if (location.pathname === "/facturacion/filtrar-facturas" || location.pathname === "/contabilidad/corregir-facturas") {
      setLinkFilterFacture(true);
    } else {
      setLinkFilterFacture(false);
    }
    if (location.pathname === "/facturacion/facturas") {
      setLinkCorrectFact(true);
    } else {
      setLinkCorrectFact(false);
    }
    if (location.pathname === "/facturacion/facturas") {
      setLinkSendFact(true);
    } else {
      setLinkSendFact(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/facturacion/bienvenida") {
      setChangeMenu(false);
    } else if (location.pathname === "/contabilidad/bienvenida") {
      setChangeMenu(true);
    }
  }, [location]);

  useEffect(() => {
    const SESSION = Cookies.get("dysam-fac");
    if (SESSION) {
      const SESSIONDECRYPT = functions.decryptdata(SESSION);
      setReloadData({
        user: SESSIONDECRYPT.user,
        level: SESSIONDECRYPT.level,
        iduser: SESSIONDECRYPT.iduser,
      });
    }
  }, [location]);

  return (
    <div className="d-flex">
      <nav
        id="sidebar"
        className={`bg-info bg-gradient sidebar ${menuOpen ? "" : "active"}`}
        style={{ width: "210px", zIndex: "100" }}
      >
        <div className="sidebar-header d-flex align-items-center gap-1 justify-content-center my-3">
          <h3 className="text-white mx-2">Dysam</h3>
          <BsDroplet className="text-blue fs-3" />
        </div>
        <ul className="list-unstyled components d-flex flex-column">
          <li className="m-1">
            <Link
              to={`${
                changeMenu === false
                  ? "/facturacion/facturas"
                  : "/contabilidad/enviar-facturas"
              }`}
              className={`link-light w-100 text-center py-2 d-flex align-items-center justify-content-center gap-2 ${
                linkFacture === true ? "activate" : ""
              }`}
              style={{ display: "inline-block" }}
            >
              <FaFileExport className="fs-4" />
              <span
                className="d-inline-block text-start"
                style={{ width: "150px" }}
              >
                {changeMenu === false ? "Facturas" : "Enviar facturas"}
              </span>
            </Link>
          </li>
          <li className="m-1">
            <Link
              to={`${
                changeMenu === false
                  ? "/facturacion/filtrar-facturas"
                  : "/contabilidad/corregir-facturas"
              }`}
              className={`link-light w-100 text-center py-2 d-flex align-items-center justify-content-center gap-2 ${
                linkFilterFacture === true ? "activate" : ""
              }`}
              style={{ display: "inline-block" }}
            >
              <FaFileSignature className="fs-4" />
              <span
                className="d-inline-block text-start"
                style={{ width: "150px" }}
              >
                {changeMenu === false
                  ? "Filtrar facturas"
                  : "Corregir facturas"}
              </span>
            </Link>
          </li>
        </ul>
        <div className="h-100 d-flex align-items-start justify-content-end">
          <FaSignOutAlt
            className="m-2 fs-4 closeSesion"
            title="Cerrar sesión"
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onClick={closeSession}
          />
        </div>
      </nav>

      <div id="content" className={`flex-grow-1 ${menuOpen ? "" : "active"}`}>
        <header className="bg-dark py-3">
          <div className="d-flex align-items-center">
            <div className="d-flex">
              <button
                type="button"
                id="sidebarCollapse"
                className={`btn btn-dark mx-3 ${menuOpen ? "" : "active"}`}
                onClick={toggleMenu}
              >
                <FaBars />
              </button>
            </div>
            <div className="w-100 d-flex align-items-center justify-content-end">
              {/* Contenedor de la información del usuario */}
              <div
                className="d-flex align-items-center position-fixed end-0"
                style={{ maxWidth: "calc(100% - 210px)" }}
              >
                <FaRegUserCircle className="text-white fs-3" />
                <p className="text-white m-0 mx-3">{reloadData?.user}</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
