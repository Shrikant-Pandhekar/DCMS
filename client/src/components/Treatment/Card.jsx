import React from "react";
import { Link } from "react-router-dom";
import "./css/card.css";

const Card = ({ imgsrc, treatmentData }) => {
  return (
    <div className="cards">
      <img src={imgsrc} alt="TW" srcset="" />
      <h1>{treatmentData.title}</h1>
      <p>{treatmentData.des}</p>
      <Link
        to={`/treatment/${treatmentData.title.replace(/ /g, "")}`}
        // to={"/services"}
      >
        <h3>Read More</h3>
      </Link>
    </div>
  );
};

export default Card;
