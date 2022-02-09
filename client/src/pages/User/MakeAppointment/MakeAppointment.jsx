import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import ms from "ms";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const API = "http://localhost:8000/api";

const MakeAppointment = () => {
  const [profile, setProfile] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState("");
  const navigate = useNavigate();

  const { firstname, lastname, gender, mobile } = profile;

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

        var data;

        if (response) {
          data = await response.json();
        }

        if (!data.error) {
          setProfile(data);
        } else {
          setProfile([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getUserProfileData();
  }, []);

  // Make An Appointment

  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });

  console.log(formData);

  const handleChange = (name) => (event) => {
    if (name === "date") {
      var wholedate = event.target.value;
      var year = wholedate.substring(0, 4);
      var month = wholedate.substring(5, 7);
      var day = wholedate.substring(8, 10);
      wholedate = day + month + year;
      setFormData({ ...formData, [name]: wholedate });
    }

    if (name === "time") {
      var wholetime = event.target.value;
      var mintime = document.querySelector("#time").getAttribute("min");
      var maxtime = document.querySelector("#time").getAttribute("max");
      if (mintime < wholetime && wholetime < maxtime) {
        var hour = wholetime.substring(0, 2);
        var min = wholetime.substring(3, 5);
        wholetime = hour + min;
        setFormData({ ...formData, [name]: wholetime });
      }
    }
  };

  const onSumbit = async (event) => {
    event.preventDefault();
    if (formData.time === "") {
      alert("Plaese Enter time Between 9:00 AM to 18:00 PM");
    } else {
      try {
        const { user, token } = isAuthenticated();

        var body = {
          date: formData.date,
          time: formData.time,
        };

        const response = await fetch(
          `${API}/user/makeappointment/${user._id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify(body),
          }
        );

        var data;

        if (response) {
          data = await response.json();
          console.log(data);
          if (data.success) {
            setSuccess(true);
            setSuccessmessege(data.success);
            navigate("/user/appointments");
          }
          // <Redirect to="/user/appointments" />
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Appointment !",
        icon: "success",
        text: successmessege,
      });
    }
  }, [success, successmessege]);
  let newDate = new Date();
  let datedd = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  var todaydate = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    datedd < 10 ? `0${datedd}` : `${datedd}`
  }`;
  // console.log(todaydate);
  const minsec = ms("14d");
  // console.log("minsec", minsec);
  const max_date = new Date(+new Date(todaydate) + minsec);
  let datedd1 = max_date.getDate();
  let month1 = max_date.getMonth() + 1;
  let year1 = max_date.getFullYear();
  const new_max_date = `${year1}-${month1 < 10 ? `0${month1}` : `${month1}`}-${
    datedd1 < 10 ? `0${datedd1}` : `${datedd1}`
  }`;
  // console.log(new_max_date);
  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div
        className="main-content"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col md="6">
          <div className="widget bg-light ">
            <h1 className="text-center">Book Appointment</h1>
            <br />
            <form>
              <div className="row">
                {firstname ? (
                  <>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={firstname ? firstname : "Firstname"}
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {lastname ? (
                  <>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={lastname ? lastname : "Firstname"}
                          readOnly
                        />
                      </div>
                    </div>
                  </>
                ) : null}
                {mobile ? (
                  <>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label>
                          Mobile No. <span className="text-danger">*</span>
                        </label>
                        <div className="cal-icon">
                          <input
                            type="text"
                            className="form-control"
                            value={mobile}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                {gender ? (
                  <>
                    <div className="col-sm-6">
                      <div className="form-group gender-select">
                        <label className="gen-label">Gender : </label> <br />
                        <div className="cal-icon">
                          <input
                            type="text"
                            name="gender"
                            className="form-control"
                            value={gender}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Date </label>
                    <input
                      className="form-control date-picker"
                      type="date"
                      min={todaydate}
                      max={new_max_date}
                      onChange={handleChange("date")}
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <label>Time </label>
                    <input
                      className="form-control time"
                      type="time"
                      name="time"
                      id="time"
                      min="09:00"
                      max="18:00"
                      onChange={handleChange("time")}
                    />
                    <p className="text-muted text-danger">
                      Plaese Enter time Between 9:00 AM to 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
              <br />
              <div className="m-t-20 text-center">
                <button
                  className="btn btn-primary submit-btn"
                  onClick={onSumbit}
                >
                  Make An Appointment
                </button>
              </div>
            </form>
          </div>
        </Col>
      </div>
    </>
  );
};

export default MakeAppointment;
