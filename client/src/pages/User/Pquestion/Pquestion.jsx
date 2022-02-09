import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu2.json";
import { isAuthenticated } from "../../../auth/index";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API = "http://localhost:8000/api";
function Pquestion() {
  const { user, token } = isAuthenticated();

  const [details, setDetails] = useState({
    email: user.email,
    que: "",
  });
  const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState("");
  const navigate = useNavigate();
  const { email, que } = details;

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

  const onSubmit = async (event) => {
    try {
      event.preventDefault();

      var body = JSON.stringify(details);

      console.log(body);

      const response = await fetch(`${API}/question/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (response) {
        var data = await response.json();
        console.log(data);
        setSuccess(true);
        setSuccessmessege(data.success);
        setDetails({
          que: " ",
        });
        navigate("/user/question");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [questionsdata, setQuestionData] = useState([]);

  const { _id, question, answer, createdAt } = questionsdata;

  useEffect(() => {
    const getUserQuestionData = async () => {
      try {
        console.log(user);
        const response = await fetch(`${API}/question/${user._id}`, {
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

  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Question Post !!!",
        icon: "success",
        text: successmessege,
      });
    }
  }, [success, successmessege]);

  return (
    <React.Fragment>
      <Topbar />
      <MainSidebar data={Menu} />
      <PageHeader />
      <div className="main-content">
        <Row className="w-no-padding margin-b-30">
          <Col md="12">
            <div className="widget  bg-light">
              <h1>Post A Question</h1>
              <br />
              <form action="" method="post" onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="form-group">
                      <label>User Email</label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        id="email"
                        onChange={inputEvents}
                        value={user.email}
                        readOnly
                      />
                    </div>
                    <div className="form-group">
                      <label>Question</label>
                      <textarea
                        cols="50"
                        rows="8"
                        className="form-control"
                        name="que"
                        id="que"
                        onChange={inputEvents}
                      />
                    </div>
                  </div>
                </div>

                <div className="m-t-20 text-center">
                  <button
                    className="btn btn-primary submit-btn"
                    onClick={onSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>

        <Row className="white-bg no-padding margin-b-30">
          <Col md="12">
            <div className="widget  bg-light">
              <h1>Question History</h1>
              <br />
              <table
                id="datatable"
                className="table table-responsive table-striped nowrap dataTable no-footer dtr-inline "
                width="100%"
              >
                <thead>
                  <tr>
                    <th>
                      <strong>ID</strong>
                    </th>
                    <th>
                      <strong>Question</strong>
                    </th>
                    <th>
                      <strong>Answer</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questionsdata &&
                    questionsdata.map(function (que, index) {
                      const { _id, question, answer } = que;

                      return (
                        <tr key={index}>
                          <td>{_id}</td>
                          <td>{question}</td>
                          <td>{answer}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Pquestion;
