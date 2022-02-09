import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";
import { Row, Col } from "react-bootstrap";
import Topbar from "../../../components/topbar";
import MainSidebar from "../../../components/main-sidebar";
import PageHeader from "../../../components/page-header";
import Menu from "../../../data/menu.json";
const API = "http://localhost:8000/api";

try {
  const response = fetch(`${API}/admin/numbers`, {
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
    alert(data);
  }
} catch (error) {
  console.log(error);
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      todayAppointmentUsers: [],
      DataisLoaded: false,
    };
  }

  // ComponentDidMount is used to
  // execute the code
  componentDidMount() {
    fetch(`${API}/admin/numbers`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          items: json,
          DataisLoaded: true,
        });
      });
    fetch(`${API}/admin/appointment/today`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          todayAppointmentUsers: json,
          DataisLoaded: true,
        });
      });
  }

  render() {
    const { DataisLoaded, items, todayAppointmentUsers } = this.state;
    console.log(todayAppointmentUsers);
    //console.log(items.appointmencount[0]);

    var pending_count = 0;
    function increse_pending_count() {
      pending_count += 1;
    }

    return (
      <React.Fragment>
        <Topbar />
        <MainSidebar data={Menu} />
        <PageHeader />
        <div className="main-content">
          <div>
            <Row className="w-no-padding margin-b-30">
              <Col md="6">
                <div className="widget  bg-light">
                  <Row className="row-table ">
                    <div className="margin-b-50">
                      <h2 className="margin-b-5">Patient</h2>
                      <p className="text-muted">Total Number</p>
                      <span className="float-right text-primary widget-r-m">
                        {items.usercount}
                      </span>
                    </div>
                  </Row>
                </div>
              </Col>
              <Col md="6">
                <div className="widget  bg-light">
                  <Row className="row-table ">
                    <div className="margin-b-50">
                      <h2 className="margin-b-5">Appointments</h2>
                      <p className="text-muted">Total Appointments</p>
                      <span className="float-right text-indigo widget-r-m">
                        {items.appointmencount}
                      </span>
                    </div>
                  </Row>
                </div>
              </Col>
            </Row>
            <h1>Today's Appointment</h1>
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
                        <strong>Phone Number</strong>
                      </th>
                      <th>
                        <strong>Gender</strong>
                      </th>
                      <th>
                        <strong>Date</strong>
                      </th>
                      <th>
                        <strong>Time</strong>
                      </th>
                      <th>
                        <strong>Action</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointmentUsers &&
                      todayAppointmentUsers.map(function (user, index) {
                        console.log(user);
                        const {
                          _id,
                          firstname,
                          lastname,
                          mobile,
                          gender,
                          appointment,
                        } = user;
                        return (
                          appointment &&
                          appointment.map(function (aaa, index) {
                            const { id, status, date, time } = aaa;
                            console.log(aaa);
                            let newDate = new Date();
                            let datedd = newDate.getDate();
                            let month = newDate.getMonth() + 1;
                            let year = newDate.getFullYear();

                            var todaydate = `${
                              datedd < 10 ? `0${datedd}` : `${datedd}`
                            }${month < 10 ? `0${month}` : `${month}`}${year}`;

                            if (date === todaydate && status === "pending") {
                              increse_pending_count();
                              return (
                                <tr key={index}>
                                  <td>{id}</td>
                                  <td>
                                    <img
                                      alt="user"
                                      className="media-box-object rounded-circle mr-2"
                                      src="/assets/img/avtar-2.png"
                                      width={30}
                                    />
                                    {firstname + " " + lastname}
                                  </td>
                                  <td>{mobile}</td>
                                  <td>{gender}</td>
                                  {date ? (
                                    <td>{`${date.substring(
                                      0,
                                      2
                                    )}/${date.substring(2, 4)}/${date.substring(
                                      4,
                                      9
                                    )}`}</td>
                                  ) : (
                                    <td>--/--/----</td>
                                  )}
                                  {time ? (
                                    <td>{`${time.substring(
                                      0,
                                      2
                                    )}:${time.substring(2, 4)}`}</td>
                                  ) : (
                                    <td>--:--</td>
                                  )}
                                  <td className="text-center">
                                    <Link
                                      to={`/doctor/precription/${user._id}/${aaa.id}`}
                                    >
                                      <button variant="success" size="sm">
                                        <i className="fa fa-check" />{" "}
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            }
                          })
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
