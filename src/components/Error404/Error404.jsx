import React from "react";
import { Link } from "react-router-dom";

import style from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={style.containerError}>
      <h1>404 - Página no encontrada</h1>
      <p>I'm sorry, the page you are looking for does not exist.</p>
      <Link to="/home">
        <button className={style.containerErrorlink}>BACK</button>
      </Link>
    </div>
  );
};

export default Error404;
