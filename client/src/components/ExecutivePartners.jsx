import React from 'react';
import { useLanguage } from "../hooks/useLanguage";

const ExecutivePartners = () => {
    const { t, currentLanguage } = useLanguage();
    
    // ამოწმებს გრძელი ენების არსებობას (KA/RU)
    const isLongLang = currentLanguage === 'ka' || currentLanguage === 'ru';

    return (
        <section className="relative bg-[#f9f8f6] py-16 md:py-32 border-t border-black/5">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center justify-center">

                    {/* --- მარცხენა მხარე: ვიზუალური ბლოკი --- */}
                    <div className="lg:col-span-5 xl:col-start-2 xl:col-span-4 relative">
                        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-gray-200">
                            <img
                                src="/istockphoto-1456274824-612x612.jpg"
                                className="w-full h-full object-cover brightness-90"
                                alt={t("Executive Team")}
                            />
                        </div>

                        <div className="absolute -bottom-6 -right-6 bg-[#524c43] text-white p-8 hidden md:block shadow-xl">
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-70 mb-2">
                                {t("Freedom")}
                            </p>
                            <p className="text-xl font-medium tracking-tight leading-snug">
                                {t("Your road.")} <br /> {t("Your adventure.")}
                            </p>
                        </div>
                    </div>

                    {/* --- მარჯვენა მხარე: კონტენტი --- */}
                    <div className="lg:col-span-7 xl:col-span-6 pt-2 lg:pt-0">
                        <div className="max-w-xl space-y-8 md:space-y-12 mx-auto lg:mx-0">

                            {/* სათაურის ბლოკი */}
                            <div className="space-y-4 md:space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className={`font-bold uppercase tracking-[0.4em] text-[#524c43] ${isLongLang ? 'text-[9px]' : 'text-[11px]'}`}>
                                        {t("Global Strategy")}
                                    </span>
                                    <div className="h-[1px] flex-grow bg-black/10"></div>
                                </div>

                                <h2 className={`font-bold text-[#1a1a1a] tracking-tight leading-[1.2] md:leading-[1.1] 
                                    ${isLongLang ? 'text-2xl md:text-5xl lg:text-3xl' : 'text-3xl md:text-5xl lg:text-6xl'}`}>
                                    {t("Premium")} <span className="text-[#524c43]">{t("Self-Drive")}</span> <br />
                                    {t("Experience")}
                                </h2>

                                <p className={`text-gray-600 leading-relaxed font-normal ${isLongLang ? 'text-[13px] md:text-base' : 'text-sm md:text-base'}`}>
                                    {t("Take the wheel and explore Georgia with total independence. We offer a curated fleet of high-end vehicles, maintained to perfection, ensuring your journey is as smooth as it is luxurious.")}
                                </p>
                            </div>

                            {/* პუნქტების გრიდი */}
                            <div className="grid grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8 pt-6 md:pt-8 border-t border-black/5">
                                {[
                                    { id: "01", title: "Self-Drive Freedom", desc: "Total privacy and control over your journey." },
                                    { id: "02", title: "Flawless Condition", desc: "Regularly maintained and deep-cleaned fleet." },
                                    { id: "03", title: "Instant Booking", desc: "No hidden fees. Fast paperless process." },
                                    { id: "04", title: "Secure Rental", desc: "Comprehensive insurance included for all drivers." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex flex-col items-start gap-2 md:gap-3">
                                        <span className="text-[#524c43] font-bold text-lg md:text-xl">{item.id}</span>
                                        <div>
                                            <p className={`font-bold tracking-widest text-[#1a1a1a] mb-1 ${isLongLang ? 'text-[9px]' : 'text-[10px] md:text-[11px]'}`}>
                                                {t(item.title)}
                                            </p>
                                            <p className={`text-gray-400 font-medium leading-tight md:leading-relaxed ${isLongLang ? 'text-[9px]' : 'text-[10px]'}`}>
                                                {t(item.desc)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* სტატისტიკა */}
                            <div className="flex items-center gap-6 md:gap-10 pt-4 md:pt-6">
                                <div>
                                    <p className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">50+</p>
                                    <p className={`font-bold uppercase tracking-widest text-gray-400 mt-1 ${isLongLang ? 'text-[8px]' : 'text-[10px]'}`}>
                                        {t("Cities")}
                                    </p>
                                </div>
                                <div className="w-[1px] h-10 md:h-12 bg-black/10"></div>
                                <div>
                                    <p className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">100%</p>
                                    <p className={`font-bold uppercase tracking-widest text-gray-400 mt-1 ${isLongLang ? 'text-[8px]' : 'text-[10px]'}`}>
                                        {t("Reliability")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExecutivePartners;