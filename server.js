const express = require("express");
const app = express();
const { User, connectDB } = require("./Models/db");

const bodyparser = require("body-parser");
const xss = require("xss");
const axios = require("axios");
const cookies = require("cookie-parser");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();


const port = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
// const secret = process.env.secret;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyparser.json());
app.use(cookies());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, (req, res) => {
      console.log(`mconnecti l DB, o listening on http://localhost:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};
start();

// Load routes
const routes = require("./Routes");
app.use("/", routes);

// creating the first admin
// const newUser = new User({
//   email: "yassir@example.com",
//   password: "superadminpassword", // Remember to hash this password before saving
//   name: "Yassir Hakimi",
//   salary: 100000, // Just an example value
//   age: 30, // Just an example value
//   role: "SuperAdmin",
// });

//   newUser.save()
//   .then(result => {
//     // Handle the result
//   })
//   .catch(err => {
//     console.error(err);
//   });
