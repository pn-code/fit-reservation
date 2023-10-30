import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="flex flex-col justify-around bg-slate-900 flex-1 gap-10">
            <header className="h-full w-full flex flex-col gap-10">
                <h1 className="text-3xl sm:text-6xl lg:text-8xl font-semibold">
                    Achieve new heights
                </h1>
                <p className="text-gray-200/90 text-[16px] tracking-tight sm:text-xl sm:tracking-tight">
                    Experience accelerated progress, optimize your workouts, and
                    successfully attain your fitness objectives.
                </p>
            </header>

            <section className="h-full w-full flex gap-5 text-lg font-semibold">
                <Link
                    passHref={true}
                    href="/register"
                    className="min-w-[120px] w-[50%] h-12 sm:min-h-[70px] text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 bg-indigo-600 hover:bg-indigo-700 rounded-sm"
                >
                    Get Started
                </Link>
                <a
                    className="min-w-[120px] w-[50%] h-12 sm:min-h-[70px] text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 bg-transparent hover:bg-gray-800 rounded-sm border-2 border-gray-700"
                    href={"#info"}
                >
                    How it works
                </a>
            </section>
        </section>
    );
}
