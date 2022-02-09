import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
import { isAuthenticated } from "../../../auth/index";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

function Precription() {
  let params = useParams();
  let prescriptionImage;
  const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState(" ");
  const navigate = useNavigate();

  console.log(params);
  const { user, token } = isAuthenticated();
  const [details, setDetails] = useState({
    appointmentId: params.appId,
    prescription: "",
  });

  const [patients, setPatients] = useState([]);
  const { firstname, lastname, gender, mobile, email } = patients;
  const { appointmentId, prescription } = details;

  console.log(details);

  const inputEvents = (event) => {
    const { name, value } = event.target;

    setDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleNewImage = (name) => (event) => {
    console.log(event.target.files[0]);
    setDetails({ ...details, [name]: event.target.files[0] });
  };

  try {
    const response = fetch(`${API}/usernoauth/${params.userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    var data;

    if (response) {
      data = response.json();
      console.log(data);
      // alert(data);
    }
  } catch (error) {
    console.log(error);
  }

  const addPrescriptionDatabase = async (userId, appId, developer) => {
    try {
      let formData = new FormData();

      formData.append("appointmentId", appId);
      formData.append("prescription", developer.prescription);
      formData.append("prescriptionImage", developer.prescriptionImage);

      const response = await axios.post(
        `${API}/admin/addprescription/${userId}/`,
        formData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response) {
        console.log(response);
        return response;
      }
    } catch (error) {
      console.log(error.response);
      return error.response;
    }
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      setDetails({ ...details });

      const response = await addPrescriptionDatabase(
        params.userId,
        params.appId,
        { ...details }
      );

      if (response.status === 201) {
        //console.log('Done Submit PRr');
        setSuccessmessege("Successful");
        setSuccess(true);
        //setValues({ ...values, name:'', email:'', facebook:'', instagram:'', linkedin:'' })
        navigate("/doctor/dashboard");
      }

      if (response.data.error) {
        console.log(response.data.error);
        //setError(response.data.error)
      } else {
        //setSuccess(false);
      }
    } catch (error) {
      console.log("Error in adding developer...");
    }
  };

  useEffect(() => {
    const getPatientsData = async () => {
      try {
        const { user, token } = isAuthenticated();

        // console.log(user);
        const response = await fetch(`${API}/admin/patient/${params.userId}`, {
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
          // console.log(data[0]);
        }

        if (!data.error) {
          setPatients(data[0]);
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
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Prescription Sent to User !",
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
        <div className="widget  bg-light">
          <h1>Precription</h1>
          <br />
          <br />
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label>Patient Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  value={firstname + " " + lastname}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <label>Gender</label>
                <input
                  className="form-control"
                  type="text"
                  name="gender"
                  id="gender"
                  value={gender}
                  disabled
                />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <label>mobile</label>
                <input
                  className="form-control"
                  type="text"
                  value={mobile}
                  disabled
                />
              </div>
            </div>
          </div>

          <form method="post" enctype="multipart/form-data">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>App Id</label>
                  <input
                    className="form-control"
                    type="text"
                    name="appointmentId"
                    id="appointmentId"
                    onChange={inputEvents}
                    value={params.appId}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Related Photo</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/x-png,image/gif,image/jpeg , application/pdf,application/vnd.ms-excel"
                    onChange={handleNewImage("prescriptionImage")}
                    value={prescriptionImage}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <label>Suggestion</label>
                  <textarea
                    cols="50"
                    rows="5"
                    className="form-control"
                    name="prescription"
                    id="prescription"
                    onChange={inputEvents}
                    value={prescription}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="m-t-20 text-center">
              <button className="btn btn-primary submit-btn" onClick={onSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Precription;
