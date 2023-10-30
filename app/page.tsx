import CallToActionSection from "@/components/landing/CallToActionSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HeroSection from "@/components/landing/HeroSection";
import ToolsSection from "@/components/landing/ToolsSection";

export default function Home() {
    return (
        <main className="w-full h-fit mt-14 px-4 gap-6 flex text-white items-center flex-col sm:mt-40 mb-10 bg-slate-900 md:gap-24 lg:px-[20%] text-center">
            <HeroSection />
            <ToolsSection />
            <FeaturesSection />
            <CallToActionSection />
        </main>
    );
}
