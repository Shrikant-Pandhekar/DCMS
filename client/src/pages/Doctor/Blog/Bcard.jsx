import React from "react";
import "./css/bcard.css";
import BlogImg from "./img/blog2.jpg";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const API = "http://localhost:8000/api";

const Bcard = (props) => {
  const { _id, author, title, description, imgurl } = props;
  console.log(props);
  function refreshPage() {
    window.location.reload(true);
  }

  return (
    <>
      <div className="Bcard">
        <div className="blogimg">
          <img src={imgurl} alt="BlogImg" className="bimg" />
        </div>
        <div className="bdetails">
          <h6>
            <i className="fa fa-user" aria-hidden="true"></i> {author}
          </h6>
          <h6>
            <i className="fa fa-calendar" aria-hidden="true"></i> {props.bdate}
          </h6>
        </div>
        <div className="btitle">
          <h1>{title}</h1>
        </div>

        <div className="binfo">
          <Link to={"/doctor/editblog"}>
            <Button variant="success" size="sm">
              <i className="fa fa-edit" />
            </Button>
          </Link>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              const deleteResponse = fetch(`${API}/blog/delete/${_id}`, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
              if (deleteResponse) {
                refreshPage();
              }
            }}
          >
            <i className="fa fa-trash" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Bcard;
