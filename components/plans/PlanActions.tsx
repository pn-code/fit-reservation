"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
    plan: any;
    userId: string;
}

export default function PlanActions({ plan, userId }: Props) {
    const router = useRouter();

    const deletePlan = async () => {
        try {
            const res = await axios.delete(`/api/plans/${plan.id}`);
            if (res.status === 200) {
                toast.success("Successfully deleted plan!");
                router.replace(`/plans/${userId}`);
            }
        } catch (error) {
            console.error("Ran into an error");
            toast.error("Something went wrong!");
        }
    };

    return (
        <section>
            <h3 className="text-lg font-semibold">Actions:</h3>
            <button onClick={deletePlan} className="btn btn--danger">
                Delete Plan
            </button>
        </section>
    );
}
