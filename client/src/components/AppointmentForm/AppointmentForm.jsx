import React, {useState, useEffect} from "react";
import "./css/appointmentfoem.css";
const API = "http://localhost:8000/api";

function AppointmentForm() {

	const [details, setDetails] = useState({
		firstname: "",
		lastname: "",
		email: "",
		address: "",
		gender: "",
		mobile: "",
		password: "",
	});

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
			}
			
		} catch (error) {
			
		}
	};

	return (
		<>
			<div className="afcontainer">
				<div className="afform">
				<h1>User <span className="blue">SignUp</span></h1>
				<form action="" method="post" className="appform" onSubmit={onSubmit}>
					<h3>Patient Information</h3>
					<div className="twobloackapp">
						<input type="text" name="firstname" id="firstname" placeholder="First Name" onChange={inputEvents} defaultValue={firstname}/>
						<input type="text" name="lastname" id="lastname" placeholder="Last Name" onChange={inputEvents} value={lastname} />
					</div>
					<div className="twobloackapp">
						<input type="email" name="email" id="" placeholder="Email" onChange={inputEvents} value={email}/>
						<input type="text" name="address" id="address" placeholder="Address" onChange={inputEvents} value={address}/>
					</div>
					<div className="twobloackapp">
						<select name="gender" onChange={inputEvents} value={gender}>
							<option value="" selected disabled>Gender</option>
							<option value="male">Male</option>
							<option value="female">Feale</option>
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
		</>
	);
}

export default AppointmentForm;
