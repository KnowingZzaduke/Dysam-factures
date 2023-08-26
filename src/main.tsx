import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Facturacion from "./routes/Facturacion";
import Facturas from "./components/facturacion/Facturas";
import Welcome from "./components/facturacion/Welcome";
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
