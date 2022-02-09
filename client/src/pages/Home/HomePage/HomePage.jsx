import React from "react";
import Navbar from "./../../../components/Navbar/Navbar";
import Hero from "./../../../components/Hero/Hero";
import Hero1 from "./../../../components/Hero1/Hero1";
import Treatment from "./../../../components/Treatment/Treatment";
import Appointment from "./../../../components/Appointment/Appointment";
import Testimonial from "./../../../components/Testimonal/Testimonial";
import Blog from "./../../../components/Blog/Blog";
import Footer from "./../../../components/Footer/Footer";
import AddressBar from "./../../../components/AddressBar/AddressBar";
import AppointmentBar from "./../../../components/AppointmentBar/AppointmentBar";

function Home() {
	return (
		<>
			<Navbar />
			<Hero />
			<Hero1 />
			<Treatment />
			<Appointment />
			<Testimonial />
			<Blog />
			<AddressBar />
			<AppointmentBar />
			<Footer />
		</>
	);
}

export default Home;
