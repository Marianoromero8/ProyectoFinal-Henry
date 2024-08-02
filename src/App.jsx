import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";
import Details from "./components/Details/Details";
import AboutUs from "./components/AboutUs/AboutUs";
import Form from "./components/Form/Form";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import RoutProtect from "./components/RoutePotect/RoutProtect";
import ViewRole from "./components/ViewRole/ViewRole";
import Dashboard from "./components/Admin/Dashboard/Dashboard"

// npm run dev ==> en la terminal dentro de la carpeta 'vite-project' para correr el front
// Lo comentado es para el login y register para autorizacion de terceros
function App() {
  console.log();
  return (
    <div className=".App">
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/Home" element={<Home />} />

        <Route path="/Details/:id" element={<Details />} />

        <Route path="/AboutUs" element={<AboutUs />} />
       

        <Route path="/Login" element={<Login />} />

        <Route path="/Register" element={<Register />} />

        <Route path="/Cart" element={<Cart />} />

        <Route path="/form" element={
          <RoutProtect>
            <Form />
          </RoutProtect>
        } />
        
        <Route path="/ViewRole" element={
          <RoutProtect>
            <ViewRole />
          </RoutProtect>
        } />

        <Route path="/Dashboard" element={
          <RoutProtect>
            <Dashboard />
          </RoutProtect>
        } />
      </Routes>
    </div>
  );
}

export default App;
