import React from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu3.json";
function Rpatients() {
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
                <h1>List Of Patients</h1>
              </Card.Header>
              <Card.Body>
                <Table
                  id="datatable1"
                  className="table table-responsive table-striped dt-responsive nowrap table-hover "
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
                    <tr>
                      <td>0001</td>
                      <td>Shrikant Pandhekar</td>
                      <td>Male</td>
                      <td>7028357194</td>
                      <td>shrikantp9762@gmail.com</td>
                      <td className="text-center">
                        <Link to={"/receptionist/editpatient"}>
                          <Button variant="success" size="sm">
                            <i className="fa fa-edit" />
                          </Button>
                        </Link>{" "}
                        <Button variant="danger" size="sm">
                          <i className="fa fa-trash" />
                        </Button>{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>0001</td>
                      <td>Shrikant Pandhekar</td>
                      <td>Male</td>
                      <td>7028357194</td>
                      <td>shrikantp9762@gmail.com</td>
                      <td className="text-center">
                        <Link to={"/receptionist/editpatient"}>
                          <Button variant="success" size="sm">
                            <i className="fa fa-edit" />
                          </Button>
                        </Link>{" "}
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
    </>
  );
}

export default Rpatients;
