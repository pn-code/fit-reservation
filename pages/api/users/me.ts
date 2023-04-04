import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "../../../utils/jwt";
import { prisma } from "../../../lib/client";

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        res.status(405).json({ message: "Method not allowed" });
        return;
    }

    const token = req.cookies.jwt;

    if (!token) {
        res.status(401).json({ message: "Unauthorized, no token" });
        return;
    }

    let decodedToken;

    try {
        decodedToken = verifyToken(token);
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized, token cannot be verified.",
        });
        return;
    }

    const user = await prisma.user.findUnique({
        where: { email: decodedToken.email },
        select: { id: true, name: true, email: true },
    });

    if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    res.status(200).json(user);
}
