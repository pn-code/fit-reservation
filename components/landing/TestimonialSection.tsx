import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const testimonialData = [
    {
        title: "Game-Changer for Fitness Enthusiasts!",
        name: "Philip Nguyen",
        text: "This app is a true game-changer for anyone serious about reaching their fitness goals. The variety of workouts and personalized plans cater to all fitness levels, making it easy for beginners and challenging enough for seasoned athletes.",
    },
    {
        title: "Personalized Fitness at Its Best!",
        name: "Ben Dug",
        text: "This app has revolutionized the way I approach fitness. The personalized workout plans take into account my goals, fitness level, and even my preferred workout style. The video demonstrations for each exercise are incredibly helpful, ensuring proper form and reducing the risk of injury.",
    },
    {
        title: "Effective, Efficient, and Easy to Use!",
        name: "Ah Bee",
        text: "Finally, a fitness app that understands my needs! This app not only provides effective workout plans that align with my fitness goals but also ensures they are efficient, perfect for those with a busy schedule. The variety of exercises keeps things interesting, and the app's intuitive design makes navigation a breeze.",
    },
];

export default function TestimonialSection() {
    return (
        <section className="px-12 md:px-[4%] py-12 md:py-20 flex flex-col bg-slate-600 text-slate-100">
            <h2 className="text-4xl font-bold tracking-tighter">
                Customer Testimonials
            </h2>
            <span>Here's what our users have to say.</span>

            <div className="flex flex-col md:flex-row justify-between mt-6 gap-12 md:gap-24">
                {testimonialData.map((testimonial) => (
                    <TestimonialCard
                        title={testimonial.title}
                        name={testimonial.name}
                        text={testimonial.text}
                    />
                ))}
            </div>

            <div className="flex justify-end gap-4 mt-4">
                <button className="hover:text-slate-400 duration-150">
                    <ArrowLeftCircle size={40}/>
                </button>
                <button className="hover:text-slate-400 duration-150">
                    <ArrowRightCircle size={40}/>
                </button>
            </div>
        </section>
    );
}
