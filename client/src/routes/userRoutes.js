import React from "react";
import { Route, Navigate } from "react-router-dom";

import UserAppointment from "../pages/User/UserAppointment/UserAppointment";
import ViewPrescription from "../pages/User/UserAppointment/ViewPrescription";

import MakeAppointment from "./../pages/User/MakeAppointment/MakeAppointment";
import Pdashboard from "../pages/User/Pdashboard/Pdashboard";
import Peditprofile from "../pages/User/Pprofile/Peditprofile";
import Pprofile from "../pages/User/Pprofile/Pprofile";
import Pquestion from "../pages/User/Pquestion/Pquestion";
import SigninPage from "./../pages/User/SigninPage/SigninPage";
import UserRouteProtect from "./helper/UserRouteProtect";
const UserRoutes = [
  <Route exact path={`/user/signin`} element={<SigninPage />} key={"114"} />,

  <Route
    exact
    path={`/user`}
    render={() => <Navigate to="/user/dashboard" />}
    key={"11"}
  />,
  <Route
    exact
    path={`/user/dashboard`}
    element={
      <UserRouteProtect>
        <Pdashboard />
      </UserRouteProtect>
    }
    key={"12"}
  />,
  <Route
    exact
    path={`/user/makeappointment`}
    element={
      <UserRouteProtect>
        <MakeAppointment />
      </UserRouteProtect>
    }
    key={"makeappointment"}
  />,
  <Route
    exact
    path={`/user/appointments`}
    element={
      <UserRouteProtect>
        <UserAppointment />
      </UserRouteProtect>
    }
    key={"13"}
  />,
  <Route
    exact
    path={`/user/profile`}
    element={
      <UserRouteProtect>
        <Pprofile />
      </UserRouteProtect>
    }
    key={"14"}
  />,
  <Route
    exact
    path={`/user/edit`}
    element={
      <UserRouteProtect>
        <Peditprofile />
      </UserRouteProtect>
    }
    key={"15"}
  />,
  <Route
    exact
    path={`/user/question`}
    element={
      <UserRouteProtect>
        <Pquestion />
      </UserRouteProtect>
    }
    key={"16"}
  />,
  <Route
    exact
    path={`/user/viewprescription/:appId`}
    element={
      <UserRouteProtect>
        <ViewPrescription />
      </UserRouteProtect>
    }
    key={"17"}
  />,
];

export default UserRoutes;
