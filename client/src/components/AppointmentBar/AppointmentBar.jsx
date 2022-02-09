import React from "react";
import { Link } from "react-router-dom";
import "./css/appointmentbar.css";

function AppointmentBar() {
  return (
    <>
      <div className="appointcontent">
        <div className="appointbar">
          <div className="appointdetails">
            <h2>Make an appointment today!</h2>
            <h5>
              Click the button to schedule. We look forward to seeing you!
            </h5>
          </div>
          <div className="appointbtn">
            <a href="tel:7028357194">
              <button>
                <i class="fa fa-phone" aria-hidden="true"></i> +91 7028357194
              </button>
            </a>
            <h2>OR</h2>
            <Link to="/appointment">
              <button>
                <i class="fa fa-calendar" aria-hidden="true"></i> Book an
                Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppointmentBar;
