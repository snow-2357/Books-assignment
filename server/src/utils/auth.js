import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "password");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
