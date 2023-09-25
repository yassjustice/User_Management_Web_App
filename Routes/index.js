const express = require('express');
const router = express.Router();
const multer = require('multer');
const loginRouter = require('../Controllers/login');
const dashRouter = require('../Controllers/dashboard');
const { createUser, updateUser, deleteUser } = require('../Controllers/users');
const dashemplRouter = require('../Controllers/dashboardempl');
const authenticate = require('../Middlewares/authenticate');
const logoutRouter = require('../Controllers/logout');
const preventAccess = require('../Middlewares/preventaccess');



//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder for uploaded files
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      // Define the filename for uploaded files
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });



  router.use('/login', preventAccess, loginRouter);
  router.use('/logout', logoutRouter);
  router.use(authenticate);

  // router.use('/dashboard', authenticate, dashRouter);
  router.use('/dashboard', dashRouter);
  router.post('/createUser', upload.single("image1") , createUser);
  router.post('/updateUser', upload.single("image2"), updateUser);
  router.delete('/deleteUser/:id', deleteUser);
  router.use('/dashboardempl', dashemplRouter);

  module.exports = router;
