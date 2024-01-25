import { prisma } from "../../lib/client";
import { currentUser } from "@clerk/nextjs";

const getFoodEntries = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error("This action is forbidden.");

        const foodEntry = await prisma.foodEntry.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                date: "desc",
            },
        });

        if (!foodEntry) {
            return [];
        }

        return foodEntry;
    } catch (error) {
        console.error(error);
    }
};

export default getFoodEntries;
