import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function SignUp(props) {
  const [inputValues, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });
  const [validation, setValidation] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputValue({ ...inputValues, [name]: value });
  }

  const checkValidation = () => {
    let errors = validation;
    //name
    if (!inputValues.name.trim()) {
      errors.name = "Name is required";
    } else if (inputValues.name.length < 5) {
      errors.name = "Please enter at least 6 characters";
    } else {
      errors.name = "";
    }

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

    //cpassword
    if (!inputValues.cPassword) {
      errors.cPassword = "Password confirmation is required";
    } else if (inputValues.cPassword !== inputValues.password) {
      errors.cPassword = "Password does not match confirmation password";
    } else {
      errors.cPassword = "";
    }
    setValidation(errors);
  };

  useEffect(() => {
    checkValidation();
  }, [inputValues]);

  let history = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, password } = inputValues;
    const response = await fetch("api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    let pass = document.querySelector("#password").value;
    let cpass = document.querySelector("#cpassword").value;

    if (json.success) {
      if (pass === cpass) {
        localStorage.setItem("token", json.authtoken);
        history("/");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Passwords didn't match! Try again.", "danger");
      }
    } else {
      props.showAlert("Invalid Details! " + json.error, "danger");
    }
  };

  //   const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "" })
  //   let history = useNavigate();

  //   const location = useLocation();
  //   const onchange = (e) => {
  //       setCredentials({ ...credentials, [e.target.name]: e.target.value })

  //       const { password, cpassword } = credentials;

  //   }

  // const handleClick = async (e) => {
  //     e.preventDefault();
  //     const { email, name, password } = credentials;

  //     const response = await fetch("api/auth/createuser", {
  //         method: 'POST',
  //         headers: {
  //             'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ email, name, password })

  //     });
  //     const json = await response.json();
  //     console.log(json);

  //     let pass = document.querySelector('#password').value;
  //     let cpass= document.querySelector('#cpassword').value;

  //     if (json.success) {

  //         if(pass==cpass){
  //         localStorage.setItem('token', json.authtoken);
  //         history("/");
  //         props.showAlert("Account created successfully", "success");
  //         }else{
  //             props.showAlert("Passwords didn't match! Try again.", "danger");
  //         }
  //     } else {
  //         props.showAlert("Invalid Details! "+ json.error , "danger")

  //     }

  // }

  return (
    <>
      <div className="text-center">
        <h1>NOTEBOOK</h1>
        <p>
          <b>Your notes on cloud ☁️</b>
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="container my-5">
          <p className="text-center my-3">
            <i>New to Notebook? 👉🏻Create a new account here! </i>
          </p>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text/string"
              name="name"
              className="form-control"
              placeholder="Enter your name"
              onChange={(e) => handleChange(e)}
              value={inputValues.name}
            />
          </div>
          <div className="showAlert" style={{color: "red"}}>
            {validation.name && <p>{validation.name}</p>}
          </div>
          {/* {validation.name && console.log(validation)} */}
          <div className="mb-3 ">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={inputValues.email}
              id="email"
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="showAlert" style={{color: "red"}}>
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
              //minLength={5}
              required
            />
          </div>
          <div className="showAlert" style={{color: "red"}}>
            {validation.password && <p>{validation.password}</p>}
          </div>
          <div className="mb-3 ">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              name="cPassword"
              className="form-control"
              onChange={(e) => handleChange(e)}
              value={inputValues.cPassword}
              id="cpassword"
              // minLength={5}
              required
            />
          </div>
          <div className="showAlert" style={{color: "red"}}>
            {validation.cPassword && <p>{validation.cPassword}</p>}
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            SignUp
          </button>
        </div>
        <br />
        <p className="text-center last-para">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`nav-link ${
              location.pathname === "/login" ? "active" : ""
            }`}
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
}

export default SignUp;