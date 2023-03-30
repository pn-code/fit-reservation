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
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
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
