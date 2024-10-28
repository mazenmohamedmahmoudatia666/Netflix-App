// protectRoute.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - No Token Provided" });
    }

    const splitToken = token.split(" ");
    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized - Invalid Token Format",
        });
    }

    const decoded = jwt.verify(splitToken[1], ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error); // Log the full error
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
