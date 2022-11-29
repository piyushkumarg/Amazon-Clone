import React, { useState } from "react";
import logo from "../images/black_amazon_logo.svg";
import "./sign.css";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const [udata, setUdata] = useState({
    fname: "",
    mobile: "",
    email: "",
    password: "",
    cpassword: "",
  });

  console.log(udata);

  const addData = (e) => {
    const { name, value } = e.target;
    console.log("hello " + name, value);

    setUdata(() => {
      return {
        ...udata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { fname, email, mobile, password, cpassword } = udata;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        mobile,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    //console.log(data);

    if (res.status === 422 || !data) {
      toast.error("Invalid Details 👎!", {
        position: "top-center",
      });
    } else {
      toast.success("Registration Successfully done 😃!", {
        position: "top-center",
      });

      setUdata({
        ...udata,
        fname: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    }
  };

  return (
    <div className="sign_container">
      <div className="sign_header">
        <img src={logo} alt="logo" />
      </div>
      <form method="POST" className="sign_form">
        <h2>Create Account</h2>
        <div className="form_data">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            onChange={addData}
            value={udata.fname}
            name="fname"
            id="fname"
            placeholder="First and last name"
          />
        </div>

        <div className="form_data">
          <label htmlFor="number">Moblie number</label>
          <input
            type="number"
            onChange={addData}
            value={udata.mobile}
            name="mobile"
            id="mobile"
            placeholder="Mobile number"
          />
        </div>

        <div className="form_data">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={addData}
            value={udata.email}
            name="email"
            id="email"
          />
        </div>
        <div className="form_data">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={addData}
            value={udata.password}
            name="password"
            id="password"
            placeholder="At least 6 characters"
          />
        </div>

        <div className="form_data">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            onChange={addData}
            value={udata.cpassword}
            name="cpassword"
            id="cpassword"
          />
        </div>
        <button className="signIn_btn" onClick={senddata}>
          Continue
        </button>
        <Divider className="divider" />
        <div className="signin_info">
          <p>Already have an account?</p>
          <NavLink to="/login"> Sign in</NavLink>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default SignUp;
