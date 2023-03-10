import axios from "axios";
import Joi from "joi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });
  const [errors, setError] = useState({
    email: "",
    name: "",
    password: "",
    cPassword: "",
  });

  const registerSchema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().min(5).max(40).required(),
    password: Joi.string().required(),
    cPassword: Joi.string().required(),
  });
  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name));
    // const err = {};
    if (validation.error) {
      // console.log(validation.error.details)
      // err[name] = validation.error;
      setError({ ...errors, [name]: validation.error.details[0].message });
    } else {
      const err = { ...errors };
      delete err[name];
      setError({ ...err });
    }
    console.log(errors);
    // console.log(errors)
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {}, []);

  const onSubmit=async(e)=>{
    e.preventDefault()
    if(Object.keys(errors).length===0){
   await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",inputs)
    
    }
  }
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Register</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form method="POST" onSubmit={onSubmit}>
          <input
            className="form-control my4"
            placeholder="Enter your email"
            type="email"
            name="email"
            onChange={onChange}
          />
          {errors.email && (
            <div className="alert alert-danger" role="alert">
              {errors.email}
            </div>
          )}
          <input
            className="form-control mt-4"
            placeholder="Enter your name"
            type="text"
            name="name"
            onChange={onChange}
          />
          {errors.name && (
            <div className="alert alert-danger" role="alert">
              {errors.name}
            </div>
          )}
          <input
            className="form-control mt-4 "
            placeholder="Enter your Password"
            type="password"
            name="password"
            onChange={onChange}
          />
          {errors.password && (
            <div className="alert alert-danger" role="alert">
              {errors.password}
            </div>
          )}
          <input
            className="form-control mt-4 "
            placeholder="Enter your confirmpassword"
            type="password"
            name="cPassword"
            onChange={onChange}
          />
          {errors.cPassword && (
            <div className="alert alert-danger" role="alert">
              {errors.cPassword}
            </div>
          )}
          <button className="btn btn-default-outline my-4 w-100 rounded">
            Register
          </button>

          <Link className="btn btn-default-outline" to="/login">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
};
