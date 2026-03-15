import React from 'react';
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const AboutSection2 = () => {
    const { t, currentLanguage } = useLanguage();

    // ვამოწმებთ არის თუ არა ქართული ან რუსული
    const isLongLang = currentLanguage === 'ka' || currentLanguage === 'ru';

    return (
        <section className="py-20 bg-[#fcfcfc] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* ტექსტური ბლოკი */}
                    <div className="w-full lg:w-1/2 space-y-10">
                        <div className="space-y-6">
                            {/* სათაური: მობილურზე ინგლისურისთვის text-3xl, ქართულ/რუსულისთვის text-2xl */}
                            <h2 className={`font-extrabold text-[#111] tracking-tight leading-[1.2] 
        ${isLongLang
                                    ? 'text-2xl md:text-5xl lg:text-6xl'
                                    : 'text-3xl md:text-5xl lg:text-6xl'}`}>
                                {t("Best car rental deals")}
                            </h2>

                            {/* პარაგრაფი: მობილურზე text-sm, პლანშეტზე/კომპიუტერზე text-lg */}
                            <p className={`text-gray-600 leading-relaxed max-w-lg font-medium opacity-80 
        ${isLongLang
                                    ? 'text-sm md:text-lg'
                                    : 'text-sm md:text-lg'}`}>
                                {t("Experience unparalleled luxury and reliability. We don't just rent cars; we provide the keys to your next great adventure.")}
                            </p>
                        </div>

                        {/* Custom "Call" Card */}
                        <div className="group flex items-center gap-6 p-1 pr-8 bg-white border border-gray-100 rounded-2xl w-fit shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="w-16 h-16 bg-[#111] rounded-xl flex items-center justify-center text-[#C5A059] group-hover:scale-95 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-1">
                                    {t("Available 24/7")}
                                </span>
                                <a href="tel:+622120022012" className="text-xl md:text-2xl font-bold text-[#111] hover:text-[#C5A059] transition-colors tracking-tight">
                                    (+995)555-00-89-84
                                </a>
                            </div>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 gap-8 border-l-2 border-gray-100 pl-8 ml-2">
                            {[
                                { title: t("Competitive Prices"), desc: t("No hidden fees, just honest and transparent pricing for every mile.") },
                                { title: t("Premium Assistance"), desc: t("Our dedicated support team is always one call away from you.") }
                            ].map((item, idx) => (
                                <div key={idx} className="relative group">
                                    <div className="absolute -left-[35px] top-1 w-3 h-3 bg-white border-2 border-[#C5A059] rounded-full group-hover:bg-[#C5A059] transition-colors"></div>
                                    <h4 className={`font-bold text-[#111] mb-1 ${isLongLang ? 'text-base' : 'text-lg'}`}>{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* სურათის ბლოკი */}
                    <div className="w-full lg:w-1/2 relative mt-10 lg:mt-0">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#C5A059] opacity-[0.03] rounded-full blur-3xl -z-10"></div>

                        <div className="relative z-10 transform hover:translate-y-[-10px] transition-transform duration-700">
                            <img
                                src="/960x0-removebg-preview.png"
                                alt="Premium Car"
                                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] scale-110 lg:scale-150 origin-center"
                            />

                            {/* მცურავი ბეიჯი */}
                            <div className="absolute -bottom-10 -left-5 md:left-0 bg-white p-6 rounded-2xl shadow-2xl border border-gray-50 flex items-center gap-4 animate-bounce-slow">
                                <div className="text-4xl font-black text-[#C5A059]">10+</div>
                                <div className={`font-bold text-gray-400 uppercase tracking-widest leading-tight ${isLongLang ? 'text-[8px]' : 'text-[10px]'}`}>
                                    {t("Years of Excellence")}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection2;