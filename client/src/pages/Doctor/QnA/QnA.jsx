import React, { useState, useEffect } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth";
const API = "http://localhost:8000/api";

function QnA() {
  const { user, token } = isAuthenticated();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [questionsdata, setQuestionData] = useState([]);

  const { _id, question, email, answer, createdAt } = questionsdata;

  useEffect(() => {
    const getUserQuestionData = async () => {
      try {
        // console.log(user);
        const response = await fetch(`${API}/question/unanswered`, {
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
        }

        if (!data.error) {
          setQuestionData(data);
        } else {
          setQuestionData([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getUserQuestionData();
  }, []);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />

      <div className="main-content">
        <Row className="no-padding margin-b-30 ">
          <Col md="4">
            <div className="widget  bg-light">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Answered</h2>
                  <p className="text-muted">Total Answered Questions</p>
                  <span className="float-right text-primary widget-r-m">
                    23
                  </span>
                </div>
              </Row>
            </div>
          </Col>
          <Col md="4">
            <div className="widget  bg-light">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Unanswered</h2>
                  <p className="text-muted">Total Unanswered Questions</p>
                  <span className="float-right text-indigo widget-r-m">7</span>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <h1>Question And Answered</h1>
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
                    <strong>Question</strong>
                  </th>
                  <th>
                    <strong>Date</strong>
                  </th>
                  <th>
                    <strong>Action</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {questionsdata &&
                  questionsdata.map(function (que, index) {
                    const { _id, email, question, answer, createdAt } = que;

                    return (
                      <tr key={index}>
                        <td>{_id}</td>
                        <td>{email}</td>
                        <td>{question}</td>
                        <td>{createdAt}</td>
                        <td className="text-center">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={handleShow}
                          >
                            Answer
                          </Button>
                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Answer to question</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>{question}</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
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

export default QnA;
