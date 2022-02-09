import React, { useState, useEffect } from "react";
import "./SignupPage.css"
import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
import { NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

const API = "http://localhost:8000/api";

function SignupPage() {
  const [success, setSuccess] = useState(false);
  const [successmessege, setSuccessmessege] = useState("");
  const navigate = useNavigate();
    const [details, setDetails] = useState({
		firstname: "",
		lastname: "",
		email: "",
		address: "",
		gender: "",
		mobile: "",
		password: "",
	});

	useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Sign Up !",
        icon: "success",
        text: successmessege,
      });
    }
  }, [success, successmessege]);


	const { firstname, lastname, email, address, gender, mobile, password} = details

	console.log(details);

	const inputEvents = (event) => {

		const { name, value } = event.target;

		setDetails((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const onSubmit = async (event) => {

		try {

			event.preventDefault();

			var body = JSON.stringify(details)

			console.log(body);

			const response = await fetch(`${API}/signup`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body:body,
			});

			if (response) {
				var data = await response.json()
				console.log(data);
				if(data.success){

				
				setSuccess(true);
				setSuccessmessege("Sign Up successfull");
				navigate("/user/signin");

				}
			}
			
		} catch (error) {
			console.log(error);
		}
	};
    return (
        <>
            <Navbar />
			<div className="afcontainer">
				<div className="afform">
				<h1>User <span className="blue">SignUp</span></h1>
				<form action="" method="post" className="appform" onSubmit={onSubmit}>
					<h3>Information</h3>
					<div className="twobloackapp">
						<input type="text" name="firstname" id="firstname" placeholder="First Name" onChange={inputEvents} value={firstname}/>
						<input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={inputEvents} value={lastname} />
					</div>
					<div className="twobloackapp">
						<input type="email" name="email" id="" placeholder="Email" onChange={inputEvents} value={email}/>
						<input type="text" name="address" id="address" placeholder="Address" onChange={inputEvents} value={address}/>
					</div>
					<div className="twobloackapp">
						<select name="gender" onChange={inputEvents} defaultValue={gender}>
							<option defaultValue="male" value="male" selected disabled>Gender</option>
							<option value="male" defaultValue="male">Male</option>
							<option defaultValue="female">Feale</option>
						</select>
						<input type="tel" name="mobile" id="" placeholder="mobile" onChange={inputEvents} value={mobile}/>
					</div>
					<div className="oneblockapp">
						<input type="password" name="password" id="password" placeholder="Password" onChange={inputEvents} value={password}/>
					</div>
					<button type="submit" onClick={onSubmit}>Register</button>
				</form>
				</div>
			</div>
            <Footer />
        </>
    );
}

export default SignupPage;