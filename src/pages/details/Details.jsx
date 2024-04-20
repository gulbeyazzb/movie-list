import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
const Details = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch("i=" + id);

  return (
    <div>
      <DetailsBanner id={id} />
      <Cast data={data?.Actors} loading={loading} />
      {/* <Similar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} /> */}{" "}
    </div>
  );
};

export default Details;
