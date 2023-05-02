import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

const getCurrentWeight = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error;

        const weights = await prisma.weightMeasurement.findMany({
            where: {
                userId: user.id,
            },
        });

        if (weights.length === 0) return undefined;

        return weights[weights.length - 1].weight;
    } catch (error) {
        console.error(error);
    }
};

export default getCurrentWeight;
