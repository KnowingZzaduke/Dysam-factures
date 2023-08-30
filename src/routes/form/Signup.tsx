import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
import { FaTriangleExclamation } from "react-icons/fa6";
import { TypeSignup } from "../../types/signup";
import { SigninResponse } from "../../types/login";
import functions from "../../data/request";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPosition, setUserPosition] = useState("0");
  const [alert, setAlert] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [data, setData] = useState<SigninResponse | any>(null);
  const [campusMessage, setCampusMessage] = useState(false);
  const [spiner, setSpiner] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoWater;
    video.onloadeddata = () => {
      setVideoLoaded(true);
    };
  }, []);

  function handleValueSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserPosition(e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName === "" || userPassword === "" || userPosition === "0") {
      setAlert(true);
    } else {
      setAlert(false);
      const signupParams: TypeSignup = {
        username: userName,
        password: userPassword,
        position: userPosition,
      };
      const response = await functions.signup(signupParams);
      if (response) {
        setData(response);
      }
    }
  }

  useEffect(() => {
    if (data !== null) {
      if (data?.data.salida === "exito") {
        setMessageSuccess(true);
        setSpiner(true);
        setTimeout(() => {
          setSpiner(false);
          navigate("/");
        }, 3000);
      } else if (data?.data.salida === "error") {
        setMessageSuccess(false);
      }
    }
  }, [data]);

  useEffect(() => {
    if (userName.length < 6 || userPassword.length < 6) {
      setCampusMessage(true);
    } else {
      setCampusMessage(false);
    }
  }, [userName, userPassword]);

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
            onChange={handleValueSelect}
          >
            <option value="0" disabled>
              ¿A qué tipo de cargo perteneces?
            </option>
            <option value="1">Persona encargada del visto bueno</option>
            <option value="2">Contador/a</option>
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
            <div className="text-center">
              Los campos deben ser llenados correctamente
            </div>
          </div>
        ) : (
          <></>
        )}
        {spiner === true ? (
          <div className="w-100 d-flex justify-content-center my-2">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        {campusMessage === true ? (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div className="text-center">
              El usuario y la contraseña deben tener minimo 6 caracteres
            </div>
          </div>
        ) : (
          <></>
        )}
        {messageSuccess === true && (
          <div
            className="alert alert-success d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <div className="text-center">Usuario creado correctamente</div>
          </div>
        )}
        <div className="d-flex justify-content-end">
          <a className="registro my-2" href="/" target="_blank">
            Iniciar sesión
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
