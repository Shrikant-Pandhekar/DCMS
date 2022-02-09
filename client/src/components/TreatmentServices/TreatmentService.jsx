import React from "react";
import "./css/tratmentservice.css";

import Ser1 from "./img/S1.png";
import Ser2 from "./img/s2.jpeg";

function TreatmentService({ data, id }) {
  // console.log(data);
  // console.log(id);

  return (
    <div className="treser">
      <div className="tscontainer">
        <div className="tslogo">
          <img src={data.logo} alt="TW_Service" />
          <h1 className="servicename">{data.tname}</h1>
          <h6 className="tagline">{data.ttagline}</h6>
        </div>
        <div className="boxone">
          <div className="tsinfo">
            <h3>{data.tquestion1}</h3>
            <p>{data.tans1}</p>
          </div>
          <div className="tsimg">
            <img src={Ser2} alt="Service1" className="serviceimg" />
          </div>
        </div>
        <div className="boxtwo">
          <div className="tsinfo">
            <h3>{data.tquestion2}</h3>
            <p>{data.tans2}</p>
          </div>
          <div className="tsimg">
            <img src={Ser1} alt="Service2" className="serviceimg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentService;
