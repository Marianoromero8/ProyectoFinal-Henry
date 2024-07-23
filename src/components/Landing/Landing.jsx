import React from 'react';
import { Link } from 'react-router-dom';

const Landingpage = () => {
  return (
    <div>
      <h1>Welcome to ChampionGear</h1>
      <Link to="/home">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Landingpage;