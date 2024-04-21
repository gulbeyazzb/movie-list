import React from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Data from "./data/Data";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Data />
    </div>
  );
};

export default Home;
