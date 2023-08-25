import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-20 px-4 sm:px-40 gap-6 sm:h-[calc(100vh-82px)] flex text-white items-center justify-center flex-col md:flex-row bg-slate-900 md:gap-24">
            {/* LEFT SIDE: HERO TEXT */}
            <section className="h-full flex flex-col justify-center bg-slate-900 flex-1 gap-10">
                <header className="w-full flex flex-col gap-10">
                    <h1 className="text-5xl sm:text-7xl font-semibold">
                        Achieve new heights
                    </h1>
                    <p className="text-gray-200/90 text-lg tracking-tight sm:text-xl sm:tracking-tight">
                        FitHeroes delivers a comprehensive collection of highly
                        effective tools utilized by fitness trainers and
                        industry experts, right to your doorstep. Experience
                        accelerated progress, optimize your workouts, and
                        successfully attain your fitness objectives.
                    </p>
                </header>

                <section className="w-full flex gap-5 text-lg font-semibold">
                    <Link
                        passHref={true}
                        href="/register"
                        className="min-w-[120px] w-[50%] min-h-[70px] flex justify-center items-center hover:text-white px-8 bg-indigo-600 hover:bg-indigo-700 rounded-sm"
                    >
                        Get Started
                    </Link>
                    <Link
                        passHref={true}
                        className="min-w-[120px] w-[50%] min-h-[70px] flex justify-center items-center hover:text-white px-8 bg-transparent hover:bg-gray-800 rounded-sm border-2 border-gray-700"
                        href={"/info"}
                    >
                        How it works
                    </Link>
                </section>

                <div className="flex flex-col xl:flex-row items-center gap-6">
                    <p className="text-gray-200/90 mr-2">
                        Going above and beyond the defined standards
                    </p>
                    <div className="flex gap-6 flex-wrap">
                        <Image
                            className="rounded-sm"
                            src={"/assets/company1.png"}
                            height={32}
                            width={32}
                            alt="cronometer"
                        />
                        <Image
                            className="rounded-sm"
                            src={"/assets/company2.png"}
                            height={32}
                            width={32}
                            alt="my fitness pal"
                        />
                        <Image
                            className="rounded-sm"
                            src={"/assets/company3.png"}
                            height={32}
                            width={32}
                            alt="weight watchers"
                        />
                        <Image
                            className="rounded-sm"
                            src={"/assets/company4.png"}
                            height={32}
                            width={32}
                            alt="noom"
                        />
                    </div>
                </div>
            </section>

            {/* RIGHT SIDE: HERO IMAGE */}
            <section className="hidden lg:flex flex-1 justify-center items-center w-full bg-gray-900 rounded-md mt-8 sm:mt-0">
                <Image
                    className="rounded-sm"
                    src={"/assets/HERO.png"}
                    height={1000}
                    width={720}
                    alt=""
                />
            </section>
        </main>
    );
}
