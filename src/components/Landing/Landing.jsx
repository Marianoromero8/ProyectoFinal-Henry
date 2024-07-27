import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';

const Landing = () => {
  return (
    <div>
      <Link to="/Login">
      <button>Login</button>
      </Link>
      <Link to="/register">
      <button>Register</button>
      </Link>
      <h1>Welcome to ChampionGear</h1>
      <h2>¡The best deportive Clothes shop in the word!</h2>
      <Link to="/home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Landing;