import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth";
import { Link } from "react-router-dom";
const API = "http://localhost:8000/api";

function UserAppointment() {
  const [profile, setProfile] = useState([]);

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

    getUserProfileData();
  }, []);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row>
          <Col md="12">
            <div className="widget bg-light ">
              <h1 className="text-center">Appointment History</h1>
              <br />
              <table
                id="datatable"
                className="table table-striped nowrap dataTable no-footer dtr-inline table-responsive"
                width="100%"
                style={{ display: "inline-table" }}
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
                      <strong>Precription</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments &&
                    appointments.map(function (appointment, index) {
                      const { id, date, time, status, prescription } =
                        appointment;

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
                            <span className="label label-success w-20 p-2 ">
                              {status}
                            </span>
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
                    })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserAppointment;
