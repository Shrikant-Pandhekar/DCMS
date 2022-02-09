import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth";
const API = "http://localhost:8000/api";

function Pprofile() {
  const [profile, setProfile] = useState([]);

  const {
    firstname,
    lastname,
    email,
    gender,
    isPatient,
    dob,
    mobile,
    address,
  } = profile;

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/user/${user._id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        var datanow;

        if (response) {
          datanow = await response.json();
          console.log(datanow);
        }

        !datanow.error ? setProfile(datanow) : setProfile([]);
      } catch (error) {
        return console.log(error);
      }
    };

    getUserProfileData();
  }, []);

  return (
    <React.Fragment>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Row className="no-padding margin-b-30">
            <Col md="12">
              <div className="widget white-bg" style={{width:"800px"}}>
                <div className="padding-20 text-center">
                  <img
                    alt="Profile "
                    width={140}
                    className="rounded-circle mar-btm margin-b-10 circle-border "
                    src="/assets/img/avtar-2.png"
                  />
                  <p className="lead font-500 margin-b-0">
                    {firstname} {lastname}
                  </p>
                  <p className="text-muted">{isPatient}</p>
                 
                  <hr />
                </div>

                <Row>
                  <Col>
                    <small className="text-muted">DOB</small>
                    <p>{dob}</p>
                  </Col>
                  <Col>
                    <small className="text-muted">Gender</small>
                    <p>{gender}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <small className="text-muted">Email address </small>
                    <p>{email}</p>
                  </Col>
                  <Col>
                    <small className="text-muted">Phone</small>
                    <p>+91 {mobile}</p>
                  </Col>
                </Row>

                <small className="text-muted">Address</small>
                <p>{address}</p>
               
                <Link to={"/user/edit"}>
                  <button className="btn btn-youtube">
                    <i className="fa fa-edit" />
                  </button>
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Pprofile;
