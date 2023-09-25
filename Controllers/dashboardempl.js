const express = require("express");
const { User } = require("../Models/db");
const dashemplRouter = express.Router();
 
//getting
dashemplRouter.get("/", async (req, res) => {
  try {
    
    const trying = await User.findOne({email: req.user.email});
    
    res.render("dashboardempl", {trying});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

    
  });

  //posting
//   dashRouter.post("/", (req, res) => {
      
    
//       res.redirect("dashboard");
//     });
  
  module.exports = dashemplRouter;