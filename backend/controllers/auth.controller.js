import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
  console.log("signup called");
  try {
    const { fullname, username, password, confirmpassword, gender } = req.body;
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    generateToken(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      _id: newUser._id,
      fullname: newUser.fullname,
      username: newUser.username,
      username: newUser.username,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong at myside" });
  }
};

//logic function for login

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = user.password === password;
    if (!user || isPasswordCorrect === false) {
      return res.status(404).json({ message: "Username or password is incorrect" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong at login" });
  }
};

//logic function for logout
export const logout =async  (req, res) => {
  try {
    res.cookie(
        "jwt",
        "",
        {
            maxAge: 0,
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV !== "development",
        }
        );
    res.status(200).json({ message: "Logout successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Something went wrong at logout" });
    
  }
};
