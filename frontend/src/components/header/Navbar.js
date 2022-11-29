import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../images/amazon_logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Avatar from "@mui/material/Avatar";
import { Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Logincontext } from "../context/Contextprovider";
import Rightheader from "./Rightheader";

function Navbar() {
  const { account, setAccount } = useContext(Logincontext);
  // console.log("navbar", account);

  const history = useNavigate();

  const getdetailsvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    // console.log(data + " hi piyush");

    if (res.status !== 201) {
      console.log("first login");
    } else {
      // console.log("cart add ho gya hain");
      setAccount(data);
    }
  };

  useEffect(() => {
    getdetailsvaliduser();
  }, []);

  const [dropen, setDropen] = useState(false);

  //for drawer
  const handleopen = () => {
    setDropen(true);
  };

  const handledrClose = () => {
    setDropen(false);
  };

  //
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // for logout
  const logoutuser = async () => {
    const res2 = await fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    //const data2 = await res2.json();
    // console.log(data2);

    if (!res2.status === 201) {
      const error = new Error(res2.error);
      throw error;
    } else {
      setAccount(false);
      setOpen(false);
      toast.success("user Logout 😃!", {
        position: "top-center",
      });
      history("/");
    }
  };

  return (
    <div className="nav_bar">
      <div className="left">
        <IconButton className="hamburgur" onClick={handleopen}>
          <MenuIcon style={{ color: "#fff" }} />
        </IconButton>
        {/* here define the right header */}
        <Drawer open={dropen} onClose={handledrClose}>
          <Rightheader logclose={handledrClose} />
        </Drawer>

        <div className="nav_logo">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
        </div>
        <div className="search_bar">
          <input type="text" name="" id="" />
          <div className="search_icon">
            <SearchIcon id="search" />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="nav_btn">
          <NavLink to="/login"> SignIn</NavLink>
        </div>

        {account ? (
          <NavLink to="/buynow" style={{ textDecoration: "none" }}>
            <div className="cart_btn">
              <Badge
                badgeContent={account == null ? 0 : account.carts.length}
                // badgeContent={0}
                color="primary"
              >
                <AddShoppingCartIcon id="icon" />
              </Badge>
              <p>Cart</p>
            </div>
          </NavLink>
        ) : (
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <div className="cart_btn">
              <Badge badgeContent={0} color="primary">
                <AddShoppingCartIcon id="icon" />
              </Badge>
              <p>Cart</p>
            </div>
          </NavLink>
        )}

        {account ? (
          <Avatar
            className="avtar2"
            onClick={handleClick}
            title={account.fname.toUpperCase()}
          >
            {account.fname[0].toUpperCase()}
          </Avatar>
        ) : (
          <Avatar className="avtar" onClick={handleClick} />
        )}

        <div className="menu_div">
          <Menu
            anchorEl={open}
            open={Boolean(open)}
            onClose={handleClose}
            // className={classes.component}
          >
            <MenuItem onClick={handleClose} style={{ margin: 10 }}>
              My account
            </MenuItem>
            {account ? (
              <MenuItem style={{ margin: 10 }} onClick={logoutuser}>
                <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} /> Logout
              </MenuItem>
            ) : (
              ""
            )}
          </Menu>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Navbar;
