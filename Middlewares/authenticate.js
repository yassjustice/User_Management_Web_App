const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const cookies = require('cookie-parser');
const secret = process.env.secret;
function authenticate(req, res, next) {
    const token = req.cookies.jwtToken; // Assuming you named the cookie 'jwtToken'
    // console.log(token);
    if (!token) {
      return res.redirect('/login'); // Redirect to login if token is not present
    }
  
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.redirect('/login'); // Redirect to login if JWT is invalid
      }
  
      const { email, name, password, role } = decoded;
  
      req.user = { email, name, password, role };
      
      
      next(); // Proceed to the dashboard route
    });
    
  }
  module.exports = authenticate;