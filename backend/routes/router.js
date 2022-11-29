const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenicate = require("../middleware/authenticate");

//get productsdata api
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find();
    // console.log("console data", productsdata);
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + error.message);
  }
});

// get individual data
router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);

    const individual = await Products.findOne({ id: id });
    // console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});

// register the data
router.post("/register", async (req, res) => {
  //console.log(req.body);
  const { fname, email, mobile, password, cpassword } = req.body;

  if (!fname || !email || !mobile || !password || !cpassword) {
    res.status(422).json({ error: "fill the all details" });
    //console.log("no data available");
  }

  try {
    const preuser = await USER.findOne({ email: email });

    if (preuser) {
      res.status(422).json({ error: "This email is already exist" });
    } else if (password !== cpassword) {
      res.status(422).json({ error: "password are not matching" });
    } else {
      const finaluser = new USER({
        fname,
        email,
        mobile,
        password,
        cpassword,
      });

      // Do hasging here for security purpose of password

      const storedata = await finaluser.save();
      // console.log(storedata + "user successfully added");
      res.status(201).json(storedata);
    }
  } catch (error) {}
});

// login  user data
router.post("/login", async (req, res) => {
  // console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "fill the details" });
  }

  try {
    const userlogin = await USER.findOne({ email: email });
    // console.log(userlogin + "user value");

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);
      // console.log(isMatch + "pass match");

      //token generate
      const token = await userlogin.generatAuthtoken();
      //  console.log(token);

      res.cookie("ecommerce", token, {
        expires: new Date(Date.now() + 2589000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "invalid crediential pass" });
      } else {
        res.status(201).json(userlogin);

        // res.status(201).json(userlogin);
      }
    } else {
      res.status(400).json({ error: "user not exist" });
    }
  } catch (error) {
    res.status(400).json({ error: "invalid crediential pass" });
    // console.log("error the bhai catch ma for login time" + error.message);
  }
});

// adding the data into cart
router.post("/addcart/:id", authenicate, async (req, res) => {
  try {
    //console.log("perfect 6");
    const { id } = req.params;
    const cart = await Products.findOne({ id: id });
    // console.log(cart + "cart milta hain");

    const Usercontact = await USER.findOne({ _id: req.userID });
    //  console.log(Usercontact + "user milta hain");

    if (Usercontact) {
      const cartData = await Usercontact.addcartdata(cart);

      await Usercontact.save();
      // console.log(cartData + " thse save wait kr");
      // console.log(Usercontact + "userjode save");
      res.status(201).json(Usercontact);
    } else {
      res.status(401).json({ error: "invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid user" });
    console.log(error);
  }
});

//get cart details
router.get("/cartdetails", authenicate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    //console.log(buyuser + "user hain buy pr");
    res.status(201).json(buyuser);
  } catch (error) {
    console.log(error + "error for buy now");
  }
});

// get user is login or not
router.get("/validuser", authenicate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    //console.log(validuserone + "user hain home k header main pr");
    res.status(201).json(validuserone);
  } catch (error) {
    console.log(error + "error for valid user");
  }
});

// remove item from the cart
router.get("/remove/:id", authenicate, async (req, res) => {
  try {
    const { id } = req.params;

    req.rootUser.carts = req.rootUser.carts.filter((curel) => {
      return curel.id != id;
    });

    req.rootUser.save();
    res.status(201).json(req.rootUser);
    // console.log("item remove");
  } catch (error) {
    console.log(error + "jwt provide then remove");
    res.status(400).json(error);
  }
});

// for userlogout
router.get("/logout", authenicate, async (req, res) => {
  try {
    //for token
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token;
    });

    //to clear cookie
    res.clearCookie("ecommerce", { path: "/" });
    req.rootUser.save();
    res.status(201).json(req.rootUser.tokens);
    //console.log("user logout");
  } catch (error) {
    console.log(error + "jwt provide then logout");
  }
});

module.exports = router;
