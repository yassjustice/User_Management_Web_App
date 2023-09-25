const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true, // Makes the email attribute unique
      required: true, // Makes the email attribute required
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      default: 0, // Default value set to 0
    },
    age: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: true,
      default: "Layer 1.png",
    },
    active: {
      type: Boolean,
      required: true,
    },
    role: {
      type: String,
      enum: ["SuperAdmin", "admin", "employee"],
      default: "employee",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// const User = mongoose.model('User', userSchema);

module.exports = {
  User: mongoose.model("User", userSchema),
  connectDB,
};
