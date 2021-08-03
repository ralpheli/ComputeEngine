const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/signup.model");

router.get("/", (req, res) => {
  res.render("registration/createaccount");
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var user = new User();
  user.FirstName = req.body.FirstName;
  user.MiddleName = req.body.MiddleName;
  user.LastName = req.body.LastName;
  user.Email = req.body.Email;
  user.Username = req.body.Username;
  user.Password = req.body.Password;
  user.save((err, doc) => {
    if (!err) res.redirect("createaccount/viewaccount");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("registration/createaccount", {
          viewTitle: "Marriage Hall Booking User Sign Up!",
          user: req.body,
        });
      } else console.log("Error in signing up:" + err);
    }
  });
}

router.get("/viewaccount", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.render("registration/viewaccount", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving profile list:" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "StudentID":
        body["StudentIDError"] = err.errors[field].message;
        break;
      case "FirstName":
        body["FirstNameError"] = err.errors[field].message;
        break;
      case "MiddleName":
        body["MiddleNameError"] = err.errors[field].message;
        break;
      case "LastName":
        body["LastNameError"] = err.errors[field].message;
        break;
      case "Email":
        body["EmailError"] = err.errors[field].message;
        break;
      case "Username":
        body["UsernameError"] = err.errors[field].message;
        break;
      case "Password":
        body["PasswordError"] = err.errors[field].message;
        break;

      default:
        break;
    }
  }
}

module.exports = router;
