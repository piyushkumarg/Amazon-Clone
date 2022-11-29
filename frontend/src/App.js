import "./App.css";
import Navbar from "./components/header/Navbar";
import Newnavbar from "./components/newnav/Newnavbar";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import SignUp from "./components/signup_signin/SignUp";
import SignIn from "./components/signup_signin/SignIn";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Newnavbar />
      <Routes>
        <Route path="/" element={<Maincomp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/getproducts/:id" element={<Cart />} />
        <Route path="/buynow" element={<Buynow />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
