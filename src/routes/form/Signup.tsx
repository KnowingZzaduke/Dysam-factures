import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
import { FaTriangleExclamation } from "react-icons/fa6";
function Signup() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoWater;
    video.onloadeddata = () => {
      setVideoLoaded(true);
    };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div
      className="position-relative d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", overflow: "hidden" }}
    >
      {videoLoaded === true ? (
        <video
          src={videoWater}
          autoPlay
          muted
          loop
          playsInline
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: "-1" }}
        />
      ) : (
        <img
          src={imgWater}
          alt="fondo de agua"
          className="position-absolute top-0 left-0 w-100 h-100"
          style={{ objectFit: "cover", zIndex: "-1" }}
        />
      )}

      <form
        className="h-50 border border-dark rounded p-4 mx-2 shadow bg-white"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <img
            src={logoDysam}
            alt="Lodo Dysam"
            className="my-3"
            style={{ width: "150px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUserName(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            Ingresa tu nombre de usuario.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cargos" className="form-label">
            Cargo
          </label>
          <select
            className="mb-3 form-select"
            aria-label="Default select example"
            defaultValue="0"
          >
            <option value="0" disabled>
              ¿A qué tipo de cargo perteneces?
            </option>
            <option value="1">Contador/a</option>
            <option value="2">Persona encargada del visto bueno</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Crear cuenta
        </button>
        {alert === true ? (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div className="text-center">Usuario o contraseña incorrectos!</div>
          </div>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-end">
          <a className="registro my-2" href="/registrarse" target="_blank">
            Iniciar sesión
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
