import React from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";

import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu3.json";
function Rdashboard() {
  return (
    <React.Fragment>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <div className="float-right mt-10">
                  <Link
                    to={"/receptionist/addapp"}
                    className="btn btn-primary btn-icon btn-rounded box-shadow"
                  >
                    <i className="fa fa-plus" /> Add New Appointment
                  </Link>
                </div>
                <h1>Today's Appointments</h1>
              </Card.Header>
              <Card.Body>
                <Table
                  id="datatable1"
                  className="table table-responsive table-striped dt-responsive nowrap table-hover"
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
                        <strong>Phone Number</strong>
                      </th>
                      <th className="text-center">
                        <strong>Gender</strong>
                      </th>
                      <th className="text-center">
                        <strong>Date</strong>
                      </th>
                      <th className="text-center">
                        <strong>Time</strong>
                      </th>
                      <th className="text-center">
                        <strong>Action</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td>0001</td>
                      <td>About us</td>
                      <td>Header Menu</td>
                      <td>Male</td>
                      <td>15/07/2018</td>
                      <td>7:30:00</td>
                      <td>
                        <Button variant="success" size="sm">
                          <i className="fa fa-check" />
                        </Button>
                        {"   "}
                        <Button variant="danger" size="sm">
                          <i className="fa fa-trash" />
                        </Button>{" "}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Rdashboard;
