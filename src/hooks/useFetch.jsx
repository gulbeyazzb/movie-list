// const callApi = () => {
//   fetchData("s=" + search).then((res) => {
//     console.log(res.Search);
//     dispatch(setResponse(res));
//   });
// };

// useEffect(() => {
//   callApi();
// }, [page]);

import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);

    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went worng!");
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
