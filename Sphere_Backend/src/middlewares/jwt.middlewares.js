import { jwtVerify } from "jose";
import { JWT_PRIVATE_KEY } from "../config.js";

export const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ message: "Token not provided" });

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      authorization,
      encoder.encode(JWT_PRIVATE_KEY)
    );

    req.user_name = payload.user_name;
    req.user_id = payload.user_id;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
