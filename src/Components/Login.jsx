import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


import './Style.css'
import axios from 'axios';
import { BASEURL } from '../confg';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  const loginUser = async (e) => {
    e.preventDefault();
    console.log("loginUser", loginUser)

    try {
      setLoading(true);

      const objToSend = {
        email,
        password,

      };

      const response = await axios.post(`${BASEURL}/login`, objToSend);
      if (response.data.status) {
        setLoading(false);
        console.log(window.btoa(JSON.stringify(response.data.data)));
        const userEncrypt = window.btoa(JSON.stringify(response.data.data));

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", userEncrypt);
        navigate("/Body");

        alert(response.data.message);

      } else {
        console.log();
        alert(response.data.message);
      }


     
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
    finally {
      setLoading(false);
    }
  };

  // function isValidEmail(email) {
  //   // Use a regular expression to validate the email format
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }



  return (


    <form onSubmit={loginUser} className='login template d-flex justify-content-center align-items-center vh-100 bg-red-200'>
      <div className='shadow  p-5 rounded bg-white'>
        <h2 className='text-center'>Login</h2>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="email">Email</label>
          <input type="email" placeholder='Enter Email' className='form-control' onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="password">Password</label>
          <input type="password" placeholder='Enter Password' className='form-control' onChange={(e) => setPassword(e.target.value)} />
        </div>


        <div className='d-grid pt-3  '>
          {loading ? (
            <div className="spinner-border text-primary d-flex justify-content-center align-items-center" role="status">
              <span className="visually-hidden ">Loading...</span>
            </div>
          ) : (
            <button className='btn btn-primary '>login</button>
          )}
        </div>


        <p className='text-end mt-3'>
          <Link to="/Signup" className='ms-2 signupLink'>   Don't Have An Account?
          </Link>
        </p>
      </div>

    </form>


  );
}

export default Login;
