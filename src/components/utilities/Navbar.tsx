import React, { useEffect, useState } from "react";
import {
  FaFileExport,
  FaFileSignature,
  FaRegUserCircle,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
type LinksType = {
  [name: string]: boolean;
};
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkFacture, setLinkFacture] = useState(false);
  const [linkFilterFacture, setLinkFilterFacture] = useState(false);
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (location.pathname === "/facturacion/facturas") {
      setLinkFacture(true);
    } else {
      setLinkFacture(false);
    }
    if (location.pathname === "/facturacion/filtrar-facturas") {
      setLinkFilterFacture(true);
    } else {
      setLinkFilterFacture(false);
    }
  }, [location]);

  return (
    <div className="d-flex">
      <nav
        id="sidebar"
        className={`bg-info bg-gradient sidebar ${menuOpen ? "" : "active"}`}
        style={{ width: "210px" }}
      >
        <div className="sidebar-header d-flex align-items-center gap-1 justify-content-center my-3">
          <h3 className="text-white mx-2">Dysam</h3>
          <BsDroplet className="text-blue fs-3" />
        </div>
        <ul className="list-unstyled components d-flex flex-column">
          <li className="m-1">
            <Link
              to="/facturacion/facturas"
              className={`link-light w-100 text-center py-2 d-flex align-items-center justify-content-center gap-2 ${
                linkFacture === true ? "activate" : ""
              }`}
              style={{ display: "inline-block" }}
            >
              <FaFileExport className="fs-4" />
              <span
                className="d-inline-block text-start"
                style={{ width: "100px" }}
              >
                Facturas
              </span>
            </Link>
          </li>
          <li className="m-1">
            <Link
              to="/facturacion/filtrar-facturas"
              className={`link-light w-100 text-center py-2 d-flex align-items-center justify-content-center gap-2 ${
                linkFilterFacture === true ? "activate" : ""
              }`}
              style={{ display: "inline-block" }}
            >
              <FaFileSignature className="fs-4" />
              <span className="d-inline-block text-start">
                Filtrar facturas
              </span>
            </Link>
          </li>
        </ul>
        <div className="h-100 d-flex align-items-start justify-content-end">
          <FaSignOutAlt className="m-2 fs-4 closeSesion" title="Cerrar sesión" style={{ position: "absolute", bottom: 0, right: 0 }} />
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
                <p className="text-white m-0 mx-3">José Luis</p>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
