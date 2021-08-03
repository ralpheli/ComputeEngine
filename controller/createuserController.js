const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Registration = mongoose.model("Registration");

router.get("/", (req, res) => {
  res.render("registration/createuser");
});

router.post("/", (req, res) => {
  insertRecord(req, res);
});

function insertRecord(req, res) {
  var registration = new Registration();

  registration.FirstName = req.body.FirstName;
  registration.MiddleName = req.body.MiddleName;
  registration.LastName = req.body.LastName;
  registration.Age = req.body.Age;
  registration.Address = req.body.Address;
  registration.PhoneNumber = req.body.PhoneNumber;
  registration.Email = req.body.Email;
  registration.RegDate = req.body.RegDate;
  registration.Notes = req.body.Notes;
  registration.save((err, doc) => {
    if (!err) res.redirect("createuser/viewuser");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("registration/createuser", {
          registration: req.body,
        });
      } else console.log("Error in registration: " + err);
    }
  });
}

router.get("/viewuser", (req, res) => {
  Registration.find((err, docs) => {
    if (!err) {
      res.render("registration/viewuser", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving registration list:" + err);
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
      case "Age":
        body["AgeError"] = err.errors[field].message;
        break;
      case "Address":
        body["AddressError"] = err.errors[field].message;
        break;
      case "PhoneNumber":
        body["PhoneNumberError"] = err.errors[field].message;
        break;
      case "Email":
        body["EmailError"] = err.errors[field].message;
        break;
      case "SchoolYear":
        body["SchoolYearError"] = err.errors[field].message;
        break;
      case "StartDate":
        body["StartDateError"] = err.errors[field].message;
        break;
      case "EndDate":
        body["EndDateError"] = err.errors[field].message;
        break;
      case "Notes":
        body["NotesError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

module.exports = router;
