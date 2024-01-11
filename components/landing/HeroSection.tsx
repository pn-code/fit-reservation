import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="bg-hero">
            <section className="bg-black/[45%] px-4 md:px-[5%] flex flex-col justify-center items-center md:items-start flex-1 gap-10 min-h-[95vh]">
                <header className="h-full md:w-1/2 flex flex-col gap-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                        Achieve new heights
                    </h1>
                    <p className="text-gray-200/90 tracking-tight sm:text-xl sm:tracking-tight">
                        Experience accelerated progress, optimize your workouts,
                        and successfully attain your fitness objectives. Join us
                        today and start your journey towards a healthier
                        lifestyle.
                    </p>
                </header>

                <section className="h-full w-full flex justify-center md:justify-start gap-5 text-lg font-semibold text-white">
                    <Link
                        passHref={true}
                        href="/register"
                        className="min-w-[200px] max-w-[300px] h-14 text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 bg-black border border-white hover:bg-black/40 rounded-sm"
                    >
                        Get Started
                    </Link>
                    <a
                        className="min-w-[200px] max-w-[300px] h-14 text-[14px] sm:text-[16px] flex justify-center items-center hover:text-white sm:px-8 hover:bg-gray-500/80  bg-gray-700/90 rounded-sm"
                        href={"#info"}
                    >
                        How it works
                    </a>
                </section>
            </section>
        </div>
    );
}
