import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/client";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { fullName: name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10); // hash the password with 10 salt rounds
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword, // store the hashed password in the database
        },
      });

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
