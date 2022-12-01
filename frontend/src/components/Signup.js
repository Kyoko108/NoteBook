import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SignUp(props) {

    const [credentials, setCredentials] = useState({ email: "", name: "", password: "", cpassword: "" })
    let history = useNavigate();

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

        const { password, cpassword } = credentials;
        
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const { email, name, password } = credentials;
      
        const response = await fetch("api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name, password })

        });
        const json = await response.json();
        console.log(json);

        let pass = document.querySelector('#password').value;
        let cpass= document.querySelector('#cpassword').value;

        if (json.success) {

            if(pass==cpass){ 
            localStorage.setItem('token', json.authtoken);
            history("/");
            props.showAlert("Account created successfully", "success");
            }else{
                props.showAlert("Passwords didn't match! Try again.", "danger");
            }
        } else {
            props.showAlert("Invalid Details! "+ json.error , "danger")

        }

    }


    return (
        <>
            <div className='text-center'>
                <h1>NOTEBOOK</h1>
                <p><b>Your notes on cloud ☁️</b></p>
            </div>

            <form onSubmit={handleClick}>
            

                <div className="container my-5">
                <p className="text-center my-3"><i>New to Notebook? 👉🏻Create a new account here! </i></p>
                    <div className="mb-3 ">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" onChange={onchange} id="email" name="email" placeholder="name@example.com" required />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" onChange={onchange} id="name" name="name" />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onchange} id="password" name="password" minLength={5} required />
                    </div>
                    <div className="mb-3 ">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" onChange={onchange} id="cpassword" name="cpassword" minLength={5} required />
                    </div>
                </div>
                <div className='text-center'>
                    <button type="submit" className='btn btn-primary' >SignUp</button>
                </div>
                <br/>
                <p className='text-center last-para'>Already have an account? <a href="/login">Login-&gt;</a> </p>
            </form>
        </>
    )
}

export default SignUp