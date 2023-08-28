import { createContext, useState } from "react";

type login = boolean;
interface DataContextProviderProps {
  children: React.ReactNode;
}
export const DataContext = createContext<{
  // Aquí deberías definir el tipo correcto para setUser
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
}>({
  login: "false",
  setLogin: () => {},
});

export function DataContextProvider(props: DataContextProviderProps) {
  const [login, setLogin] = useState("false");

  return (
    <DataContext.Provider value={{ login, setLogin }}>
      {props.children}
    </DataContext.Provider>
  );
}
