import React from "react";
import { Link } from "react-router-dom";
import doc from "./img/doc.png";
import "./css/hero.css";
const Hero = () => {
  return (
    <>
      <div className="container">
        <div className="info">
          <div className="info1">
            <h4>Let Us</h4>
            <h2>Brighten Your</h2>
            <h1 className="blue">Smile Back !</h1>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
          <div className="appButton">
            <Link to="/signup">
              <button>
                Make Appointment{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </button>
            </Link>
          </div>
        </div>
        <div className="doc">
          <img src={doc} alt="doc" />
        </div>
      </div>
    </>
  );
};

export default Hero;
