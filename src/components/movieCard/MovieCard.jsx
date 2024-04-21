import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const MovieCard = ({ item, fromSearch, mediaType }) => {
  const navigate = useNavigate();
  const posterUrl = item.Poster;

  return (
    <div
      className="movieCard"
      onClick={() => navigate(`/${item.Type}/${item.imdbID}`)}
    >
      <div className="posterBlock">
        <Img className="posterImg" src={posterUrl} />
        <CircleRating id={item.imdbID} />
        <Genres id={item.imdbID} />
      </div>
      <div className="textBlock">
        <span className="title">{item.Title}</span>
        <span className="date">{dayjs(item.Year).format("YYYY")}</span>
      </div>
    </div>
  );
};

export default MovieCard;
