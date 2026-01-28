import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { ROLES } from "../constants/roles.js";

export const protect = async (req, res, next) => {
  let token;
  if (req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({ message: "Forbidden" });
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};
