import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import "./css/testimonialReview.css";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth";

import Swal from "sweetalert2";

const API = "http://localhost:8000/api";
function refreshPage() {
  window.location.reload(true);
}
function PendingReview() {
  const [reviews, setReviews] = useState([]);
  const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState(" ");

  useEffect(() => {
    const getReviewsData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/review/pending/all`, {
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
          setReviews(data);
          console.log(data);
        } else {
          setReviews([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getReviewsData();
  }, []);

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Appointment !",
        icon: "success",
        text: successmessege,
      });
    }
  }, [success, successmessege]);
  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row className="no-padding margin-b-30 test ">
          <Col md="4" className="styleTesti">
            <div className="widget  bg-light cardSize">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Approved</h2>
                  <p className="text-muted">Total Approved</p>
                  <span className="float-right text-indigo widget-r-m">10</span>
                </div>
              </Row>
            </div>
          </Col>
          <Col md="4" className="styleTesti">
            <div className="widget  bg-light cardSize">
              <Row className="row-table ">
                <div className="margin-b-50">
                  <h2 className="margin-b-5">Pending</h2>
                  <p className="text-muted">Total Pending</p>
                  <span className="float-right text-success widget-r-m">0</span>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
        <h1>Testimonials</h1>
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
                    <strong>Description</strong>
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
                {reviews &&
                  reviews.map(function (review, index) {
                    const { _id, username, message, createdAt } = review;

                    return (
                      <tr key={index}>
                        <td>1</td>
                        <td>{username}</td>
                        <td>{message}</td>
                        <td>{createdAt}</td>
                        <td className="text-center">
                          <button
                            variant="success"
                            size="sm"
                            onClick={() => {
                              const { user, token } = isAuthenticated();
                              const response = fetch(
                                `${API}/review/update/${_id}`,
                                {
                                  method: "PUT",
                                  headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                  },
                                }
                              );
                              setSuccess(true);
                              setSuccessmessege("Review Approved");
                              refreshPage();
                            }}
                          >
                            <i className="fa fa-check" />{" "}
                          </button>
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

export default PendingReview;
