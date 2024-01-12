interface WeightMeasurement {
    id: number;
    weight: number;
    createdAt: Date;
    userId: string;
}

interface BodyFatMeasurement {
    id: number;
    bodyfat: number;
    createdAt: sate;
    userId: string;
}

interface ExerciseEntry {
    calories: number;
    date: string;
    duration: number;
    id: number;
    name: string;
    reps: number;
    sets: number;
    type: string;
    userId: string;
    weight: number;
}

interface FoodEntry {
    calories: number;
    carbs: number;
    date: string;
    fats: number;
    id: number;
    name: string;
    protein: number;
    userId: string;
}

type DietMacros = {
    zone: { carbs: number; fats: number; protein: number };
    paleo: { carbs: number; fats: number; protein: number };
    med: { carbs: number; fats: number; protein: number };
    keto: { carbs: number; fats: number; protein: number };
    lowfat: { carbs: number; fats: number; protein: number };
    [key: string]: { carbs: number; fats: number; protein: number };
};

type Exercise = {
    name: string;
    type: string;
    sets: number;
    reps: number;
    duration: number;
};

type TrainingPlan = {
    id: number;
    userId: string;
    createdAt: Date;
    modifiedAt: Date;
    name: string;
    description: string;
    reviews?: any[];
    exercises?: any[];
};

type UserWithFullName = {
    fullName: string;
    id: string;
};
