import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Login(props) {
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [guestLoginClicked, setGuestLoginClicked] = useState(false);
  let history = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (guestLoginClicked) {
      handleClick();
    }
  }, [guestLoginClicked]);
  const handleGuestLogin = () => {
    setCredentials({ email: "guest@gmail.com", password: "guest" });
    setGuestLoginClicked(true);
  };

  const handleClick = async () => {
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("name", json.name);
      history("/");
      props.showAlert("Logged in successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  return (
    <div>
      <div className="text-center my-4">
        <h1>NOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <div className="container my-5">
        <p className="text-center">
          <i>Login to continue using Notebook 😊 </i>
        </p>
        <div className="mb-3 ">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            onChange={onchange}
            id="email"
            name="email"
            placeholder="name@example.com"
          />
        </div>

        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={onchange}
            id="password"
            name="password"
          />
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary m-2" onClick={handleClick}>
          Login
        </button>
        <button className="btn btn-secondary" onClick={handleGuestLogin}>
          Login as guest
        </button>
      </div>
      <br />
      <p className="text-center last-para">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className={`nav-link ${
            location.pathname === "/signup" ? "active" : ""
          }`}
        >
          SignUp
        </Link>{" "}
      </p>
    </div>
  );
}

export default Login;
