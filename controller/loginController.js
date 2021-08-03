const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.render("registration/login", {
    viewTitle: "Marriage Hall Booking Reservation",
  });
});

router.post("/", (req, res) => {
  var Username = req.body.Username;
  var Password = req.body.Password;
  if (Username == "staff" && Password == "staff12345") {
    res.render("registration/staff");
  } else if (Username == "admin" && Password == "admin12345") {
    res.render("registration/admin");
  } else if (Username === req.body.Username && Password === req.body.Password) {
    res.render("registration/homepage", {
      viewTitle: Username,
    });
  }
});

module.exports = router;
