import React, { useState } from "react";
import { FaFileExport, FaFileSignature, FaUser, FaBars } from "react-icons/fa";
import { BsDroplet } from "react-icons/bs";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="d-flex">
      <nav
        id="sidebar"
        className={`bg-secondary sidebar ${menuOpen ? "" : "active"}`}
        style={{ width: "210px" }}
      >
        <div className="sidebar-header d-flex align-items-center gap-1 justify-content-center my-3">
          <h3 className="text-white mx-2">Dysam</h3>
          <BsDroplet className="text-blue fs-3" />
        </div>
        <ul className="list-unstyled components d-flex flex-column">
          <li className="m-1">
            <a
              href="#"
              className="link-dark w-100 text-center py-2 bg-light rounded"
              style={{ display: "inline-block" }}
            >
              <FaFileExport
                className={`me-2 ${menuOpen ? "d-none" : "d-inline"}`}
              />
              <span className={menuOpen ? "d-inline" : ""}>Home</span>
            </a>
          </li>
          <li className="m-1">
            <Link
              to="/facturacion/facturas"
              className="link-dark w-100 text-center py-2 bg-light rounded"
              style={{ display: "inline-block" }}
            >
              <FaFileSignature
                className={`me-2 ${menuOpen ? "d-none" : "d-inline"}`}
              />
              <span className={menuOpen ? "d-inline" : ""}>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content */}
      <div id="content" className={`flex-grow-1 ${menuOpen ? "" : "active"}`}>
        <header className="bg-dark py-3">
          <button
            type="button"
            id="sidebarCollapse"
            className={`btn btn-dark mx-3 ${menuOpen ? "" : "active"}`}
            onClick={toggleMenu}
          >
            <FaBars />
          </button>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
