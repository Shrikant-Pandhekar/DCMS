import React from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
function Peditprofile() {
  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row className="no-padding margin-b-30 d-flex justify-content-center ">
          <Col md="8" className="d-flex justify-content-center">
            <div className="widget bg-light">
              <h1>Edit Patient Details</h1>
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

                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        value="terrybaker@example.com"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <div className="cal-icon">
                        <input
                          type="text"
                          className="form-control datetimepicker"
                        />
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
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="form-group">
                          <label>Address</label>
                          <input
                            type="text"
                            className="form-control"
                            value="555 Front St #APT 2H, Hempstead"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Phone </label>
                      <input
                        className="form-control"
                        type="text"
                        value="3761506975"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Avatar</label>
                      <div className="profile-upload">
                        <div className="upload-img">
                          <img alt="dfgdf" src="assets/img/user.jpg" />
                        </div>
                        <div className="upload-input">
                          <input type="file" className="form-control" />
                        </div>
                      </div>
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
    </>
  );
}

export default Peditprofile;
