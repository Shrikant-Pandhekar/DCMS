import React from "react";
import { Link } from "react-router-dom";
import "./css/appointment.css";
import doc3 from "./img/Sche.png";

const Appointment = () => {
  return (
    <>
      <div className="appcontainer">
        <div className="appbox">
          <div className="appdetails">
            <h1>
              Book Your <br />
              First <span className="blue ftext">Appointment</span>
            </h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <Link to="/signup">
              <button>Book An Appointment</button>
            </Link>
          </div>
          <div className="appdoc">
            <img src={doc3} alt="chk" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
