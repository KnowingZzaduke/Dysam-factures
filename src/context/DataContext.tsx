import { createContext, useState, useEffect } from "react";
import { SigninResponse } from "../types/login";
import { TypeCookies } from "../types/cookies";
import Cookies from "js-cookie";
import functions from "../data/request";
interface DataContextProviderProps {
  children: React.ReactNode;
}
export const DataContext = createContext<{
  // Aquí deberías definir el tipo correcto para setUser
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  data: SigninResponse | any;
  setData: React.Dispatch<React.SetStateAction<SigninResponse | any>>;
  validateSesion: () => boolean;
  reloadData: TypeCookies | any,
  setReloadData: React.Dispatch<React.SetStateAction<TypeCookies| any>>;
}>({
  login: "false",
  setLogin: () => {},
  data: null,
  setData: () => {},
  validateSesion: () => false,
  reloadData: null,
  setReloadData: () => {}
});

export function DataContextProvider(props: DataContextProviderProps) {
  const [login, setLogin] = useState("false");
  const [data, setData] = useState<SigninResponse | any>(null);
  const [reloadData, setReloadData] = useState <TypeCookies | any>(null);
  function validateSesion() {
    const SESION = Cookies.get("dysam-fac");
    if (SESION !== undefined) {
      return true;
    } else {
      return false;
    }
  }

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
  }, []);

  return (
    <DataContext.Provider
      value={{ login, setLogin, data, setData, validateSesion, reloadData, setReloadData }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
