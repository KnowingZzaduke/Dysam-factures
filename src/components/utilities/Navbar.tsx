import React, { useEffect, useState, useContext } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHandsClapping, FaNewspaper, FaTableList } from "react-icons/fa6";
import { DataContext } from "../../context/DataContext";
import Cookies from "js-cookie";
import functions from "../../data/request";
function Navegacion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkFacture, setLinkFacture] = useState(false);
  const [linkFilterFacture, setLinkFilterFacture] = useState(false);
  const [linkCorrectFact, setLinkCorrectFact] = useState(false);
  const [linkSendFact, setLinkSendFact] = useState(false);
  const { setData, reloadData, setReloadData } = useContext(DataContext);
  const [changeMenu, setChangeMenu] = useState<boolean>();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Enviar facturas",
      path: "/contabilidad/enviar-facturas",
      icon: FaNewspaper,
    },
    {
      name: "Corregir facturas",
      path: "/contabilidad/corregir-facturas",
      icon: FaTableList,
    },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  function closedSession() {
    Cookies.remove("dysam-fac");
    setData({ salida: "error", data: "Cerró sesión" });
    navigate("/");
  }

  useEffect(() => {
    if (
      location.pathname === "/facturacion/facturas" ||
      location.pathname === "/contabilidad/enviar-facturas"
    ) {
      setLinkFacture(true);
    } else {
      setLinkFacture(false);
    }
    if (
      location.pathname === "/facturacion/filtrar-facturas" ||
      location.pathname === "/contabilidad/corregir-facturas"
    ) {
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
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">Dysam</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="primary"
            variant="flat"
            onClick={() => closedSession()}
          >
            Cerrar sesión
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link color="primary" className="w-full" to={item.path}>
              <div
                className="flex flex-row items-center"
                style={{ gap: "10px" }}
              >
                <item.icon />
                {item.name}
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Navegacion;
