import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/client";
import bcrypt from "bcrypt";

type CustomUserWhereUniqueInput = {
    id?: number;
    email?: string;
};

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: email as CustomUserWhereUniqueInput,
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Successfully logged in" });
}
