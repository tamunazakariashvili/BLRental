import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const Work = () => {
    const { t, isKA } = useLanguage(); // ენის ცვლადები
    const [active, setActive] = useState(1);
    const accentColor = "rgb(254, 154, 0)";

    const steps = [
        {
            id: 1,
            title: t("Browse and Select"),
            desc: t("Explore our diverse selection of high-end vehicles, choose dates, and select a location."),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            id: 2,
            title: t("Book and Confirm"),
            desc: t("Secure your reservation with a few simple clicks. Receive instant confirmation and details."),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        {
            id: 3,
            title: t("Pick Up and Enjoy"),
            desc: t("Meet your car at the chosen location. Our quick check-in gets you on the road in no time."),
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        }
    ];

    return (
        <section className="bg-white py-24 md:py-32 px-6 overflow-hidden border-t border-gray-100">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center">

                    {/* Left Side: Visual Image */}
                    <div className="relative order-2 lg:order-1">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl">
                            <img
                                src="/most-popular-cars-and-brands-in-us.jpg.webp"
                                className="w-full h-full object-cover transition-transform duration-700"
                                alt="Process"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-50 hidden md:block">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">{t("Experience")}</p>
                            <h4 className="text-[#1a1a1a] text-3xl font-black italic">
                                100% <span className="text-gray-300 font-light not-italic text-lg block tracking-tight">{t("Premium Service")}</span>
                            </h4>
                        </div>
                    </div>

                    {/* Right Side: Content */}
                    <div className="order-1 lg:order-2">
                        <div className="mb-10">
                            {/* სათაურის ზედა პატარა ტექსტი - გამარტივებული */}
                            <div className="mb-2">
                                <span style={{ color: accentColor }} className="text-sm font-medium">
                                    {t("Work Process")}
                                </span>
                            </div>

                            {/* მთავარი სათაური - სტანდარტული font-ით */}
                            <h2 className="text-[#1a1a1a] text-2xl md:text-4xl font-semibold leading-tight">
                                {t("Seamless Journey")} <br />
                                <span className="text-gray-500 font-normal">{t("Step by Step")}</span>
                            </h2>
                        </div>
                        <div className="flex flex-col">
                            {steps.map((step) => (
                                <div
                                    key={step.id}
                                    onMouseEnter={() => setActive(step.id)}
                                    className={`relative py-8 border-b border-gray-100 transition-all duration-300 cursor-default ${active === step.id ? "opacity-100" : "opacity-40"
                                        }`}
                                >
                                    <div className="flex gap-6 items-start">
                                        <div
                                            className="w-12 h-12 flex items-center justify-center rounded-full transition-colors duration-500"
                                            style={{
                                                backgroundColor: active === step.id ? `${accentColor}10` : 'transparent',
                                                color: active === step.id ? accentColor : '#1a1a1a'
                                            }}
                                        >
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-[#1a1a1a] uppercase tracking-tight mb-2 ${isKA ? "text-base" : "text-lg"
                                                }`}>
                                                {step.title}
                                            </h3>
                                            <p className={`text-gray-500 leading-relaxed max-w-md ${isKA ? "text-xs" : "text-sm"
                                                }`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Active Indicator Line */}
                                    <div
                                        className="absolute bottom-[-1px] left-0 h-[2px] transition-all duration-500"
                                        style={{
                                            width: active === step.id ? "100%" : "0%",
                                            backgroundColor: accentColor
                                        }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Work;