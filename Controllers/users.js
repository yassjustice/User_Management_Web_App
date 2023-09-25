const sendEmail = require("../Middlewares/sendemail");
const { User } = require("../Models/db");
// const dashRouter = require("./dashboard");
const bcrypt = require('bcrypt');


exports.createUser= async (req,res)=>{
    //getting blog info from user
    let saltRounds = 10;
    const {username, email1, password, age,salary, role, active} = req.body;
    let image1;
    if (req.file) {
    image1 = req.file.filename;
    }
    // console.log(image);
    //send userpassword in email
    try {
      await sendEmail({
        email: email1,
        subject: "you are now one of the personnel",
        text: `Hello,\n\nWelcome to the team. You can now log in using your email and the following temporary password:\n\nEmail: ${email1}\nPassword: ${password}\n\nPlease make sure to change your password after logging in for the first time for security reasons.\n\nThank you for joining!\n\nBest regards,\n[User Management Team]`,
      });
    } catch (err) {
      console.log(err.message);
    }


    //hash password
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
      if (err) {
        // Handle the error (e.g., return an error response)
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
  
      // 'hashedPassword' is the hashed password that you'll store in the database
      const lol = hashedPassword;
      // Save user to mangodb 
      const newUser=  new User({
        name: username,
        email:email1,
        password: hashedPassword,
        age: parseInt(age),
        salary: parseInt(salary),
        role,
        active,
        image: image1
    });
    newUser.save()
  .then(result => {
    // Handle the result
  })
  .catch(err => {
    console.error(err);
  });

    res.redirect("/dashboard");

      
    
    });
    
}


exports.updateUser = async (req, res) => {
  try {
    const {username, email, password, age,salary, role, active} = req.body;
    let image2;
    if (req.file) {
    image2 = req.file.filename;
    }
    
    console.log(req.body);
    console.log("usern",username);
    console.log("email",email);
    console.log("password",password);
    console.log("age",age);
    const editting = await User.findOne({ email: email });
    console.log(editting);
    
    
     
    if (!editting) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user properties
    editting.username = username;
    editting.password = password;
    editting.age = age;
    editting.salary = salary;
    editting.role = role;
    editting.active = active;
    if (image2) {
      editting.image = image2;
    }
    

    // Save the changes
    await editting.save();

    
    res.redirect('/dashboard');

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.deleteUser = async (req, res) =>{
  try {
    const id = req.params.id;
    console.log(id);
    bro = await User.findOne({_id: id});
    console.log(bro);
    await User.deleteOne({ _id: id })
    // console.log(deleting);
    res.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}