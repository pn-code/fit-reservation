import Spinner from "@/components/Spinner";

export default function Loading() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 flex flex-col gap-4 px-1 lg:px-[4%]">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md flex justify-between">
                <h1 className="flex gap-2">User's Profile</h1>
                <button className="btn btn--danger">Sign out</button>
            </header>

            <section className="w-full h-full flex justify-center mt-40">
                <Spinner size={16} />
            </section>
        </main>
    );
}
