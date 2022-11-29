import React, { useEffect } from "react";
import Banner from "./Banner";
import "./Maincomp.css";
import Slide from "./Slide";
import { getProducts } from "../redux/actions/action";
import { useDispatch, useSelector } from "react-redux";

function Maincomp() {
  const { products } = useSelector((state) => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="home_section">
      <div className="banner_part">
        <Banner />
      </div>

      <div className="slide_part">
        <div className="left_slide">
          <Slide title="Deal of the Day" products={products} />
        </div>
        <div className="right_slide">
          <img
            src="https://rukminim1.flixcart.com/fk-p-flap/464/708/image/164c4928aebf4d14.jpg?q=70"
            alt="rightimg"
          />
        </div>
      </div>

      <Slide title="Today's Deal" products={products} />
      <div className="center_img">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/sabikhit/Jupiter/WTS/MSO/D55564502_1242x450_header.gif"
          alt=""
        />
      </div>
      <Slide title="Best Seller" products={products} />
      <Slide title="Upto 80% off" products={products} />
    </div>
  );
}

export default Maincomp;
