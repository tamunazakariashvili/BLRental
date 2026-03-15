import React from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

import ExecutivePartners from "../components/ExecutivePartners";
import Footer from "../components/Footer";
import Testimonials from '../components/Testimonials';
import AboutSection2 from '../components/AboutSection2';

const AboutPage = () => {
    const { t, currentLanguage } = useLanguage(); // ვიღებთ მიმდინარე ენას
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);

    // დინამიური ზომები ქართული და რუსული ენისთვის მობილურზე
    const isLongLang = currentLanguage === 'ka' || currentLanguage === 'ru';

    return (
        <main className="bg-[#050505] min-h-screen text-white overflow-hidden selection:bg-amber-500 selection:text-black font-sans">

            {/* --- IMMERSIVE HERO SECTION --- */}
            <div className="relative w-full h-[55vh] md:h-[75vh] flex items-center overflow-hidden bg-[#0F0F0F]">
                <div className="absolute right-0 top-0 w-full md:w-7/12 h-full z-0">
                    <img
                        src="/servicing-offers (1).jpg"
                        alt="About BLRental"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/70 to-transparent"></div>
                    <div className="absolute inset-0 bg-black/40 md:hidden"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-16">
                    <div className="max-w-3xl space-y-5 md:space-y-8">

                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-6 md:w-8 h-[1.5px] bg-[#C5A059]"></div>
                            <span className={`text-white font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] ${isLongLang ? 'text-[7px]' : 'text-[8px]'} md:text-xs`}>
                                {t("Luxury Fleet")}
                            </span>
                        </div>

                        {/* სათაური: მობილურზე მნიშვნელოვნად დაპატარავებულია */}
                        <div className="flex flex-col">
                            <h1 className={`${isLongLang ? 'text-2xl' : 'text-2xl'} md:text-4xl font-black text-white uppercase tracking-tighter leading-[1.1] md:leading-[0.85]`}>
                                {t("About")}
                            </h1>
                            <h2 className={`${isLongLang ? 'text-2xl' : 'text-4xl'} mt-1 md:mt-4 font-black text-[#C5A059] uppercase tracking-tighter leading-[1.1] md:leading-[0.85]`}>
                                {t("Company")}
                            </h2>
                        </div>

                        <div className="max-w-xs md:max-w-md space-y-5">
                   
                            <p className={`text-gray-300 ${isLongLang ? 'text-[11px]' : 'text-[12px]'} md:text-base leading-relaxed border-l-[1.5px] border-[#C5A059] pl-4 md:pl-6 py-0.5 md:py-1`}>
                                {t("We provide world-class luxury car rental services, focusing on comfort, safety, and an unforgettable driving experience.")}
                            </p>

                            <nav className={`flex items-center gap-2 font-bold uppercase tracking-widest text-white/40 ${isLongLang ? 'text-[7px]' : 'text-[8px]'} md:text-[10px]`}>
                                <Link to="/" className="hover:text-[#C5A059] transition-colors">
                                    {t("Home")}
                                </Link>
                                <span className="opacity-20">/</span>
                                <span className="text-white/70">{t("About Us")}</span>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className="absolute left-0 top-0 h-full w-1 md:w-1.5 bg-[#C5A059]"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C5A059] to-transparent opacity-20"></div>
            </div>

            <AboutSection2 />
            <ExecutivePartners />
            <Testimonials />
            <Footer />

            <style jsx>{`
                .stroke-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
                }
                @media (max-width: 768px) {
                    .stroke-white {
                        -webkit-text-stroke: 0.5px rgba(255, 255, 255, 0.6);
                    }
                }
            `}</style>
        </main>
    );
};

export default AboutPage;