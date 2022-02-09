import React from "react";

import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import AddressBar from "./../../../components/AddressBar/AddressBar";
import AppointmentBar from "./../../../components/AppointmentBar/AppointmentBar";
import About from "./../../../components/About/About";

function AboutPage() {
    return (
        <>
            <Navbar />
            <About />
            <AppointmentBar />
            <AddressBar />
            <Footer />
        </>
    );
}

export default AboutPage;
