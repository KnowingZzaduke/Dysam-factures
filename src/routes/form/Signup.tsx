import { useEffect, useState } from "react";
import videoWater from "/onda.mp4";
import imgWater from "/img-water.webp";
import logoDysam from "/Dysam.jpg";
import { FaTriangleExclamation } from "react-icons/fa6";
import { TypeSignup } from "../../types/signup";
import { SigninResponse } from "../../types/login";
import functions from "../../data/request";
import { useNavigate, Link } from "react-router-dom";
import { Input, Select, SelectItem, Button } from "@nextui-org/react";
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
  const [value, setValue] = useState(new Set([]));
  useEffect(() => {
    console.log(value);
  }, [value]);

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
    if (alert === true) {
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert]);

  useEffect(() => {
    if (userName.length < 6 || userPassword.length < 6) {
      setCampusMessage(true);
    } else {
      setCampusMessage(false);
    }
  }, [userName, userPassword]);

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      {videoLoaded === true ? (
        <video
          src={videoWater}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full min-h-screen object-cover"
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
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            isInvalid={true}
            errorMessage="Ingresa el nombre del usuario"
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
        <div>
          <label htmlFor="cargos" className="form-label">
            Cargo
          </label>
          <Select
            className="mb-3 form-select"
            placeholder="¿A qué tipo de cargo perteneces?"
            selectedKeys={value}
            onSelectionChange={setValue}
          >
            <SelectItem key="1" value="0">
              Persona encargada de llenar las facturass
            </SelectItem>
            <SelectItem key="2" value="1">
              Persona encargada del visto buen
            </SelectItem>
            <SelectItem key="3" value="2">
              Contador/a
            </SelectItem>
          </Select>
        </div>

        <Button type="submit" color="success" className="w-full mt-3">
          Crear cuenta
        </Button>
        {alert === true ? (
          <div
            className="alert alert-danger flex align-center gap-2 my-3"
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
          <div className="w-full flex justify-center my-2">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        {campusMessage === true ? (
          <div
            className="alert alert-danger flex align-center gap-2 my-3"
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
            className="alert alert-success flex align-center gap-2 my-3"
            role="alert"
          >
            <div className="text-center">Usuario creado correctamente</div>
          </div>
        )}
        <div className="flex justify-center">
          <Link
            className="registro my-2 underline hover:cursor-pointer underline-offset-2"
            to="/"
          >
            Iniciar sesión
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
