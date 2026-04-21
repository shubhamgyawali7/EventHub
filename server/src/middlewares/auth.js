import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authHeader = req.headers?.authorization;
  let authToken;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    authToken = authHeader.split(" ")[1];
  } else if (req.cookies?.authToken) {
    authToken = req.cookies.authToken;
  } else if (req.headers.cookie) {
    // Fallback for manual parsing if preferred, but safer
    const cookies = req.headers.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    authToken = cookies.authToken;
  }

  if (!authToken || authToken === "undefined" || authToken === "null") {
    return res.status(401).send("Unauthorized..");
  }


    // verify a token 
jwt.verify(authToken, process.env.JWT_SECRET, function(error, data) {
    if(error){
        return res.status(401).send("Unauthrized..");
    }
     req.user=data;
     next();
  });
   
}
export default auth;