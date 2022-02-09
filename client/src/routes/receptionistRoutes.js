import React from 'react'
import { Route, Navigate } from 'react-router-dom';

import RaddApp from "./../pages/Receptionist/Rdashboard/RaddApp";
import Rdashboard from "./../pages/Receptionist/Rdashboard/Rdashboard";
import ReditPatient from "./../pages/Receptionist/Rpatients/ReditPatient";
import Rpatients from "./../pages/Receptionist/Rpatients/Rpatients";

const ReceptionistRoutes = [

    <Route exact path="/receptionist" render={() => <Navigate to="/receptionist/dashboard" />} key={"17"} />,
    <Route exact path={`/receptionist/dashboard`} element={<Rdashboard/>} key={"18"}/>,
    <Route exact path={`/receptionist/addapp`} element={<RaddApp/>} key={"19"}/>,
    <Route exact path={`/receptionist/patient`} element={<Rpatients/>} key={"20"}/>,
    <Route exact path={`/receptionist/editpatient`} element={<ReditPatient/>} key={"21"}/>,
]

export default ReceptionistRoutes;