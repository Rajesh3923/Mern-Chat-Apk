import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;//extracting from the cookies 
    if (!token) {
      return res
        .status(401)
        .json({ message: "You are not authorized,no token provided..." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);//verifyng the token with the secret key while signing
    if (!decoded) {
      return res.status(401).json({
        message: "You are not authorized,token verification failed...",
      });
    }
    // console.log("User ID:", decoded.userId);
    const user = await User.findOne({_id:decoded.userId}).select("-password");//removing the pwd feild
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;// making request to carry the curr user id via  req
    next();//used to called the next func i.e., "sendMessage" in message.controller.js
  } catch (error) {
    console.log("error at protect route middleware", error.message);
    res.status(401).json({ message: "You are not authorized" });
  }
};
export default protectRoute;
