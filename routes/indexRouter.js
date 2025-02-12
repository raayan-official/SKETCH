const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    let error = req.flash("error");
    let success = req.flash("success");
    let products = await productModel.find().lean();
    res.render("shop", { products, error, success, user: req.user});
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  try {
    console.log(req.user)
    let user = await userModel.findOne(req.user);
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Add To Cart");
    res.redirect("/shop");
  } catch (error) {
    res.status(404).send(error);
  }
});


router.get("/cart", isLoggedIn, async (req, res) => {
  
  try {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", user)
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/admin", async (req, res) => {
  res.render("owner-login");
});

module.exports = router;
