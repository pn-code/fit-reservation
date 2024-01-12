import { prisma } from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

const getUserWeights = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error;

        const weights = await prisma.weightMeasurement.findMany({
            where: {
                userId: user.id,
            },
        });

        if (weights) {
            return weights;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export default getUserWeights;
