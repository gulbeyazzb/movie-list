import React, { ref } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";

import "./style.scss";
import dayjs from "dayjs";
import Img from "../../../components/lazyLoadImage/Img";
import CircleRating from "../../../components/circleRating/CircleRating";
import Genres from "../../../components/genres/Genres";
import { Navigate, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const data = useSelector((state) => state.home?.response);
  const navigate = useNavigate();
  const goDetails = (item) => {
    const id = item?.imdbID;
    const type = item?.Type;

    navigate(`/${type}/${id}`);
  };

  return (
    <div className="resultContainer">
      <ContentWrapper>
        <div className="items">
          {data?.map((item, i) => {
            return (
              <div key={i} className="item" onClick={() => goDetails(item)}>
                <div className="posterBlock">
                  <Img src={item?.Poster} />
                  <CircleRating id={item?.imdbID} />
                  <Genres id={item?.imdbID} />
                </div>
                <div className="textBlock">
                  <span className="title">{item?.Title}</span>
                  <span className="date">
                    {dayjs(item?.Year).format("YYYY")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SearchResult;
