import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";

function DoctorRouteProtect({ children }) {
  const _isAuthenticated = isAuthenticated();
  console.log(_isAuthenticated);
  if (_isAuthenticated) {
    return _isAuthenticated.admin.role === 2 ? children : <Navigate to="/" />;
  } else {
    return <Navigate to="/doctor/signin" />;
  }
}

export default DoctorRouteProtect;
