import React from "react";
import "./css/addressbar.css";

function AddressBar() {
  return (
    <>
      <div className="addbar">
        <div className="bar">
          <div className="content">
            <div className="icon"><i class="fa fa-map-pin" aria-hidden="true"></i></div>
            <div className="adddetails">
                <h2>Our Address</h2>
                <h5>CIDCO, Aurangabad</h5>
            </div>
          </div>
          <div className="content">
            <div className="icon"><i class="fa fa-phone" aria-hidden="true"></i></div>
            <div className="adddetails">
                <h2>Contact Us</h2>
                <h5>+91 7028357194</h5>
            </div>
          </div>
          <div className="content">
            <div className="icon"><i class="fa fa-envelope" aria-hidden="true"></i></div>
            <div className="adddetails nobor">
                <h2>Our Mail</h2>
                <h5>shrikant@upsitedigital.com</h5>
            </div>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default AddressBar;
