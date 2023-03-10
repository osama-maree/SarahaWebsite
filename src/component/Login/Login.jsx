import React, { useState } from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
export const Login = ({ logUser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateUser = () => {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    return schema.validate(user, { abortEarly: false });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = validateUser();
    let errorList = [];

    if (val.error) {
      val.error.details.map((err) => errorList.push(err.message));
      setErrors(errorList);
    } else {
      setErrors([]);
      const res = await axios.post(
        "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin",
        user
      );
      console.log(res);
      if (res.data.message === "success") {
        const expir = new Date();
        const futureDay = expir.getDate() + 1;
        logUser(res.data.token);
        expir.setDate(futureDay);
        cookie.save("token", res.data.token, { expires: expir });

        navigate("/home");
      } else {
        res.data.err.map((err) => errorList.push(err[0].message));
        setErrors(errorList);
      }
    }
  };
  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={handleSubmit}>
          {errors &&
            errors.map((err, idx) => (
              <div className="alert alert-danger" key={idx} role="alert">
                {err}
              </div>
            ))}
          <input
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
            type="text"
            name="email"
          />
          <input
            onChange={onChange}
            className="form-control my-4 "
            placeholder="Enter your Password"
            type="text"
            name="password"
          />
          <button className="btn btn-default-outline my-4 w-100 rounded">
            Login
          </button>
         
          <Link className="btn btn-default-outline" to="/register">
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};
