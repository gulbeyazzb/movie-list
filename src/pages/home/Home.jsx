import React from "react";
import "./style.scss";
import SearchResult from "./searchResult/SearchResult";
import HeroBanner from "./heroBanner/HeroBanner";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <SearchResult />
    </div>
  );
};

export default Home;
