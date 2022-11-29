import { Divider } from "@mui/material";
import React from "react";
import logo from "../images/amazon_logo.svg";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();
  // console.log(year);
  return (
    <div className="footer">
      <div
        className="back_to_top"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        Back to Top
      </div>
      <div className="footer_container">
        <div className="footer_details footer_details_one">
          <h3>Get to Know Us</h3>
          <p>About Us</p>
          <p>Careers</p>
          <p>Press Releases</p>
          <p>Gift a Smile</p>
          <p>Amazon Science</p>
        </div>

        <div className="footer_details footer_details_one">
          <h3>Connect with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>

        <div className="footer_details footer_details_two">
          <h3>Make Money with Us</h3>
          <p>Sell on Amazon</p>
          <p>Sell under Amazon Acceletor</p>
          <p>Amazon Global Selling</p>
          <p>Become an Affiliate</p>
          <p>Fulfilment by Amazon</p>
          <p>Advertize Your Product</p>
          <p>Amazon Pay on Merchants</p>
        </div>

        <div className="footer_details footer_details_two">
          <h3>Let Us Help You</h3>
          <p>COVID-19 and Amazon</p>
          <p>Your Account</p>
          <p>Return Center</p>
          <p>100% Purchase Protection</p>
          <p>Amazon App Download</p>
          <p>Amazon Assistant Download</p>
          <p>Help</p>
        </div>
      </div>
      <Divider />
      <div className="last_details">
        <div className="last_details_one">
          <img src={logo} alt="logo" />
          <div className="last_details_one_para">
            <p>Australia</p>
            <p>Brazil</p>
            <p>Canada</p>
            <p>China</p>
            <p>France</p>
            <p>Germany</p>
            <p>Italy</p>
            <p>Japan</p>
            <p>Mexico</p>
            <p>Netherlands</p>
            <p>Polands</p>
            <p>Singapore</p>
            <p>Spain</p>
            <p>Turkey</p>
            <p>United Arab Emirates</p>
            <p>United Kingdom</p>
            <p>United States</p>
          </div>
        </div>
        <div className="last_details_two">
          <p>
            Conditions of Use & Sale Privacy Notice Interest-Based Ads © 1996-
            {year}, Amazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
