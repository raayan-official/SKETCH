const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, color, price, discount, bgcolor, panelcolor, textcolor } =
    req.body;
  const product = await productModel.create({
    image: req.file.buffer,
    name,
    color,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
  req.flash("success", "Product Created Succesfully!");
  res.redirect("/owners/admin");
  } catch (error) {
    res.status(201).send("error");
  }
});

module.exports = router;
