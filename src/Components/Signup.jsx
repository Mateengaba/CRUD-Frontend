import React from 'react';
import { useState } from 'react';
import { BASEURL } from '../confg';  
import { Link, useNavigate } from "react-router-dom";

import './Style.css';
import axios from 'axios';

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const SignupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      if (
        !firstName ||
        !lastName ||
        !age ||               
        !gender ||
        !email ||
        !password ||
        !phoneNo
      ){
        alert ("Required fields are missing",)
        return
      }

      console.log("signup function");
      const objToSend = {
        firstName,
        lastName,
        age,
        gender,
        email,
        password,
        phoneNo,
      };

      const response = await axios.post(`${BASEURL}/signup`, objToSend);
      setLoading(false);

      //console.log("objToSend" , objToSend)
      console.log("response", response);


 

      if (response.data.status) {
        navigate("/");
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("error", error.message);
      alert("error", error.message);
    }
  }

  return (
    <form onSubmit={SignupHandler} className='signup template d-flex justify-content-center align-items-center '>
      <div className='form_container shadow p-5 rounded bg-white'>
        <h2 className='text-center'>Sign-up</h2>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="firstName">First Name</label>
          <input type="text" placeholder='Enter Full Name' className='form-control' onChange={(e) => setfirstName(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="lastName">Last Name</label>
          <input type="text" placeholder='Enter Last Name' className='form-control' onChange={(e) => setlastName(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="age">Age</label>
          <input type="text" placeholder='Enter age' className='form-control' onChange={(e) => setage(e.target.value)} />
        </div>  
        
        
        <div className='mb-3'>
          <label className='mb-2' htmlFor="gender">Gender</label>
          <input type="text" placeholder='Enter gender' className='form-control' onChange={(e) => setgender(e.target.value)} />
        </div>

        <div className='mb-3'>
          <label className='mb-2' htmlFor="phoneNo">Phone Num</label>
          <input  placeholder='Enter phoneNo' className='form-control' onChange={(e) => setphoneNo(e.target.value)} />
        </div>


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
    <button className='btn btn-primary '>SIGN UP</button>
  )} 
</div>


        {/* <div className='d-grid pt-3'>
          <button className='btn btn-primary' disabled={loading}>
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </div> */}

        <p className='text-end mt-3'>
          <Link to="/" className='signupLink ms-2'>Already Have An Account?</Link>
        </p>
      </div>
    </form>
  );
}

export default Signup;