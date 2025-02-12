const mongoose = require("mongoose");
const config = require('config');
const dbgr = require('debug')("development:mongoose");

//$env:DEBUG="development:*"  commant for dbug

mongoose
  .connect(`${config.get("MONGODB_URI")}/sketch`)
  .then(function () {
    dbgr("Database Connected SuccessFully");
  })
  .catch(function (err) {
    dbgr
    ("Database Connection Error:", err);
  });

module.exports = mongoose.connect;
