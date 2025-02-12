const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Basic manual validation
    if (!fullname || fullname.length < 3)
      return res
        .status(400)
        .send("Full name must be at least 3 characters long");
    if (!email || !/.+@.+\..+/.test(email))
      return res.status(400).send("Please provide a valid email address");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password must be at least 6 characters long");
    // if (!contact || isNaN(contact))
    //   return res.status(400).send("Please provide a valid contact number");

    const existUser = await userModel.findOne({ email });
    if (existUser){
      req.flash("error", "User Already Registered");
      return res.redirect("/");  // Redirect back to the registration page with the flash message
    }
    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      fullname,
      email,
      password: hashPass,
    });

    let token = generateToken(user);
    res.cookie("token", token, { httpOnly: true, secure: true });
    req.flash("success", "User Created Succesfully!");
    res.redirect('/');
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
};

module.exports.loginUser = async (req, res) =>{
try {
  const {email, password} = req.body;
  const user = await userModel.findOne({email: email});
  if(!user) return res.status(201).send("Email and password incorrect");
  bcrypt.compare(password, user.password, (err, result)=>{
    if(result){
      let token = generateToken(user);
      res.cookie("token", token);
      req.flash("success", "Login successful! Welcome back.");
      res.redirect('/shop');
    }else{
      req.flash("error", "Email and password are incorrect.");
      res.redirect("/", );
    }
  })
} catch (error) {
  req.flash("error", "Something Went Wrong!");
}

};

module.exports.logoutUser = function (req, res) {
 
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("An error occurred during logout.");
    }
    res.clearCookie("token");
    res.redirect("/");
  });  
};

