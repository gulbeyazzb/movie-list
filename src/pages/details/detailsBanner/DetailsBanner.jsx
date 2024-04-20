import React, { useState } from "react";
import dayjs from "dayjs";

import "./style.scss";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";

const DetailsBanner = ({ id }) => {
  const [show, setShow] = useState(false);

  const { data, loading } = useFetch(`i=${id}`);

  return (
    <div className="detailsBanner">
      {!loading ? (
        <>
          {!!data && (
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={data?.Poster} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                    {data?.Poster ? (
                      <Img className="posterImg" src={data?.Poster} />
                    ) : (
                      <Img className="posterImg" src={data?.Poster} />
                    )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {`${data?.Title} (${dayjs(data?.Year).format("YYYY")})`}
                    </div>

                    <Genres id={data?.imdbID} />

                    <div className="row">
                      <CircleRating id={data?.imdbID} />
                    </div>

                    <div className="overview">
                      <div className="heading">Overview</div>
                      <div className="description">{data?.Plot}</div>
                    </div>

                    <div className="info">
                      {data?.Released && (
                        <div className="infoItem">
                          <span className="text bold">Release Date: </span>
                          <span className="text">
                            {dayjs(data?.Released).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data?.Runtime && (
                        <div className="infoItem">
                          <span className="text bold">Runtime: </span>
                          <span className="text">{data?.Runtime}</span>
                        </div>
                      )}
                    </div>

                    <div className="info">
                      <span className="text bold">Director: </span>
                      <span className="text">
                        <span>{data?.Director}</span>
                      </span>
                    </div>

                    <div className="info">
                      <span className="text bold">Writer: </span>
                      <span className="text">
                        <span>{data?.Writer}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>
          )}
        </>
      ) : (
        <div className="detailsBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
      )}
    </div>
  );
};

export default DetailsBanner;
