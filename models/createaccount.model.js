const mongoose = require("mongoose");

var createaccountSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: "*Required.",
  },
  MiddleName: {
    type: String,
    required: false,
  },
  LastName: {
    type: String,
    required: "*Required",
  },
  Email: {
    type: String,
    required: "*Required",
  },
  Username: {
    type: String,
    required: "*Required",
  },
  Password: {
    type: String,
    required: "*Required",
  },
});

// Custom validation for email
createaccountSchema.path("Email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

Account = mongoose.model("Createaccount", createaccountSchema);
module.exports = Account;
