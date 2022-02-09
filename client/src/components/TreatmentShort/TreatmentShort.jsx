import React from "react";
import "./css/treatmentshort.css";

function TreatmentShort({ data, id }) {
  return (
    <div className="treatshot">
      <div className="treatshotcontainer">
        <div className="treatshotinfo">
          <h6>Our Advanced Technology</h6>
          <h1>{data.tname}</h1>
          <p>{data.tdesc}</p>
        </div>
        <div className="treatshotfaq">
          <h3>FAQ's</h3>
          <ul>
            <li>
              {data.faq[0].faq1}{" "}
              <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            </li>
            <li>
              {data.faq[1].faq2}{" "}
              <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            </li>
            <li>
              {data.faq[2].faq3}{" "}
              <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            </li>
            <li>
              {data.faq[3].faq4}{" "}
              <i class="fa fa-chevron-circle-right" aria-hidden="true"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TreatmentShort;
