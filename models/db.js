const mongoose = require("mongoose");
require("../models/registration.model ");

mongoose.connect(
  "mongodb+srv://ralph-admin:thehulk123@cluster0.uwqyc.mongodb.net/Reservation-app",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);
