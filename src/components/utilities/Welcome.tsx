import Typed from "typed.js";
import { useRef, useEffect } from "react";
function Welcome() {
  const welcome = useRef(null);
  useEffect(() => {
    const typed = new Typed(welcome.current, {
      strings: [
        "<h3> Encantado de tenerte aquí. Explora nuestras opciones para subir y ver las diferentes facturas y poder realizar el filtrado de estas</h3>",
      ],
      typeSpeed: 30,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="col-6 typed text-center">
        <h1>Bienvenido 👋</h1>
        <div ref={welcome} />
      </div>
    </div>
  );
}

export default Welcome;
