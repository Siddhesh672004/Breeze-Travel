// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// const User = require("../model/user.model");

// const loginHandler = async (req, res) => {
//   try {
//     const user = await User.findOne({ number: req.body.number });
//     !user && res.status(401).json({ message: "Incorrect Mobile Number" });

//     const decodedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.PASSWORD_SECRET_KEY
//     ).toString(CryptoJS.enc.Utf8);
//     decodedPassword !== req.body.password &&
//       res.status(401).json({ message: "Incorrect Password" });

//     const { password, ...rest } = user._doc;
//     const accessToken = jwt.sign(
//       { username: user.username },
//       process.env.ACCESS_TOKEN
//     );

//     res.json({ ...rest, accessToken });
//   } catch (err) {
//     console.log(err, "eeeeeeeeeeee");
//   }
// };

// module.exports = loginHandler;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");

const loginHandler = async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });

    if (!user) {
      return res.status(401).json({ message: "Incorrect Mobile Number" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect Password" });
    }

    const { password, ...rest } = user._doc;

    const accessToken = jwt.sign(
      { username: user.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" }
    );

    return res.json({ ...rest, accessToken });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = loginHandler;
