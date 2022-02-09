import React from "react";
import { Route, Navigate } from "react-router-dom";

import Dashboard from "./../pages/Doctor/dashboard/index";
import Patient from "./../pages/Doctor/Patients/Patient";
import EditPatient from "./../pages/Doctor/Patients/EditPatient";
import Ansqto from "./../pages/Doctor/QnA/anstoq";
import QnA from "./../pages/Doctor/QnA/QnA";
import ListBlog from "./../pages/Doctor/Blog/ListBlog";
import AddBlog from "./../pages/Doctor/Blog/AddBlog";
import EditBlog from "./../pages/Doctor/Blog/EditBlog";
import AppHistory from "./../pages/Doctor/AppHistory/AppHistory";
import ApprovedReview from "../pages/Doctor/TestimonialReview/ApprovedReview";
import PendingReview from "../pages/Doctor/TestimonialReview/PendingReview";
import SigninPage from "./../pages/Doctor/SigninPage/SigninPage";
import Precription from "../pages/Doctor/Precription/Precription";

import DoctorRouteProtect from "./helper/DoctorRouterProtect";

const DoctorRoutes = [
  <Route exact path={`/doctor/signin`} element={<SigninPage />} key={"114"} />,

  <Route
    exact
    path="/doctor"
    render={() => <Navigate to="/doctor/dashboard" />}
    key={"1"}
  />,
  <Route
    path={`/doctor/dashboard`}
    element={
      <DoctorRouteProtect>
        <Dashboard />
      </DoctorRouteProtect>
    }
    key={"2"}
  />,
  <Route
    path={`/doctor/patient`}
    element={
      <DoctorRouteProtect>
        <Patient />
      </DoctorRouteProtect>
    }
    key={"3"}
  />,
  <Route
    path={`/doctor/editpatient`}
    element={
      <DoctorRouteProtect>
        <EditPatient />
      </DoctorRouteProtect>
    }
    key={"4"}
  />,
  <Route
    path={`/doctor/qna`}
    element={
      <DoctorRouteProtect>
        <QnA />
      </DoctorRouteProtect>
    }
    key={"5"}
  />,
  <Route
    path={`/doctor/anstoquestion`}
    element={
      <DoctorRouteProtect>
        <Ansqto />
      </DoctorRouteProtect>
    }
    key={"6"}
  />,
  <Route
    path={`/doctor/listblog`}
    element={
      <DoctorRouteProtect>
        <ListBlog />
      </DoctorRouteProtect>
    }
    key={"7"}
  />,
  <Route
    path={`/doctor/addblog`}
    element={
      <DoctorRouteProtect>
        <AddBlog />
      </DoctorRouteProtect>
    }
    key={"8"}
  />,
  <Route
    path={`/doctor/editblog`}
    element={
      <DoctorRouteProtect>
        <EditBlog />
      </DoctorRouteProtect>
    }
    key={"9"}
  />,
  <Route
    path={`/doctor/apphistory`}
    element={
      <DoctorRouteProtect>
        <AppHistory />
      </DoctorRouteProtect>
    }
    key={"10"}
  />,
  <Route
    path={`/doctor/approvedtesti`}
    element={
      <DoctorRouteProtect>
        <ApprovedReview />
      </DoctorRouteProtect>
    }
  />,
  <Route
    path={`/doctor/pendingtesti`}
    element={
      <DoctorRouteProtect>
        <PendingReview />
      </DoctorRouteProtect>
    }
  />,
  <Route
    path={`/doctor/precription/:userId/:appId`}
    element={      <DoctorRouteProtect>
<Precription />      </DoctorRouteProtect>

}
  />,
];

export default DoctorRoutes;
