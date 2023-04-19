import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

interface calorieGoal {
    userId: string;
    goal: number;
}

const getCalorieGoal = async () => {
    try {
        const user = await currentUser();

        if (!user) throw Error;

        const calorieGoal = (await prisma.calorieGoal.findFirst({
            where: {
                userId: user.id,
            },
        })) as calorieGoal;

        return calorieGoal.goal;
    } catch (error) {
        console.error(error);
    }
};

export default getCalorieGoal;
