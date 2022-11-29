import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Buynow.css";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";

function Buynow() {
  const [cartdata, setCartdata] = useState("");
  //console.log(cartdata.carts, "buynow page");

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data.carts);

    if (res.status !== 201) {
      alert("no data available");
    } else {
      // console.log("data cart main hain");
      setCartdata(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <div className="left_buy_desc">
                <p>Select all items</p>
                <p>Price</p>
              </div>

              <Divider />

              {cartdata.map((e, k) => {
                return (
                  <>
                    <div className="item_container">
                      <img src={e.detailUrl} alt="image" />

                      <div className="items_details_desc">
                        <div className="items_details">
                          <h3>{e.title.longTitle}</h3>
                          <h3>{e.title.shortTitle}</h3>
                          <h3 className="different_price">₹{e.price.cost}</h3>
                          <p className="unusall">Usually dispached in 8 days</p>
                          <p>Eligible for FREE shopping</p>
                          <img
                            src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png"
                            alt=""
                          />
                          <Option deletedata={e.id} get={getdatabuy} />
                        </div>
                        <h3 className="item_price">₹{e.price.cost}</h3>
                      </div>
                    </div>
                    <Divider />
                  </>
                );
              })}
              <Subtotal item={cartdata} />
            </div>
            <Right item={cartdata} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Buynow;
