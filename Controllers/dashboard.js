const express = require("express");
const { User } = require("../Models/db");
const dashRouter = express.Router();
 
//getting
dashRouter.get("/", async (req, res) => {
  try {
    if (User.role == "employee") {
      res.redirect('/dashboardempl')
    }
    const users = await User.find({});
    const admin = await User.findOne({email: req.user.email});
    
    res.render("dashboard", {users , admin});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

    
  });

  //posting
//   dashRouter.post("/", (req, res) => {
      
    
//       res.redirect("dashboard");
//     });
  
  module.exports = dashRouter;