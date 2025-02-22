const jwt = require("jsonwebtoken");

// exports.verifyToken = (req, res, next) => {
//   const token = req.header("Authorization"); 
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const extractedToken = token.split(" ")[1];
//     if (blacklistedTokens.includes(extractedToken)) {
//       return res.status(401).json({ message: "Token has been revoked" });  // 👈 Block blacklisted tokens
//     }

//     const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };

exports.verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization"); 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access Denied, No Token Provided" });
    }
  
    try {
      const extractedToken = authHeader.split(" ")[1];
  
      const verified = jwt.verify(extractedToken, process.env.JWT_SECRET);
      req.user = verified;
      next();
    } catch (err) {
      console.error("JWT Verification Error:", err.message);
      res.status(400).json({ message: "Invalid Token" });
    }
  };
