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
import RouteProtect from "./components/RoutePotect/RouteProtect";
import ViewRole from "./components/ViewRole/ViewRole";
import Dashboard from "./components/Admin/Dashboard/Dashboard"
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/authSlice";
import { useEffect } from "react";
import Error404 from "./components/Error404/Error404";

// npm run dev ==> en la terminal dentro de la carpeta 'vite-project' para correr el front
// Lo comentado es para el login y register para autorizacion de terceros
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

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

        <Route path="*" element={<Error404 />} />

        <Route path="/form" element={
          <RouteProtect>
            <Form />
          </RouteProtect>
        } />

        <Route path="/ViewRole" element={
          <RouteProtect>
            <ViewRole />
          </RouteProtect>
        } />

        <Route path="/Dashboard" element={
          <RouteProtect>
            <Dashboard />
          </RouteProtect>
        } />
      </Routes>
    </div>
  );
}

export default App;
