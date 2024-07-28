import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import Style from './Landing.module.css'

import Logo from '../../assets/Untitled-1-04.png'
import Icono from '../../assets/Untitled-1-05.png'

//Login y register para lo que es inicio de sesion y autorizacion de terceros

const Landing = () => {
  return (
    <div>
      {/* <Link to="/Login">
      <button>Sign in</button>
      </Link>
      <Link to="/register">
      <button>Sign up</button>
      </Link>  */}
      <div className={Style.generalContainer} >
        <img src={Logo} className={Style.logoContainer} />
        <div className={Style.textContainer}>

          <h1 className={Style.light}>Welcome to </h1>
          <h1 className={Style.bold}>ChampionGear</h1>
          <hr className={Style.line} />
          <h2 className={Style.text}>!The best deportive Clothes shop in the word!</h2>

        </div>

        <Link to="/home">
          <img src={Icono} className={Style.iconoContainer} />
        </Link>
      </div>
    </div>
  );
}

export default Landing;