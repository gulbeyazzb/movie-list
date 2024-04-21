import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";

const Cast = ({ data, loading }) => {
  const skeleton = () => {
    return (
      <div className="skItem">
        <div className="circle skeleton"></div>
        <div className="row skeleton"></div>
        <div className="row2 skeleton"></div>
      </div>
    );
  };
  console.log(data);
  return (
    <div className="castSection">
      <ContentWrapper>
        <div className="sectionHeading">Actors</div>
        {!loading ? (
          <div className="listItems">
            {data?.split(",")?.map((item) => {
              return (
                <div key={item.id} className="listItem">
                  <div className="profileImg">
                    <Img src={avatar} />
                  </div>
                  <div className="name">{item}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="castSkeleton">
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
            {skeleton()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Cast;
