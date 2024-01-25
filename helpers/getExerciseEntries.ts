import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs";
import getLocalTimezone from "./getLocalTimezone";

const getExerciseEntries = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error("This action is forbidden.");

        const localTime = getLocalTimezone();

        const exerciseEntries = await prisma.exerciseEntry.findMany({
            where: {
                userId: user.id,
                date: {
                    gte: localTime.startOfDay,
                    lt: localTime.endOfDay,
                },
            },
        });

        return exerciseEntries;
    } catch (error) {
        console.error(error);
    }
};

export default getExerciseEntries;
