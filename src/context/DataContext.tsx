import { createContext, useState } from "react";
import { SigninResponse } from "../types/login";
import Cookies from "js-cookie";
type login = boolean;
interface DataContextProviderProps {
  children: React.ReactNode;
}
export const DataContext = createContext<{
  // Aquí deberías definir el tipo correcto para setUser
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  data: SigninResponse | any;
  setData: React.Dispatch<React.SetStateAction<SigninResponse | any>>;
  validateSesion: () => boolean
}>({
  login: "false",
  setLogin: () => {},
  data: null,
  setData: () => {},
  validateSesion: () => false
});

export function DataContextProvider(props: DataContextProviderProps) {
  const [login, setLogin] = useState("false");
  const [data, setData] = useState<SigninResponse | any>(null);

  function validateSesion(){
    const SESION = Cookies.get("dysam-fac");
    if(SESION !== undefined){
      return true
    }else{
      return false
    }
  }
  return (
    <DataContext.Provider value={{ login, setLogin, data, setData, validateSesion }}>
      {props.children}
    </DataContext.Provider>
  );
}
