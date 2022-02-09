import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AppointmentForm from "../components/AppointmentForm/AppointmentForm";

function AppointmentPage() {
  return (
    <>
      <Navbar />
      <AppointmentForm />
      <Footer />
    </>
  );
}

export default AppointmentPage;
