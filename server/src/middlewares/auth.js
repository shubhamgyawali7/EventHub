import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authHeader = req.headers?.authorization;
  let authToken;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    authToken = authHeader.split(" ")[1];
  } else {
    const cookie = req.headers.cookie;
    if (!cookie) return res.status(401).json({ message: "Unauthorized" });
    authToken = cookie.split("=")[1];
  }

  if (!authToken) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(authToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ✅ decoded contains { id, role }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
}

export default auth;
