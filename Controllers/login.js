const express = require("express");
const loginRouter = express.Router();
const { User, connectDB } = require('../Models/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const secret = process.env.secret;

//getting
loginRouter.get("/", (req, res) => {
    

  errorMessage = null;
          const data = {
            errorMessage: errorMessage
          };
  
  res.render("login", {data});
});

//posting
loginRouter.post("/", async(req, res) => {
    try {
        const { email, password} = req.body;
      
          // Check if the email exists in the database
          const user = await User.findOne({ email: email });

          
          
      
          if (!user) {
            errorMessage = " Email not found";
          const data = {
            errorMessage: errorMessage
          };
      
          return res.render('login', {data});
            // return res.status(400).send("Email not registered");
          }
      
          // Compare the hashed passwords
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
              console.error(err); // Log the error for debugging
              return res.status(500).send("Internal Server Error");
            }
      
            if (!result) {
              // return res.status(401).send("Invalid Password");
              errorMessage = " wrong password";
          const data = {
            errorMessage: errorMessage
          };
      
          return res.render("login", {data});
            }
      
            // If password is correct, create and send JWT
            const token = jwt.sign({ email: user.email, password: user.password, name: user.name ,image: user.image,role: user.role}, secret, { expiresIn: "1h" });
            res.cookie("jwtToken", token, { maxAge: 3600000, httpOnly: true });
                if (user.role != "admin" && user.role != "SuperAdmin") {
                  res.redirect('/dashboardempl');
                } else {
                  res.redirect('/dashboard');
                }
          });
        
      // res.redirect('/dashboard');
      
      } catch (err) {
        console.error("An error occurred:", err);
        return res.status(500).send("Internal Server Error");
      }
      
});

  
  

module.exports = loginRouter;