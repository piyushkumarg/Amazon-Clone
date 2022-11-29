import { Divider } from "@mui/material";
import React, { useContext, useState } from "react";
import logo from "../images/black_amazon_logo.svg";
import "./sign.css";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logincontext } from "../context/Contextprovider";

function SignIn() {
  const { account, setAccount } = useContext(Logincontext);

  const history = useNavigate();

  const [logData, setData] = useState({
    email: "",
    password: "",
  });
  // console.log(logData);

  const addData = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logData;
    // console.log(email);

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log(data);

    setAccount(data);

    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.error("Invalid Details 👎!", {
        position: "top-center",
      });
    } else {
      setAccount(data);
      console.log("data valid");
      setData({ ...logData, email: "", password: "" });
      toast.success("Login Successfully done 😃!", {
        position: "top-center",
      });
      history("/");
    }
  };

  return (
    <div className="sign_container">
      <div className="sign_header">
        <img src={logo} alt="logo" />
      </div>
      <form action="" method="POST" className="sign_form">
        <h2>Sign In</h2>
        <div className="form_data">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={addData}
            value={logData.email}
            name="email"
            id="email"
          />
        </div>
        <div className="form_data">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={addData}
            value={logData.password}
            name="password"
            id="password"
            placeholder="At least 6 characters"
          />
        </div>
        <button className="signIn_btn" onClick={senddata}>
          Continue
        </button>
      </form>
      <div className="create_account_info">
        <div className="divider">
          <Divider
            color="disabled"
            style={{
              width: "30%",

              // background: "red",
            }}
          />
          <p>New to Amazon</p>
          <Divider
            color="disabled"
            style={{
              width: "30%",
              // background: "red",
            }}
          />
        </div>

        <NavLink to="/register">
          <button className="create_account_btn">
            Create your Amazon account
          </button>
        </NavLink>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
