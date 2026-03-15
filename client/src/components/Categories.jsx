import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const Categories = () => {
    const navigate = useNavigate();
    const { t, isKA } = useLanguage(); // ენის ცვლადები
    const accentColor = "rgb(254, 154, 0)";

    const categoryData = [
        { title: t('Coupe'), subtitle: t('High Performance'), img: '/coupee.jpg', type: 'Coupe' },
        { title: t('Convertible'), subtitle: t('Open Top Freedom'), img: '/convertiblee.jpg', type: 'convertible' },
        { title: t('Sedan'), subtitle: t('Business Class'), img: '/sedann.jpg', type: 'Sedan' },
        { title: t('SUV'), subtitle: t('Family Travel'), img: '/suvcarr.jpg', type: 'suv' },
    ];

    return (
        <section className='w-full bg-white py-20 md:py-32 overflow-hidden border-t border-gray-100'>
            <div className='max-w-[1400px] mx-auto px-4 md:px-6'>
                {/* Header Section */}
                <div className="mb-10 md:mb-16">
                    <div className="flex items-center gap-2 mb-4">
                        <div style={{ backgroundColor: accentColor }} className="w-8 h-[1px]"></div>
                        <span style={{ color: accentColor }} className="text-[9px] font-bold tracking-[0.3em] uppercase">
                            {t("Fleet Categories")}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className={`text-[#1a1a1a] font-semibold tracking-tight leading-tight uppercase ${isKA ? "text-xl md:text-3xl" : "text-2xl md:text-4xl"
                            }`}>
                            {t("Select Your")} <br />
                            <span className="text-gray-400 font-normal">{t("Premium Class")}</span>
                        </h2>

                        <div className="hidden md:block h-[1px] flex-grow bg-gray-100 mx-8 mb-2"></div>

                        <p className="text-gray-400 text-[11px] md:text-xs leading-relaxed max-w-[280px] uppercase tracking-wide">
                            {t("Choose the perfect vehicle category for your next journey.")}
                        </p>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
                    {categoryData.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/carspage?type=${item.type}`)}
                            className="group relative overflow-hidden cursor-pointer h-[250px] md:h-[450px] bg-gray-50 rounded-2xl transition-all duration-700 hover:shadow-lg"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-[1.5s] ease-out group-hover:scale-110 opacity-100"
                                style={{ backgroundImage: `url(${item.img})` }}
                            />

                            {/* Dark Gradient */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10' />

                            {/* Content */}
                            <div className='absolute inset-0 p-4 md:p-8 flex flex-col justify-between z-20'>
                                <div className="flex justify-between items-start">
                                    <span className="text-white/40 text-xl md:text-3xl font-black group-hover:text-[#FE9A00] transition-colors duration-500">
                                        0{index + 1}
                                    </span>
                                </div>

                                <div className='flex flex-col gap-2 md:gap-4'>
                                    <div>
                                        <p className="hidden md:block text-[#FE9A00] text-[9px] font-bold uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            {item.subtitle}
                                        </p>
                                        <h3 className='text-white text-lg md:text-2xl font-bold tracking-tighter uppercase'>
                                            {item.title}
                                        </h3>
                                        <div style={{ backgroundColor: accentColor }} className="w-0 group-hover:w-12 h-[2px] transition-all duration-500"></div>
                                    </div>

                                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-700">
                                        <span className="text-white/70 text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-bold">
                                            {t("Explore")}
                                        </span>
                                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FE9A00] group-hover:border-transparent transition-all duration-500 bg-black/20 backdrop-blur-sm">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="stroke-white">
                                                <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Categories;