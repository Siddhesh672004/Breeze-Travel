const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const singupHandler = async (req, res) => {
  const { username, number, email, password } = req.body;
  console.log(
    username,
    number,
    email,
    password,
    "username, number, email, password"
  );
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username: username,
      number: number,
      email: email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser, "ssssssssss");
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating a user" });
  }
};

module.exports = singupHandler;
