import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";
import useFetch from "../../hooks/useFetch";

const CircleRating = ({ id }) => {
  const { data, loading, error } = useFetch("i=" + id);

  return (
    <div className="circleRating">
      <CircularProgressbar
        value={data?.imdbRating}
        maxValue={10}
        text={data?.imdbRating}
        styles={buildStyles({
          pathColor:
            data?.imdbRating < 5
              ? "red"
              : data?.imdbRating < 7
              ? "orange"
              : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
