import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Facturacion from "./routes/Facturacion";
import Contabilidad from "./routes/Contabilidad";
import Facturas from "./components/facturacion/Facturas";
import FilterFacturas from "./components/facturacion/FiltrarFacturas";
import Welcome from "./components/utilities/Welcome";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "facturacion",
    element: <Facturacion />,
    children: [
      {
        path: "/facturacion/bienvenida",
        element: <Welcome />,
      },
      {
        path: "/facturacion/facturas",
        element: <Facturas />,
      },
      {
        path: "/facturacion/filtrar-facturas",
        element: <FilterFacturas />,
      },
    ],
  },
  {
    path: "contabilidad",
    element: <Contabilidad />,
    children: [
      {
        path: "/contabilidad/bienvenida",
        element: <Welcome />,
      },
      {
        path: "/contabilidad/enviar-facturas",
        element: <Facturas />,
      },
      {
        path: "/contabilidad/corregir-facturas",
        element: <FilterFacturas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
