import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/client";
import { generateToken } from "../../../utils/jwt";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

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
        where: {
            email: email,
        } as CustomUserWhereUniqueInput,
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ email });

    const cookie = serialize("jwt", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 1 day
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });

    res.setHeader("Set-Cookie", cookie);

    res.status(200).json({ token });
}
