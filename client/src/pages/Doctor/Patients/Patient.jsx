import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth";
const API = "http://localhost:8000/api";

function Patient() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const getPatientsData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/admin/patient/all`, {
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
          setPatients(data);
          console.log(data);
        } else {
          setPatients([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getPatientsData();
  }, []);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <h1>Patients</h1>
              </Card.Header>
              <Card.Body>
                <Table
                  id="datatable1"
                  className="table table-striped dt-responsive nowrap table-hover table-responsive"
                >
                  <thead>
                    <tr>
                      <th className="text-center">
                        <strong>ID</strong>
                      </th>
                      <th className="text-center">
                        <strong>Name</strong>
                      </th>
                      <th className="text-center">
                        <strong>Gender</strong>
                      </th>
                      <th className="text-center">
                        <strong>Phone NUmber</strong>
                      </th>
                      <th className="text-center">
                        <strong>Email</strong>
                      </th>
                      <th className="text-center">
                        <strong>Action</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients &&
                      patients.map(function (patient, index) {
                        const { firstname, lastname, gender, mobile, email } =
                          patient;

                        return (
                          <tr key={index}>
                            <td>1</td>
                            <td>{firstname + " " + lastname}</td>
                            <td>{gender}</td>
                            <td>{mobile}</td>
                            <td>{email}</td>
                            <td className="text-center">
                              <Link to={"/doctor/editpatient"}>
                                <Button variant="success" size="sm">
                                  <i className="fa fa-edit" />
                                </Button>
                              </Link>{" "}
                              <Button variant="danger" size="sm">
                                <i className="fa fa-trash" />
                              </Button>{" "}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Patient;
