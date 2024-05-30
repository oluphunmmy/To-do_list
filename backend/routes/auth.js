const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
//SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // const hashpassword = bcrypt.hash(password);
    const user = new User({ email, username, password });
    await user
      .save()
      .then(() => res.status(200).json({ message: "Sign Up Successfull" }));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found. Please Sign Up First" });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ user: others });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;