import { Outlet } from "react-router-dom";
import Navbar from "../components/utilities/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
