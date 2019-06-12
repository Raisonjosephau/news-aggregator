/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

class SimpleFooter extends React.Component {
  render() {
    return (
      <>
        <footer className="footer">
          <Container>
            <Row className=" row-grid align-items-center">
              <Col lg="6">
                <h3 className=" text-primary font-weight-light mb-2">
                  Thank you for using our service
                </h3>
                <h4 className="mb-0 font-weight-light"></h4>
              </Col>
              <Col lg="4" md="6">
                <div className="single-footer-widget">
                  <h6 className="heading pb-4">Quick Links</h6>
                  <Row className="mx-0">
                    <ul className="col footer-nav">
                      <li>
                        <Link to="/">Quite Light</Link>
                      </li>
                      <li>
                        <a href="#">Categories</a>
                      </li>
                      <li>
                        <a href="#">Archives</a>
                      </li>
                    </ul>
                    <ul className="col footer-nav">
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Terms of Use</a>
                      </li>
                      <li>
                        <a href="#">Help Center</a>
                      </li>
                    </ul>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row className=" align-items-center justify-content-md-between">
              <Col md="6">
                <div className=" copyright">© {new Date().getFullYear()} .</div>
              </Col>
              <Col md="6">
                <Nav className=" nav-footer justify-content-end">
                  <NavItem>
                    <NavLink
                      href="https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md"
                      target="_blank"
                    >
                      MIT License
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </footer>
      </>
    );
  }
}

export default SimpleFooter;
