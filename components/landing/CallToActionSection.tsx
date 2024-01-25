import Link from "next/link";
import ctaImg from "@/public/assets/cta.png";
import Image from "next/image";

export default function CallToActionSection() {
    return (
        <section className="flex justify-between gap-10 py-20 px-10 md:px-[4%]">
            <div className="flex flex-col sm:flex-row gap-4 border border-slate-700 p-4 w-full sm:justify-between sm:items-center">
                <div className="flex flex-col md:w-1/2 md:px-24">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                        Start Your Fitness Journey Today
                    </h2>
                    <p className="text-gray-700 tracking-tight sm:text-xl sm:tracking-tight mb-6">
                        Get in shape and achieve your fitness goals with our
                        personalized training programs.
                    </p>

                    <div className="flex gap-4 text-white">
                        <Link
                            className="btn btn--primary"
                            href={"/register"}
                            passHref
                        >
                            Sign Up
                        </Link>
                        <Link
                            className="btn btn--secondary"
                            href={"/"}
                            passHref
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <Image
                        className="relative rounded-md object-cover"
                        src={ctaImg}
                        alt="man swimming in pool"
                    />
                </div>
            </div>
        </section>
    );
}
