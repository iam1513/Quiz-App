const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  // header -> token
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new Error("Not Authenticated");
  }

  // bearer is written at start so we need to split it to get just the token
  const token = authHeader.split(" ")[1];

  // decoded token
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "cobra_secret");
  } catch (error) {
    throw new Error("Not Authenticated");
  }

  if (!decodedToken) {
    throw new Error("Not Authenticated");
  }

  // Extract userId from decodedToken
  const userId = decodedToken.id;

  // Pass userId to the next middleware or route handler
  req.userId = userId;
  // console.log(userId);

  next();
};

module.exports = { authenticate };
