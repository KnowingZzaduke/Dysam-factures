import { Outlet } from "react-router-dom";
import Navbar from "../components/utilities/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
