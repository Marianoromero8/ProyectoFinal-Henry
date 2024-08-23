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
import Dashboard from "./components/Dashboard/Dashboard";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slice/authSlice";
import { useEffect } from "react";
import Error404 from "./components/Error404/Error404";
import Payment from "./components/Payment/Payment";
import ProductsAdmin from "./components/Dashboard/ProductsAdmin";
import UsersAdmin from "./components/Dashboard/UsersAdmin";
import EditProducts from "./components/Dashboard/EditProducts";
import Reviews from "./components/Reviews/Reviews"; // Importa el componente Reviews

// npm run dev ==> en la terminal para correr el front
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
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

        <Route
          path="/Payment"
          element={
            <RouteProtect>
              <Payment />
            </RouteProtect>
          }
        />

        <Route
          path="/form"
          element={
            <RouteProtect roles={["admin", "superAdmin"]}>
              <Form />
            </RouteProtect>
          }
        />

        <Route
          path="/ViewRole"
          element={
            <RouteProtect>
              <ViewRole />
            </RouteProtect>
          }
        />

        <Route
          path="/Dashboard"
          element={
            <RouteProtect roles={["admin", "superAdmin"]}>
              <Dashboard />
            </RouteProtect>
          }
        />

        <Route
          path="/Dashboard/Products"
          element={
            <RouteProtect roles={["admin", "superAdmin"]}>
              <ProductsAdmin />
            </RouteProtect>
          }
        />

        <Route
          path="/Dashboard/Users"
          element={
            <RouteProtect roles={["admin", "superAdmin"]}>
              <UsersAdmin />
            </RouteProtect>
          }
        />

        <Route
          path="/Dashboard/Products/edit/:id"
          element={
            <RouteProtect roles={["admin", "superAdmin"]}>
              <EditProducts />
            </RouteProtect>
          }
        />

        {/* Nueva ruta para Reviews */}
        <Route path="/reviews/:idProduct" element={<Reviews />} />
      </Routes>
    </div>
  );
}

export default App;
