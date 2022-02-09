import React from "react";
import { Link } from "react-router-dom";
import Logo from "./img/Logo.jpg";
import "./css/nav.css";

const Navbar = () => {
  return (
    <>
      <div className="navb">
        <div class="logo">
          <img src={Logo} alt="logo" />
          <h2>DENTO</h2>
        </div>
        <div className="details">
          <div class="time">
            <h2>
              <i class="fa fa-clock-o" aria-hidden="true"></i> Mon-Fri:{" "}
              <span className="blue">8 AM - 8PM</span>
            </h2>
          </div>
          <div className="call">
            <a href="tel:+91 7028357194">
              <button>
                <i class="fa fa-phone" aria-hidden="true"></i> +91 7028357194
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
