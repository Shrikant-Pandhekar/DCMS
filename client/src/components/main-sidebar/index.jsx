import React, { useState } from "react";
import BeNavGroup from "./nav/nav-group";
import { Nav, Card, Image } from "react-bootstrap";
import { signout } from "../../auth/index";

function refreshPage() {
  window.location.reload(true);
}

class MainSidebar extends React.Component {
  // constructor(props) {
  //   // console.log(props);
  //   super(props);
  //   this.state = {
  //     menu: MenuJson,
  //   };
  // }

  render() {
    return (
      <React.Fragment>
        <div className="main-sidebar-nav default-navigation">
          <div className="nano has-scrollbar">
            <div className="nano-content sidebar-nav ">
              <Card.Body className="border-bottom text-center nav-profile">
                <Image
                  alt="profile"
                  className="margin-b-10"
                  src="/assets/img/avtar-2.png"
                  width={100}
                />

                <p className="lead margin-b-0 toggle-none"> </p>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => {
                    signout(() => {
                      console.log("Signout Successfully");
                      refreshPage();
                    });
                  }}
                  style={{
                    border: "none",
                    outline: "none",
                    fontSize: "1em",
                  }}
                >
                  <i class="fa fa-sign-out" aria-hidden="true"></i> Log Out
                </button>
              </Card.Body>
              <Nav as="ul" className="metisMenu flex-column" id="menu">
                {this.props.data.map((groupItem, key) => {
                  return (
                    <React.Fragment>
                      <li className="nav-heading" key={key}>
                        <span>{groupItem.groupname.toUpperCase()}</span>
                      </li>
                      <BeNavGroup menu={groupItem.children} key={key + 20} />
                    </React.Fragment>
                  );
                })}
              </Nav>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MainSidebar;
