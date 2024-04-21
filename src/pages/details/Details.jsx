import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
const Details = () => {
  const { type, id } = useParams();
  const { data, loading, error } = useFetch("i=" + id);

  return (
    <div>
      <DetailsBanner id={id} />
      <Cast data={data?.Actors} loading={loading} />
    </div>
  );
};

export default Details;
