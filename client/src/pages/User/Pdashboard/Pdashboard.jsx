import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
const API = "http://localhost:8000/api";

function Pdashboard() {
  const [profile, setProfile] = useState([]);
  const [numbers, setNumbers] = useState([]);

  const [appointments, setAppointments] = useState([]);

  const {
    _id,
    firstname,
    lastname,
    email,
    gender,
    isPatient,
    dob,
    mobile,
    address,
    appointment,
  } = profile;
  const { user, token } = isAuthenticated();

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
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
          // console.log(data);
        }

        if (!data.error) {
          setProfile(data);
          setAppointments(data.appointment);
        } else {
          setProfile([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };
    const getAppNumbers = async () => {
      try {
        // console.log(user);
        const response = await fetch(`${API}/user/numbers/${user._id}`, {
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
          console.log(data);
          setNumbers(data);
        }

        if (!data.error) {
          //setProfile(data);
          //setAppointments(data.appointment);
        } else {
          // setProfile([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };
    getUserProfileData();
    getAppNumbers();
  }, []);

  return (
    <React.Fragment>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row className="w-no-padding margin-b-30">
          <Col md="4">
            <div className="widget  bg-light">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Total Appointments</h2>
                  <p className="text-muted">Number </p>
                  <span className="float-right text-indigo widget-r-m">
                    {numbers.pending_appointment +
                      numbers.completed_appointment}
                  </span>
                </div>
              </Row>
            </div>
          </Col>
          <Col md="4">
            <div className="widget  bg-light">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Pending</h2>
                  <p className="text-muted">Total Pending Appointments</p>
                  <span className="float-right text-success widget-r-m">
                    {numbers.pending_appointment}
                  </span>
                </div>
              </Row>
            </div>
          </Col>
          <Col md="4">
            <div className="widget  bg-light">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Completed</h2>
                  <p className="text-muted">Total Completed Appointments</p>
                  <span className="float-right text-success widget-r-m">
                    {numbers.completed_appointment}
                  </span>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <h1>Upcoming's Appointment</h1>
        <br />
        <Row className="w-no-padding margin-b-30">
          <Col md="12">
            <table
              id="datatable"
              className="table table-striped nowrap dataTable no-footer dtr-inline table-responsive"
              width="100%"
            >
              <thead>
                <tr>
                  <th>
                    <strong>ID</strong>
                  </th>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Time</strong>
                  </th>
                  <th>
                    <strong>Status</strong>
                  </th>
                  <th>
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments &&
                  appointments.map(function (appointment, index) {
                    const { id, date, time, status, prescription } =
                      appointment;
                    let newDate = new Date();
                    let datedd = newDate.getDate();
                    let month = newDate.getMonth() + 1;
                    let year = newDate.getFullYear();

                    var todaydate = `${
                      datedd < 10 ? `0${datedd}` : `${datedd}`
                    }${month < 10 ? `0${month}` : `${month}`}${year}`;
                    var getdate = `${date.substring(2, 4)}-${date.substring(
                      0,
                      2
                    )}-${date.substring(4, 9)}`;
                    {
                      {
                        /* console.log(getdate); */
                      }
                      getdate = new Date(getdate);
                      console.log(date.substring(0, 2) == datedd);
                    }
                    if (
                      (getdate >= newDate || date.substring(0, 2) == datedd) &&
                      status === "pending"
                    ) {
                      return (
                        <tr key={index}>
                          <td>{id}</td>
                          {date ? (
                            <td>{`${date.substring(0, 2)}/${date.substring(
                              2,
                              4
                            )}/${date.substring(4, 9)}`}</td>
                          ) : (
                            <td>--/--/----</td>
                          )}
                          {time ? (
                            <td>{`${time.substring(0, 2)}:${time.substring(
                              2,
                              4
                            )}`}</td>
                          ) : (
                            <td>--:--</td>
                          )}
                          <td>
                            {status == "pending" ? (
                              <span className="label label-success w-20 p-2 ">
                                Pending
                              </span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>
                            {status == "approved" ? (
                              <Link to={`/user/viewprescription/${id}`}>
                                <button className="btn btn-primary submit-btn">
                                  View
                                </button>
                              </Link>
                            ) : (
                              <button
                                className="btn btn-primary submit-btn"
                                disabled
                              >
                                No prescription
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Pdashboard;
