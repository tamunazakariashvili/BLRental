import React, { useState } from 'react';
import { useLanguage } from "../hooks/useLanguage";

const Testimonials = () => {
    const { t, currentLanguage } = useLanguage();
    const brandAccent = 'rgb(254, 154, 0)';
    const [currentIndex, setCurrentIndex] = useState(0);

    const isLongLang = currentLanguage === 'ka' || currentLanguage === 'ru';

    const testimonials = [
        { 
            id: 1, 
            name: "Leslie Alexander", 
            role: t("Business Traveler"), 
            image: "/coment1.jpg", 
            stars: 5,
            text: t("Exceptional service! BLRental provided a seamless booking experience. The car was spotless and performed perfectly for my business trip.")
        },
        { 
            id: 2, 
            name: "Alis White", 
            role: t("Tourist"), 
            image: "/coment2.jpg", 
            stars: 5,
            text: t("Best car rental in the city. The staff at BLRental was incredibly helpful, and the SUV we rented made our family mountain trip unforgettable.")
        },
        { 
            id: 3, 
            name: "Floyd Miles", 
            role: t("Luxury Car Enthusiast"), 
            image: "/coment3.jpg", 
            stars: 5,
            text: t("I've tried many rentals, but BLRental stands out for its premium fleet. The vehicle felt brand new, and the return process took less than 5 minutes.")
        },
        { 
            id: 4, 
            name: "Annette Black", 
            role: t("Daily Commuter"), 
            image: "/coment4.jpg", 
            stars: 4,
            text: t("Highly recommend BLRental for their transparent pricing. No hidden fees, just great cars and professional support throughout the rental period.")
        }
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-24 px-4 md:px-10 bg-[#ffffff] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(254,154,0)] opacity-[0.05] blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-[2px]" style={{ backgroundColor: brandAccent }}></div>
                        <span className={`font-bold uppercase tracking-[0.3em] ${isLongLang ? 'text-[10px]' : 'text-xs'}`} style={{ color: brandAccent }}>
                            {t("What Our Clients Say")}
                        </span>
                    </div>
                    <h2 className={`font-black text-[#1a1a1a] uppercase tracking-tighter ${isLongLang ? 'text-2xl md:text-4xl' : 'text-3xl md:text-4xl'}`}>
                        BL<span style={{ color: brandAccent }}>RENTAL</span> {t("REVIEWS")}
                    </h2>
                </div>

                <div className="relative overflow-hidden mb-16">
                    <div 
                        className="flex transition-transform duration-500 ease-in-out gap-6"
                        style={{ 
                            transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` 
                        }}
                    >
                        {[...testimonials, ...testimonials].map((item, index) => (
                            <div 
                                key={index} 
                                className="min-w-[100%] md:min-w-[calc(33.333%-16px)] bg-[#f9f9f9] border border-gray-100 rounded-[30px] p-8 flex flex-col h-full transition-all duration-500 hover:border-[rgb(254,154,0)]/30 group hover:bg-white hover:shadow-xl hover:shadow-black/5"
                            >
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < item.stars ? 'text-[rgb(254,154,0)]' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className={`text-gray-500 leading-relaxed mb-10 flex-grow group-hover:text-[#1a1a1a] transition-colors font-medium italic ${isLongLang ? 'text-[13px]' : 'text-sm'}`}>
                                    "{item.text}"
                                </p>
                                <div className="w-full h-[1px] bg-gray-100 mb-8"></div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-[#1a1a1a] font-bold text-sm uppercase tracking-tight">{item.name}</h4>
                                        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-gray-200 text-[#1a1a1a] flex items-center justify-center hover:bg-[#1a1a1a] hover:text-white transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={nextSlide} className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 shadow-md" style={{ backgroundColor: brandAccent }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="h-[1px] flex-grow bg-gray-100"></div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;