import { prisma } from "../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

const getFoodEntries = async () => {
	try {
		const user = await currentUser();

		if (!user) throw Error("This action is forbidden.");

		const offsetMinutes = new Date().getTimezoneOffset();
		const offsetHours = offsetMinutes / 60;

		const foodEntry = await prisma.foodEntry.findMany({
			where: {
				userId: user.id,
				date: {
					gte: new Date(new Date().setUTCHours(0, 0, 0, 0) - offsetHours * 60 * 60 * 1000),
					lt: new Date(new Date().setUTCHours(24, 0, 0, 0) - offsetHours * 60 * 60 * 1000),
				},
			},
		});

		return foodEntry;
	} catch (error) {
		console.error(error);
	}
};

export default getFoodEntries;
