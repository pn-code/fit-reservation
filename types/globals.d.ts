interface WeightMeasurement {
    id: number;
    weight: number;
    createdAt: Date;
    userId: string;
}

interface BodyFatMeasurement {
    id: number;
    bodyfat: number;
    createdAt: Date;
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
