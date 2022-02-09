import React from "react";
import { Link } from "react-router-dom";
import logo from "./img/Logo.jpg";
import "./css/footer.css";

const Footer = () => (
  <>
    <footer>
      <div className="fcontainer">
        <div className="wrapper">
          <div className="footer-widget">
            <div className="logodetails">
              <Link to="/">
                <img src={logo} alt="" className="logo" />
              </Link>
              <h2>DENTO</h2>
            </div>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
              vero ipsam! Pariatur eum similique enim et fugit repellat
              doloribus tempore?
            </p>
          </div>
          <div className="footer-widget">
            <h6>Quick Link</h6>
            <ul className="links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/signup">Appointment</Link>
              </li>
              <li>
                <Link to="/user/signin">Patient Login</Link>
              </li>
              <li>
                <Link to="/doctor/signin">Doctor Login</Link>
              </li>
            </ul>
          </div>
          <div className="footer-widget">
            <pre>Subscribe to</pre>
            <h1>Our Blog</h1>
            <div className="subform">
              <input type="email" name="email" placeholder="Email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <div className="bottomline">
      <p>All copyright Reserved By @ UpSite Digital SOlution</p>
    </div>
  </>
);

export default Footer;
