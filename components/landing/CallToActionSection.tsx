import Link from "next/link";

export default function CallToActionSection() {
    return (
        <section className="flex flex-col gap-10 py-20 mb-10">
            <h2 className="w-full text-2xl lg:text-3xl flex gap-2 flex-col font-bold lg:flex-row lg:items-end">
                Wait no longer. Your fitness has arrived.
            </h2>
            <Link
                className="p-4 rounded-sm bg-blue-800 text-lg hover:bg-blue-900 ease-linear duration-200"
                href={"/register"}
                passHref
            >
                Get Started For Free
            </Link>
        </section>
    );
}
