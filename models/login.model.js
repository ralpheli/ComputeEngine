const mongoose = require("mongoose");

var loginSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: "*Required",
  },
  Password: {
    type: String,
    required: "*Required",
  },
});

Login = mongoose.model("Login", loginSchema);

module.exports = Login;
