"use client"
import ProtectedRoute from "../components/ProtectedRoute";

export default function Home() {
    return (
        <ProtectedRoute>
            <main></main>
        </ProtectedRoute>
    );
}
