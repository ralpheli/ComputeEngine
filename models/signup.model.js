const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
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
userSchema.path("Email").validate((val) => {
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
};

User = mongoose.model("User", userSchema);
module.exports = User;
