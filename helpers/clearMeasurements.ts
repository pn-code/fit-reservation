import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function clearWeightAndBfMeasurements() {
    const user = await currentUser();
    if (user) {
        const deleteWeights = await prisma.weightMeasurement.deleteMany({
            where: { userId: user.id },
        });
        const deleteBF = await prisma.bodyFatMeasurement.deleteMany({
            where: { userId: user.id },
        });

        console.log(deleteWeights, "weights");
        console.log(deleteBF, "bodyfat");

        return;
    }
}
