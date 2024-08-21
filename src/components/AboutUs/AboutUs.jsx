import React from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

import style from "./AboutUs.module.css";
import Icono from "../../assets/iconos-11.png";
import Logo from "../../assets/Untitled-1-10.png";
import icon1 from "../../assets/icoosAbout-06.png";
import icon2 from "../../assets/icoosAbout-07.png";
import icon3 from "../../assets/icoosAbout-08.png";
import icon4 from "../../assets/icoosAbout-09.png";

import nahuel from "../../assets/fotos/nahuel.jpg";
import shirley from "../../assets/fotos/shirley.jpeg";
import marian from "../../assets/fotos/marian.jpg";
import gonza from "../../assets/fotos/gonza.jpg";
import blue from "../../assets/fotos/blue.jpg";

const AboutUs = () => {
  return (
    <div className={style.containerGeneral}>
      <div className={style.aboutChaContainer}>
        <div>
          <img src={Logo} className={style.logoContainer} />
        </div>
        <div className={style.aboutChaContainerText}>
          <h1 className={style.h1We}>
            {" "}
            Welcome to <strong>ChampionGear!</strong>{" "}
          </h1>
          <p className={style.parrafo}>
            At championGear, we are passionate about sports and fashion,
            offering the best of both worlds. Our online store brings you
            quality, style, and performance in every garment.
          </p>
          <h1 className={style.h1We}>
            <strong> Why Choose Us?</strong>
          </h1>
          <div className={style.containerWhy}>
            <div className={style.containerWhyIcons}>
              <img src={icon1} alt="" className={style.icons} />
              <p className={style.parrafo}>Superior Quality</p>
            </div>
            <div className={style.containerWhyIcons}>
              <img src={icon2} alt="" className={style.icons} />
              <p className={style.parrafo}>Innovation</p>
            </div>

            <div className={style.containerWhyIcons}>
              <img src={icon3} alt="" className={style.icons} />
              <p className={style.parrafo}>Variety and Style</p>
            </div>

            <div className={style.containerWhyIcons}>
              <img src={icon4} alt="" className={style.icons} />
              <p className={style.parrafo}>Commitment</p>
            </div>
          </div>
          <h1 className={style.h1We}>
            <strong>Our Mission </strong>
          </h1>
          <p className={style.parrafo}>
            We aim to inspire you to reach your fitness goals, whether you're a
            beginner or an athlete, by providing the right gear.
          </p>
        </div>
      </div>

      <div className={style.containerAbouTeam}>
        <h1 className={style.h1We}>
          <strong> ABOUT THE TEAM</strong>
        </h1>
        <p className={style.parrafoTeam}>
          We are a full stack development team committed to creating
          comprehensive solutions that span from user interface design to server
          and database development. Our holistic approach ensures that each
          project is executed smoothly and efficiently, meeting the highest
          standards
        </p>

        <div className={style.containerPerfilesGeneral}>
          <div className={style.perfilesBack}>
            <p>BackEnd</p>
            <div>
              <img src={nahuel} className={style.perfilesImg} />

              <img src={shirley} className={style.perfilesImg} />
              <img
                src="https://e1.pngegg.com/pngimages/976/873/png-clipart-orb-os-x-icon-man-s-profile-icon-inside-white-circle.png"
                className={style.perfilesImg}
              />
            </div>
          </div>
          <div className={style.perfilesFront}>
            <div>
              <img src={marian} className={style.perfilesImg2} />
              <img src={gonza} className={style.perfilesImg2} />
              <img src={blue} className={style.perfilesImg2} />
            </div>
            <p>FrontEnd</p>
          </div>
        </div>
        <p className={style.parrafo3}>
          <strong>
            Thank you for choosing ChampionGear. Let’s move towards a more
            active and healthier life together!
          </strong>
        </p>
        <Link to="/Home">
          <img src={Icono} className={style.iconoContainer} />
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
