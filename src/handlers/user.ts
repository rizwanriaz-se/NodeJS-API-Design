import prisma from "../db";
import { hashedPassword, createJWT } from "../modules/auth";

export const createUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};


export const signIn = async(req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  if (user) {
    const isValid = await comparePasswords(req.body.password, user.password)
    if (isValid) {
      const token = createJWT(user)
      res.json({ token })
    } else {
      res.status(401).json({ message: "Invalid credentials" })
    }
  }
}