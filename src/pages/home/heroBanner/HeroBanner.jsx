import React, { useEffect, useState } from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setResponse, setSearchQuery } from "../../../store/homeSlice";
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const [backgroundImg, setBackgroundImg] = useState(
    "https://m.media-amazon.com/images/M/MV5BMDkxNzRmNDYtMDY0OS00N2JhLTkzZWUtMWE3MzZkNDk1MmJiXkEyXkFqcGdeQXVyNTA3MTU2MjE@._V1_SX300.jpg"
  );
  const [query, setQuery] = useState("Pokemon");
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("s=" + query);
  const dispatch = useDispatch();

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
    if (query.length === 0) {
      setQuery("Pokemon");
    }
  };

  useEffect(() => {
    dispatch(setResponse(data?.Search));
    const bg = data?.Search?.[Math.floor(Math.random() * 10)]?.Poster;
    setBackgroundImg(bg);
  }, [data]);

  useEffect(() => {
    dispatch(setSearchQuery(query));
  }, [query]);

  return (
    <div className="hero-banner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={backgroundImg} className="lazy-load-image-background" />
        </div>
      )}

      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="hero-banner-content">
          <span className="title">Welcome</span>
          <span className="subtitle">
            Millions of Movies, TV Shows and people to discover. Explore now
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or tv show..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
