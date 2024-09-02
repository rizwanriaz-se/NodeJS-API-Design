import jwt from "jsonwebtoken";
import bcryp from "bcrypt";

export const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
  return bcrypt.hash(password, 10)
}


export const createJWT = (user) => {
  const token = jwt.sign(
    { user: user.id, username: user.username },
    process.env.JWT_SECRET,
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" "); //getting the second part in Bearer <token>
  if (!token) {
    res.status(401);
    res.json({ message: "Token not found" });
    return;
  }

  // Try catch block so that if the token is invalid, it will not crash the server
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Not a valid token" });
    return;
  }
};
