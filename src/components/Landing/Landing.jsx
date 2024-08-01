import React from "react";
import { Link } from "react-router-dom";
import Login from "../Login/Login";
import Style from "./Landing.module.css";

import Logo from "../../assets/Untitled-1-04.png";
import Icono from "../../assets/Untitled-1-05.png";
import singIN from "../../assets/singIn-20.png";
import singup from "../../assets/singUp-21.png";

//Login y register para lo que es inicio de sesion y autorizacion de terceros

const Landing = () => {
  return (
    <div>
      <div className={Style.generalContainer}>
        <img src={Logo} className={Style.logoContainer} />
        <div className={Style.textContainer}>
          <h1 className={Style.light}>Welcome to </h1>
          <h1 className={Style.bold}>ChampionGear</h1>
          <hr className={Style.line} />
          <h2 className={Style.text}>
            ¡The best deportive Clothes shop in the world!
          </h2>
        </div>
        <div className={Style.containerButtons}>
          <Link to="/Login">
            <button className={Style.menuButton}>
              Sign in
              <img src={singIN} alt="" className={Style.arrow} />
            </button>
          </Link>
          <Link to="/home">
            <img src={Icono} className={Style.iconoContainer} />
          </Link>
          <Link to="/register">
            <button className={Style.menuButton}>
              Sign up
              <img src={singup} alt="" className={Style.arrow} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
