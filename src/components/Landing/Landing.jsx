import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import Style from './Landing.module.css'

import Logo from '../../assets/Untitled-1-04.png'
import Icono from '../../assets/Untitled-1-05.png'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/slice/authThunks';

//Login y register para lo que es inicio de sesion y autorizacion de terceros

const Landing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);


  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div>
      {/* <Link to="/Login">
        <button>Sign in</button>
      </Link>
      <Link to="/register">
        <button>Sign up</button>
      </Link> */}
      <div>
        {user ? (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/register")}>Register</button>
          </div>
        )}
      </div>
      <div className={Style.generalContainer} >
        <img src={Logo} className={Style.logoContainer} />
        <div className={Style.textContainer}>

          <h1 className={Style.light}>Welcome to </h1>
          <h1 className={Style.bold}>ChampionGear</h1>
          <hr className={Style.line} />
          <h2 className={Style.text}>¡The best deportive Clothes shop in the world!</h2>

        </div>

        <Link to="/home">
          <img src={Icono} className={Style.iconoContainer} />
        </Link>
      </div>
    </div>
  );
}

export default Landing;