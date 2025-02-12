const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-modle");

// $env:NODE_ENV="development" command for set enviourmental variable

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(504)
        .send("You don't have Permission to create a new owner");
    }
    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

router.get("/admin", function (req, res) {
  const successMessage = req.flash("success");
  const errorMessage = req.flash("error");
  res.render("createproducts", { successMessage, errorMessage });
  
});

module.exports = router;
