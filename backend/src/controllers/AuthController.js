const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user) {
      return res.status(400).json({ message: "User already registered." });
    }

    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });
    newUser.save((error, data) => {
      if (error) {
        return res.status(400).json({ message: "Something went wrong!" });
      }
      // if (data) {
      //   return res
      //     .status(201)
      //     .json({ message: "User registered successfully!", user: data });
      // }
      if (user) {
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        return res.status(201).json({
          message: "User registered successfully!",
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      }
    });
  });
};

const signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPasswordValid = await user.authenticate(req.body.password);
      if (isPasswordValid && user.role === "user") {
        // const token = jwt.sign(
        //   { _id: user._id, role: user.role },
        //   process.env.JWT_SECRET,
        //   {
        //     expiresIn: "2d",
        //   }
        // );
        const token = generateJwtToken(user._id, user.role);
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        res.status(400).json({ message: "Invalid Password." });
      }
    } else {
      return res.status(400).json({ message: "User Not Found." });
    }
  });
};

const signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Signed out successfully!" });
};

module.exports = { signup, signin, signout };
