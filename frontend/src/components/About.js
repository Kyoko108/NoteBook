import React from "react";


const About = () => {

  return <div className="container">
    <h4>This is about Notebook:</h4>
    <p className="mx-3 mt-5"> Using Notebook you could-</p>
    <ul className="list-group list-group-flush list-group-numbered mx-5">
      <li className="list-group-item">Write your personal / professional notes</li>
      <li className="list-group-item">Secure your notes on cloud</li>
      <li className="list-group-item">Access your notes from anywhere / from any devices</li>
      <li className="list-group-item">Edit or Delete your notes</li>
      <li className="list-group-item">Give your notes a particular tag</li>
      <li className="list-group-item">Maintain privacy using credentials</li>
    </ul>
  </div>;
};

export default About;
