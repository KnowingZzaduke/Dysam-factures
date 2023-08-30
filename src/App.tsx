import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
import functions from "./data/request";
import { useNavigate } from "react-router-dom";
import { TypeSigning } from "./types/login";
import { FaTriangleExclamation } from "react-icons/fa6";
import Cookies from "js-cookie";
import { TypeCookies } from "./types/cookies";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
function App() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const [isReadyToRedirect, setIsReadyToRedirect] = useState(false);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoWater;
    video.onloadeddata = () => {
      setVideoLoaded(true);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName === "" || userPassword === "") {
      setAlert(true);
    } else {
      const signinParams: TypeSigning = {
        username: userName,
        password: userPassword,
      };
      try {
        const response = await functions.signin(signinParams);
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    if (data?.data.salida === "exito") {
      if (
        data?.data.user !== null ||
        data?.data.iduser !== null ||
        data?.data.level !== null
      ) {
        const cookiesParams: TypeCookies = {
          user: data?.data.user,
          level: data?.data.level,
          iduser: data?.data.iduser,
        };
        const cookieD = functions.encryptData(cookiesParams).toString();
        Cookies.set("dysam-fac", cookieD, {
          SameSite: "none",
          secure: true,
        });
      }
    } else if (data?.data.salida === "error") {
      setAlert(true);
    }
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      if (data?.data.salida === "exito") {
        if (data?.data.level === 0) {
          setIsReadyToRedirect(true); // Marcar como listo para redirigir
        } else {
          setIsReadyToRedirect(true); // Marcar como listo para redirigir
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (isReadyToRedirect) {
      if (data?.data.level === 0) {
        navigate("/facturacion/bienvenida");
      } else {
        navigate("/contabilidad/bienvenida");
      }
    }
  }, [isReadyToRedirect]);

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
        className="h-50 border border-dark rounded p-5 shadow bg-white"
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
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
        {alert === true ? (
          <div
            className="alert alert-danger d-flex align-items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div>Usuario o contraseña incorrectos!</div>
          </div>
        ) : (
          <></>
        )}
      </form>
    </div>
  );
}

export default App;
