import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Developing...</h1>
      <Link to="/Details">
        <button>Go to Details</button>
      </Link>
      <Link to="/AboutUs">
        <button>Go to AboutUs</button>
      </Link>
    </div>
  );
}

export default Home;