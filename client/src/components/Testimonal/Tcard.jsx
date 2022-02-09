import React from "react";
import shri from "./img/shri.jpg";
import Rating from "./img/Rating.png";
import "./css/tcard.css";

const Tcard = (props) => {
  return (
    <>
      <div className="tcard">
        <div className="tdetails">
          <div className="pic">
            <img src={shri} alt="profile" className="pro" />
            <div className="tname">
              <h2>{props.tname}</h2>
              <img src={Rating} alt="Rating" className="rate" />
            </div>
          </div>
          <h6>{props.tdate}</h6>
        </div>
        <div className="cmt">
          <h4>{props.treview}</h4>
        </div>
      </div>
    </>
  );
};

export default Tcard;
