import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    if (localStorage.getItem("googleLogin")) {
      localStorage.removeItem("googleLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      const response = fetch("/logout");
      const { success } = response.json();
      if (success) {
        navigate("/login");
      }
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NOTEBOOK
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? location.pathname
                      : "/notes"
                  }
                  className={`nav-link ${
                    location.pathname === "/notes" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  Your Notes
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={
                    location.pathname === "/login" ||
                    location.pathname === "/signup"
                      ? location.pathname
                      : "/"
                  }
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                >
                  Add Note
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/about"
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                >
                  About
                </Link>
              </li>
            </ul>

            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  to="/login"
                  className={`btn btn-outline-primary me-2 ${
                    location.pathname === "/login" ? "active" : ""
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className={`btn btn-outline-primary ${
                    location.pathname === "/signup" ? "active" : ""
                  }`}
                >
                  Sign Up
                </Link>
              </form>
            ) : (
              <Link
                to="/login"
                onClick={handleLogout}
                className={`nav-link ${
                  location.pathname === "/logout" ? "active" : ""
                }`}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
