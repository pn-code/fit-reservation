import Image from "next/image";
import React from "react";
import FeatureImg from "@/public/assets/feature.png";

export default function FeatureSection() {
    return (
        <section className="px-4 flex flex-col md:flex-row md:px-[4%] md:items-center md:justify-between md:gap-12 min-h-[92vh]  bg-slate-100">
            <div className="flex flex-col gap-2 md:max-w-[500px] lg:max-w-[800px]">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                    Transform your body and mind with our revolutionary fitness
                    and wellness program.
                </h2>

                <p className="mb-4 text-slate-600 tracking-tight sm:text-xl sm:tracking-tight">
                    Our unique approach combines cutting-edge exercises,
                    personalized nutrition plans, and mindfulness techniques to
                    help you achieve optimal health and well-being.
                </p>
            </div>
            <div>
                <Image
                    className="rounded-md"
                    src={FeatureImg}
                    alt="a couple running on the beach of the Netherlands"
                    height={800}
                    width={600}
                />
            </div>
        </section>
    );
}
