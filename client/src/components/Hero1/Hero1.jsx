import React from "react";
import "./css/hero1.css";
import doc2 from "./img/doc2.jpg";
import { Link } from "react-router-dom";

const Hero1 = () => {
  return (
    <>
      <div className="hcontainer">
        <div className="hcontent">
          <h1>
            Choose Our Clinic, Choose the 
            <span className="blue"> Best Care</span> For Yourself and Your Family
          </h1>
        </div>
        <div className="hdetails">
          <div className="doc2">
            <img src={doc2} alt="doctor 2" />
          </div>
          <div className="doc2info">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. Lorem Ipsum is
              simply dummy text of the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </p>
            <Link to={"/about"}><button>Read More</button></Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero1;
