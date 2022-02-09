import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./css/testimonialReview.css";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth";
const API = "http://localhost:8000/api";
function ApprovedReview() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviewsData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/review/approved/all`, {
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

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
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
                </tr>
              </thead>
              <tbody>
                {reviews &&
                  reviews.map(function (review, index) {
                    const { username, message, createdAt } = review;

                    return (
                      <tr key={index}>
                        <td>1</td>
                        <td>{username}</td>
                        <td>{message}</td>
                        <td>{createdAt}</td>
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

export default ApprovedReview;
