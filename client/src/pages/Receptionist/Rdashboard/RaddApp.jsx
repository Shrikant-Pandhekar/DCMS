import React from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu3.json";
function RaddApp() {
  return (
    <React.Fragment>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col md="10">
            <div className="widget bg-light ">
              <h1 className="text-center">Book Appointment</h1>
              <br />
              <form>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input className="form-control" type="text" value="Terry" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input className="form-control" type="text" value="Baker" />
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <div className="cal-icon">
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group gender-select">
                      <label className="gen-label">Gender: </label> <br />
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="gender"
                            className="form-check-input"
                            checked
                          />
                          Male
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            name="gender"
                            className="form-check-input"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Date </label>
                      <input className="form-control date-picker" type="date" />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Time </label>
                      <input className="form-control time" type="time" />
                    </div>
                  </div>
                </div>
                <div className="m-t-20 text-center">
                  <button className="btn btn-primary submit-btn">Save</button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default RaddApp;
