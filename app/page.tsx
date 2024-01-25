import CallToActionSection from "@/components/landing/CallToActionSection";
import FeatureSection from "@/components/landing/FeatureSection";
import FeatureListSection from "@/components/landing/FeatureListSection";
import HeroSection from "@/components/landing/HeroSection";
import ToolsSection from "@/components/landing/ToolsSection";
import TestimonialSection from "@/components/landing/TestimonialSection";

export default function Home() {
    return (
        <main className="flex flex-col gap-8">
            <HeroSection />
            <FeatureSection />
            <FeatureListSection />
            <ToolsSection />
            <TestimonialSection />
            <CallToActionSection />
        </main>
    );
}
