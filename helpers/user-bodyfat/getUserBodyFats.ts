import { prisma } from "@/lib/client";
import { currentUser } from "@clerk/nextjs";

const getUserBodyFats = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error;

        const bodyfats = await prisma.bodyFatMeasurement.findMany({
            where: {
                userId: user.id,
            },
        });

        if (bodyfats) {
            return bodyfats;
        } else {
            return [];
        }
    } catch (error) {
        console.error(error);
    }
};

export default getUserBodyFats;
