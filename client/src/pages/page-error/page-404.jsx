import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./index.scss";

class Page404 extends React.Component {
  render() {
    return (
      <div className="page-error align-middle">
        <div className="misc-wrapper">
          <div className="misc-content">
            <Container>
              <Row className="justify-content-center">
                <Col sm={6}>
                  <div className="misc-box text-center">
                    <h1 className="text-muted fs-large">404</h1>
                    <h4 className="font-300">
                      We're sorry, but the page you were looking for doesn't
                      exist.
                    </h4>
                    <Link
                      to="/"
                      className="btn btn-lg btn-primary btn-rounded box-shadow mt-10"
                    >
                      Back to home
                    </Link>
                  </div>
                  <div className="text-center misc-footer">
                    <p>Copyright © 2022 UpSite Digital Solution </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default Page404;
