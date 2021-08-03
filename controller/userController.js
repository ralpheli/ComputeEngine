const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/signup.model");

router.get("/", (req, res) => {
  res.render("registration/signup", {
    viewTitle: "Marriage Hall Booking User Sign Up!",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
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
    if (!err) res.redirect("user/signuplist");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("registration/signup", {
          viewTitle: "Student Housing Buddy User Signup",
          user: req.body,
        });
      } else console.log("Error in signing up:" + err);
    }
  });
}

function updateRecord(req, res) {
  User.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("user/signuplist");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("registration/signup", {
            viewTitle: "Update Profile",
            user: req.body,
          });
        } else console.log("Error updating the profile: " + err);
      }
    }
  );
}

router.get("/signuplist", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.render("registration/signuplist", {
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

router.get("/:id", (req, res) => {
  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("registration/signup", {
        viewTitle: "Update Profile",
        user: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/user/signuplist");
    } else {
      console.log("Error in deleting profile:" + err);
    }
  });
});

module.exports = router;
