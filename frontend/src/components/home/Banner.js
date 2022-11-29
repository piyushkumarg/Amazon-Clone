import React from "react";
import "./Banner.css";
import Carousel from "react-material-ui-carousel";
const data = [
  "https://images-eu.ssl-images-amazon.com/images/W/WEBP_402378-T1/images/G/31/prime/Jup22/Prime_PC_FT.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/CEPC/Jup22/33/1/2/Unrec_Wishlistnow_Header_1500x300.gif",
  "https://images-na.ssl-images-amazon.com/images/G/31/img21/audio/boat/priceupdated/1500x300-SN._CB630001822_.gif",
  "https://images-na.ssl-images-amazon.com/images/G/31/img21/audio/ele/bau/coop/1500x300_5._CB632282478_.gif",
  // "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50",
  // " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  // "https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50",
  // "https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50",
  // "https://rukminim1.flixcart.com/flap/1680/280/image/ff938f15fd1feb73.jpg?q=50",
  // "https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/02653545574e57f1.jpeg?q=50",
  // "https://rukminim1.flixcart.com/fk-p-flap/1680/280/image/a0a5d1c6f8df28b8.jpg?q=50",
];

function Banner() {
  return (
    <Carousel
      className="carosuel"
      autoPlay={true}
      animation="slide"
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: { backgroundColor: "#ffffff", opacity: 0.1, color: "black" },
      }}
    >
      {data.map((imag, i) => {
        return <img key={i} src={imag} alt="" className="banner_img" />;
      })}
    </Carousel>
  );
}

export default Banner;
