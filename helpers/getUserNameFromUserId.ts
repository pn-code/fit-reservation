import { clerkClient } from "@clerk/nextjs/server";

export const getUserNameFromUserId = async (userId: string) => {
    try {
        const user = await clerkClient.users.getUser(userId);
        const fullName = `${user.firstName} ${user.lastName}`;

        return fullName;
    } catch (error) {
        console.error(`Ran into an error: ${error}`);
    }
};