import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
import functions from "./data/request";
import { useNavigate, Link } from "react-router-dom";
import { TypeSigning } from "./types/login";
import { FaTriangleExclamation } from "react-icons/fa6";
import Cookies from "js-cookie";
import { TypeCookies } from "./types/cookies";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { Input, Button } from "@nextui-org/react";

function App() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const [spiner, setSpiner] = useState(false);

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
        setSpiner(true);
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
    if (alert === true) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert]);

  useEffect(() => {
    if (data !== undefined) {
      if (data?.data.salida === "exito") {
        if (data?.data.level === 1) {
          navigate("/contabilidad/corregir-facturas");
        } else if (data?.data.level === 2) {
          navigate("/revision");
        } else if (data?.data.level === 0) {
          navigate("/contabilidad/enviar-facturas");
        }
      }
    }
  }, [data]);

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {videoLoaded === true ? (
        <video
          src={videoWater}
          autoPlay
          muted
          loops
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={imgWater}
          alt="fondo de agua"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
      <form
        className="h-50 border border-black rounded-2xl w-96 p-4 mx-2 shadow bg-white z-10"
        onSubmit={handleSubmit}
      >
        <div className="text-center flex justify-center">
          <img
            src={logoDysam}
            alt="Logo Dysam"
            className="my-3"
            style={{ width: "150px" }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Usuario
          </label>
          <Input
            type="text"
            className=""
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            isInvalid={true}
            errorMessage="Ingresa un usuario"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Contraseña
          </label>
          <Input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            isInvalid={true}
            errorMessage="Ingresa una contraseña"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        {spiner === true ? (
          <div className="w-full flex justify-centers my-2">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <Button color="success" type="submit" className="w-full mt-3">
          Enviar
        </Button>
        {alert === true ? (
          <div
            className="alert alert-danger flex justify-center text-red-400 items-center gap-2 my-3"
            role="alert"
          >
            <FaTriangleExclamation />
            <div className="text-center">Usuario o contraseña incorrectos!</div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-center ">
          <Link
            className="registro underline-offset-2 my-2 hover:cursor-pointer underline"
            to="/registrarse"
          >
            Crear cuenta
          </Link>
        </div>
      </form>
      ´
    </div>
  );
}

export default App;
