import React from "react";
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

const Form = () => {
  return (
    <div>
      <h1>Developing...ㅤㅤㅤ<Loader />
      </h1> 
      <Link to="/Home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Form;