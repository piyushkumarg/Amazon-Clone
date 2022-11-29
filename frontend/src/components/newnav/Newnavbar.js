import React from "react";
import "./Newnavbar.css";
import logo from "../images/prime_logo.svg";
import logo2 from "../images/Amazon_Prime_logo.png";
function Newnavbar() {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          <p>All</p>
          <p>Sell</p>
          <p>Best Sellers</p>
          <p>Customer Service</p>
          <p>Todays Deals</p>
          <p>Books</p>
          <p>Electorincs</p>
          <p>Fashion</p>
          <p>Computers</p>
          <p>Home & Kitchen</p>
          <p>Amazon Pay</p>
        </div>

        <div className="right_data">
          <img src={logo2} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Newnavbar;
