import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/index";

function UserRouteProtect({ children }) {
  const _isAuthenticated = isAuthenticated();

  if (_isAuthenticated) {
    return _isAuthenticated.user.role === 0 ? children : <Navigate to="/" />;
  } else {
    return <Navigate to="/user/signin" />;
  }
}

export default UserRouteProtect;
