import React from "react";
import "./css/treatment.css";
import Card from "./Card";
import TreatmentData from "./data/treatment.json";
import TW from "./img/Tw.png";
import Bridge from "./img/Bridge.png";
import Crowns from "./img/Crowns.png";
import Filling from "./img/Filling.png";
import Invi from "./img/Invi.png";
import RC from "./img/RC.png";

const TS = [TW, Bridge, Crowns, Filling, Invi, RC];

const Treatment = () => {
  return (
    <>
      <div class="containers">
        <h1 class="heading">
          We Are <span className="blue"> Offering </span> All Kind of
          <span className="imp"> Dental Treatment</span>
        </h1>

        <div class="box-container">
          {TS.map((src, index) => (
            <div class="boxs">
              <Card imgsrc={src} treatmentData={TreatmentData[index]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Treatment;
