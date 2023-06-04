import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import login from "../image/login.jpg";

function Login(props) {
  const location = useLocation();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [guestLoginClicked, setGuestLoginClicked] = useState(false);
  const [googleLogin, setGogleLogin] = useState(false);
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

  useEffect(() => {
    const getUser = async () => {
      await fetch("login/success", {
        method: "GET",
        credentials: "include",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error("authentication has been failed");
        })
        .then((resObject) => {
          console.log(resObject.accessToken);
          localStorage.setItem("token", resObject.accessToken);
          localStorage.setItem("name", resObject.user.name);
          localStorage.setItem("googleLogin", true);
          history("/");
          props.showAlert("Logged in successfully", "success");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setGogleLogin(true);
      const response = await fetch("/auth/google");
      const { url } = await response.json();

      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-none d-lg-flex align-items-center">
          <img
            src={login}
            alt="login-img"
            className="img-fluid"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="w-100">
            {" "}
            {/* Added class 'w-100' */}
            <div className="text-center">
              <h1 className="display-4">NOTEBOOK</h1>
              <p className="lead">
                <strong>Your notes on cloud ☁️</strong>
              </p>
            </div>
            <div className="my-3">
              <p className="text-center">
                <em>Login to continue using Notebook 😊</em>
              </p>
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary m-2">Login</button>
              <button className="btn btn-secondary">Login as guest</button>
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                onClick={handleGoogleLogin}
                alt="Google Login"
                className="google-login"
                style={{
                  width: "35px",
                  height: "auto",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              />
            </div>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className={`btn btn-outline-primary`}>
                SignUp
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

// {
//   /* <a
// href="http://localhost:5000/auth/google"
// onClick={() =>{setGogleLogin(true)}} >
//   <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google Login" style={{width: 55, height :55, padding:10 }} />
//   </a> */
// }
