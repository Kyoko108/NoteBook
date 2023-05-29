import React from "react";
import PageNotFound from "../image/PageNotFound.png";
import { Link } from "react-router-dom";
const Page404 = () => {
  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
      }}
    >
      <img src={PageNotFound} />
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
};

export default Page404;
