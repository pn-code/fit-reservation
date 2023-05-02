import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

const getCurrentBF = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error;

        const bodyfats = await prisma.bodyFatMeasurement.findMany({
            where: {
                userId: user.id,
            },
        });

        if (bodyfats.length === 0) return undefined;

        return bodyfats[bodyfats.length - 1].bodyfat!;
    } catch (error) {
        console.error(error);
    }
};

export default getCurrentBF;
