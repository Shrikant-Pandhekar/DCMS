import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";

import { BrowserRouter, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DoctorRoutes from './routes/doctorRoutes'
import UserRoutes from "./routes/userRoutes";
import ReceptionistRoutes from "./routes/receptionistRoutes";
import HomeRoutes from "./routes/homeRoutes";

ReactDOM.render(
	<>
		<BrowserRouter basename={"/"}>
			<Routes>
				{HomeRoutes}
				{DoctorRoutes}
				{UserRoutes}
				{ReceptionistRoutes}
			</Routes>
			</BrowserRouter>
		<ToastContainer />
	</>,

  document.getElementById("root")
);