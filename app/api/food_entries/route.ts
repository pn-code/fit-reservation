import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (user) {
            const res = await req.json();
    
            const newFoodEntry = await prisma.foodEntry.create({
                data: {
                    name: res.name,
                    calories: res.calories,
                    carbs: res.carbs,
                    fats: res.fats,
                    protein: res.protein,
                    userId: user.id
                },
            });

            return NextResponse.json(newFoodEntry);
        }
    } catch (error) {
        return console.error(error)
    }
}
