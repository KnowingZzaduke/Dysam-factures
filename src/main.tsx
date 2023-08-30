import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Signup from "./routes/form/Signup";
import Facturacion from "./routes/Facturacion";
import Contabilidad from "./routes/Contabilidad";
import Facturas from "./components/facturacion/Facturas";
import FilterFacturas from "./components/facturacion/FiltrarFacturas";
import Welcome from "./components/utilities/Welcome";
import EnviarFacturas from "./components/contabilidad/EnviarFacturas";
import CorregirFacturas from "./components/contabilidad/CorregirFacturas";
import { DataContextProvider } from "./context/DataContext";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Autenticacion from "./components/validacion/HOC";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/registrarse",
    element: <Signup />,
  },
  {
    path: "facturacion",
    element: (
      <Autenticacion>
        <Facturacion />
      </Autenticacion>
    ),
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
    element: (
      <Autenticacion>
        <Contabilidad />
      </Autenticacion>
    ),
    children: [
      {
        path: "/contabilidad/bienvenida",
        element: <Welcome />,
      },
      {
        path: "/contabilidad/enviar-facturas",
        element: <EnviarFacturas />,
      },
      {
        path: "/contabilidad/corregir-facturas",
        element: <CorregirFacturas />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DataContextProvider>
      <RouterProvider router={router} />
    </DataContextProvider>
  </React.StrictMode>
);
