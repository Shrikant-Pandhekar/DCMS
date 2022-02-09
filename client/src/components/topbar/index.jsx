import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

class Topbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleClass: false,
      showRightSideBar: false,
    };
    // This binding is necessary to make `this` work in the callback
    this.handleToggleClass = this.handleToggleClass.bind(this);
    this.showRightSideBarHandler = this.showRightSideBarHandler.bind(this);
  }

  // nav collapsed handle
  handleToggleClass = (event) => {
    event.preventDefault();

    const rootNodeChildren = document.getElementById("root").children;
    for (let i = 0; i < rootNodeChildren.length; i++)
      if (rootNodeChildren[i].classList.contains("nav-collapsed"))
        rootNodeChildren[i].classList.remove("nav-collapsed");
      else rootNodeChildren[i].classList.add("nav-collapsed");
  };

  showRightSideBarHandler() {
    const currentState = this.state.showRightSideBar;
    this.setState({
      showRightSideBar: !currentState,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="top-bar primary-top-bar">
          <Container fluid>
            <Row>
              <Col>
                <Link className="admin-logo" to="/">
                  <h1>DENTO</h1>
                </Link>
                <div
                  className="left-nav-toggle"
                  onClick={(e) => this.handleToggleClass(e)}
                >
                  <Button as="a" variant="link" className="nav-collapse p-0">
                    <i className="fa fa-bars" />
                  </Button>
                </div>
                <div className="left-nav-collapsed">
                  <Button
                    as="a"
                    variant="link"
                    className="nav-collapsed p-0"
                    onClick={(e) => this.handleToggleClass(e)}
                  >
                    <i className="fa fa-bars" />
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Topbar;
