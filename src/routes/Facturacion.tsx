import { Outlet } from "react-router-dom";
import Navbar from "../components/utilities/Navbar";
import Footer from "../components/utilities/Footer";
function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

export default App;
