import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Spinner from "../../../components/spinner/Spinner";
import MovieCard from "../../../components/movieCard/MovieCard";
import { fetchData } from "../../../utils/api";

const Data = () => {
  const [yearInput, setYearInput] = useState("");
  const response = useSelector((state) => state.home.response);
  const [data, setData] = useState(response);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const query = useSelector((state) => state.home.query);

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`s=${query}&page=${pageNum}`).then((res) => {
      console.log(res);
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchData(`s=${query}&page=${pageNum}`).then((res) => {
      if (data?.Search) {
        setData({
          ...data,
          Search: [...data?.Search, ...res.Search],
        });
      } else {
        setData(res);
      }
      setPageNum((prev) => prev + 1);
    });
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="dataResult">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Enter a year"
              onChange={(e) => setYearInput(e.target.value)}
            />
          </div>
          {data?.Search?.length > 0 ? (
            <>
              <InfiniteScroll
                className="content"
                dataLength={data?.Search?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= Math.ceil(data?.totalResults / 10)}
                loader={<Spinner />}
              >
                {yearInput.length > 0 &&
                  data?.Search.filter((d) => d.Year === yearInput).map(
                    (item, i) => {
                      return (
                        <MovieCard key={i} item={item} fromSearch={true} />
                      );
                    }
                  )}

                {yearInput.length === 0 &&
                  data?.Search.map((item, i) => {
                    return <MovieCard key={i} item={item} fromSearch={true} />;
                  })}
              </InfiniteScroll>
            </>
          ) : (
            <span className="resultNotFound">Sorry, Results not found!</span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default Data;
