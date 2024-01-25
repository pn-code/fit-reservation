import React from "react";
import FeatureListItem from "./FeatureListItem";

const featuresListData = [
    {
        title: "Discover Our Range of Services",
        description:
            "We offer a variety of services to help you achieve your fitness goals. From group classes to personal training and nutritional guidance, we have everything you need to succeed.",
        learnHref: "",
    },
    {
        title: "Join Our Community",
        description:
            "Become part of our supportive fitness community and achieve your goals together.",
        learnHref: "",
    },
    {
        title: "Personalized Training Programs",
        description:
            "Our experienced trainers will create customized training programs tailored to your specific needs and goals.",
        learnHref: "",
    },
];

export default function FeatureListSection() {
    return (
        <ul className="bg-slate-200 px-4 flex flex-col md:flex-row md:justify-between md:px-[4%] py-12 md:py-20 gap-24 text-center md:text-left">
            {featuresListData.map((item) => (
                <FeatureListItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    learnHref={item.learnHref}
                />
            ))}
        </ul>
    );
}
