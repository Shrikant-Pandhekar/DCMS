import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth";
import { useParams } from "react-router";
const API = "http://localhost:8000/api";
function arrayBufferToBase64(buffer) {
  var binary = "";
  //var bytes = new Uint8Array(buffer);
  var bytes = buffer;
  var len = bytes.length;
  //console.log(bytes);

  //console.log(len);
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  //console.log(window.btoa(binary));
  //console.log(binary);

  // return binary;
  return window.btoa(binary);
}

//Usage example:

function ViewPrescription() {
  const [profile, setProfile] = useState([]);
  let params = useParams();

  const [appointments, setAppointments] = useState([]);

  const {
    _id,
    firstname,
    lastname,
    email,
    gender,
    isPatient,
    dob,
    mobile,
    address,
    appointment,
  } = profile;

  useEffect(() => {
    const getUserProfileData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/user/${user._id}`, {
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
          setProfile(data);
          setAppointments(data.appointment);
        } else {
          setProfile([]);
        }
      } catch (error) {
        return console.log(error);
      }
    };

    getUserProfileData();
  }, []);

  return (
    <>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row>
          <Col md="12">
            <div className="widget bg-light ">
              <h1 className="text-center">Appointment Prescription</h1>
              <br />

              {appointments &&
                appointments.map(function (appointment, index) {
                  const {
                    id,
                    date,
                    time,
                    status,
                    prescription,
                    prescriptionImage,
                  } = appointment;

                  if (id == params.appId) {
                    var img, binarystring;
                    //console.log(prescriptionImage.data);
                    if (prescriptionImage) {
                      console.log("goint to function");
                      // binarystring = arrayBufferToBase64(
                      //   prescriptionImage.data
                      // );
                      //console.log(binarystring);
                      img = `data:image/jpeg;base64, ${prescriptionImage.data}`;
                    }
                    return (
                      <>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Appoint date</label>
                            <input
                              className="form-control"
                              type="text"
                              value={`${date.substring(0, 2)}/${date.substring(
                                2,
                                4
                              )}/${date.substring(4, 9)}`}
                              disabled
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Prescription</label>
                            <input
                              className="form-control"
                              type="text"
                              value={prescription}
                              disabled
                            />
                          </div>
                        </div>

                        {prescriptionImage.data != null ? (
                          <center>
                            <img
                              src={img}
                              alt="..."
                              width="500px"
                              height="500px"
                            />
                          </center>
                        ) : (
                          <h1>No Prescription Image Added by Doctor</h1>
                        )}
                      </>
                    );
                  }
                })}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ViewPrescription;
