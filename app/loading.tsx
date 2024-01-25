import Spinner from "@/components/Spinner";

export default function Loading() {
    return (
        <main className="w-full min-h-[calc(100vh-90px)] overflow-y-auto mb-12 py-6 rounded-md flex flex-col items-center justify-center gap-4 shadow-md px-4 md:px-[4%]">
            <Spinner />
        </main>
    );
}
