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
      <Link to="/Form">
        <button>Go to Form</button>
      </Link>
      <Link to="/Cart">
      <button>Cart</button>
      </Link>
    </div>
  );
}

export default Home;