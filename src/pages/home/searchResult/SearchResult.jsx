import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import MovieCard from "../../../components/movieCard/MovieCard";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { fetchData } from "../../../utils/api";
import Spinner from "../../../components/spinner/Spinner";

const SearchResult = () => {
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`s=${query}&page=${pageNum}`).then((res) => {
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
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.Search?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${
                  data?.totalResults > 1 ? "results" : "result"
                } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.Search?.length || []}
                next={fetchNextPageData}
                hasMore={pageNum <= Math.ceil(data?.totalResults / 10)}
                loader={<Spinner />}
              >
                {data?.Search.map((item, i) => {
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

export default SearchResult;
