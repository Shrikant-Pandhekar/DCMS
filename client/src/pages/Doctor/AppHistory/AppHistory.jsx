import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth";

const API = "http://localhost:8000/api";

function AppHistory() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/admin/appointment/all`, {
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
          //console.log(data);
        }

        if (!data.error) {
          setUsers(data);
          //console.log(data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <h1>Appointments</h1>
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
                    <strong>Name</strong>
                  </th>
                  <th>
                    <strong>Phone Number</strong>
                  </th>
                  <th>
                    <strong>Gender</strong>
                  </th>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Time</strong>
                  </th>
                  <th>
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map(function (user, index) {
                    console.log(user);
                    const {
                      _id,
                      firstname,
                      lastname,
                      mobile,
                      gender,
                      appointment,
                    } = user;
                    return (
                      appointment &&
                      appointment.map(function (aaa, index) {
                        const { id, status, date, time } = aaa;
                        console.log(aaa);

                        return (
                          <tr key={index}>
                            <td>{id}</td>
                            <td>
                              <img
                                alt="user"
                                className="media-box-object rounded-circle mr-2"
                                src="/assets/img/avtar-2.png"
                                width={30}
                              />
                              {firstname + " " + lastname}
                            </td>
                            <td>{mobile}</td>
                            <td>{gender}</td>
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
                            <td className="text-center">
                              <span className="label label-success">
                                {status}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                    );
                  })}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default AppHistory;
