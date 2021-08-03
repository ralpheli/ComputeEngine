require("./models/db");

const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

const registrationController = require("../Registration-app/controller/registrationController");
const createAccountController = require("../Registration-app/controller/createaccountController");
const createUserController = require("../Registration-app/controller/createuserController");
const loginController = require("../Registration-app/controller/loginController");
const userController = require("../Registration-app/controller/userController");

var app = express();
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainlayout",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + "/views/layouts/",
  })
);
app.set("view engine", "hbs");
app.use(express.static("views"));

app.listen(3000, () => {
  console.log("Express server started at port : 3000");
});

app.use("/registration", registrationController);
app.use("/user", userController);
app.use("/login", loginController);
app.use("/createuser", createUserController);
app.use("/createaccount", createAccountController);
