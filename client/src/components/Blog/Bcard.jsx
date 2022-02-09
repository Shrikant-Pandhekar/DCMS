import React from "react";
import { Link } from "react-router-dom";
import "./css/bcard.css";

const Bcard = (props) => {
  return (
    <>
      <div className="Bcard">
        <div className="blogimg">
          <img src={props.data.imgurl} alt="BlogImg" className="bimg" />
        </div>
        <div className="bdetails">
          <h6>
            <i class="fa fa-user" aria-hidden="true"></i> {props.data.author}
          </h6>
          <h6>
            <i class="fa fa-calendar" aria-hidden="true"></i>{" "}
            {props.data.createdAt.substr(0, 10)}
          </h6>
        </div>
        <div className="btitle">
          <h1>{props.data.title}</h1>
        </div>
        <div className="binfo">
          <Link to={`/blog/${props.data.title}`}>
            <h5>
              Read More{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Bcard;
