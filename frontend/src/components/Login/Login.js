import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Login.css";

function Login(props) {
  const location = useLocation();
  // const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });
  let history = useNavigate();

  // const onchange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });
  // };
  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;
    //email
    const emailCond =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (!inputValues.email.trim()) {
      errors.email = "Email is required";
    } else if (!inputValues.email.match(emailCond)) {
      errors.email = "Please Enter a valid email address";
    } else {
      errors.email = "";
    }

    //password
    const password = inputValues.password;
    if (!password) {
      errors.password = "password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be longer than 6 characters";
    } else if (password.length >= 20) {
      errors.password = "Password must shorter than 20 characters";
    } else {
      errors.password = "";
    }
    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [inputValues]);

  // const handleClick = async () => {

  //   const response = await fetch("api/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: credentials.email,
  //       password: credentials.password,
  //     }),
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   if (json.success) {
  //     localStorage.setItem("token", json.authtoken);
  //     history("/");
  //     props.showAlert("Logged in successfully", "success");
  //   } else {
  //     props.showAlert("Invalid Credentials", "danger");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    //const { email } = inputValues;
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputValues.email,
        password: inputValues.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
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
            onChange={(e) => handleChange(e)}
            value={inputValues.email}
            id="email"
            name="email"
            placeholder="name@example.com"
            requird
          />
        </div>
        <div className="showAlert">
          {validation.email && <p>{validation.email}</p>}
        </div>
        <div className="mb-3 ">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => handleChange(e)}
            value={inputValues.password}
            id="password"
            name="password"
          />
        </div>
        <div className="showAlert">
          {validation.password && <p>{validation.password}</p>}
        </div>
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Login
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
