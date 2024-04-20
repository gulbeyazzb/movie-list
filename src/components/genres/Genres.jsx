import React, { useEffect, useState } from "react";

import "./style.scss";
import useFetch from "../../hooks/useFetch";

const Genres = ({ id }) => {
  const { data, loading, error } = useFetch("i=" + id);

  return (
    <div className="genres">
      {data?.Genre?.split(",")?.map((g) => {
        if (!g) return;
        return (
          <div key={g} className="genre">
            {g}
          </div>
        );
      })}
    </div>
  );
};

export default Genres;
