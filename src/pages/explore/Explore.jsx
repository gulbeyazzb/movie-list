import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";
import { fetchData } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import { useSelector } from "react-redux";

const Explore = () => {
  const [data, setData] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { type } = useParams();
  console.log("data", data, "type", type);
  const fetchInitialData = () => {
    setLoading(true);
    fetchData(`s=Pokemon&type=${type}&page=${pageNum}`).then((res) => {
      setData(res);
      setPageNum((prev) => prev + 1);
      setLoading(false);
    });
  };

  const fetchNextPageData = () => {
    fetchData(`s=Pokemon&page=${pageNum}`).then((res) => {
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
  }, [type]);

  return (
    <div className="exploreResult">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.Search?.length > 0 ? (
            <>
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

export default Explore;
