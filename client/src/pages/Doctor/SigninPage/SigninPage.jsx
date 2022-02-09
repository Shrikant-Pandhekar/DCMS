import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin, authenticate } from "../../../auth/adminauth";
import "./../../Home/SignupPage/SignupPage.css";
import Navbar from "./../../../components/Navbar/Navbar";
import Footer from "./../../../components/Footer/Footer";
const API = "http://localhost:8000/api";

function SigninPage() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const { email, password } = details;

  console.log(details);

  const [error, setError] = useState();

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

      var body = JSON.stringify(details);

      console.log(body);

      const data = await signin({ email, password });

      if (data.error) {
        setError(data.error);
      } else {
        // JWT sets in local storage
        authenticate(data, () => {
          navigate("/doctor/dashboard");
        });
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
          <h1>
            Admin <span className="blue">SignIn</span>
          </h1>
          <form action="" method="post" className="appform" onSubmit={onSubmit}>
            <h3>Log In</h3>
            <div className="oneblockapp">
              <input
                type="email"
                name="email"
                id=""
                placeholder="Email"
                onChange={inputEvents}
                value={email}
              />
            </div>
            <div className="oneblockapp">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={inputEvents}
                value={password}
              />
            </div>
            <button type="submit" onClick={onSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SigninPage;
