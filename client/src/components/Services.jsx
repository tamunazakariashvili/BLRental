import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage";

const Services = () => {
    const { isKA, t } = useLanguage();

    const serviceData = [
        {
            id: 1,
            title: t("All Brands"),
            description: t("We offer a wide selection of vehicles from trusted and well-known brands. Choose the car that fits your needs best — from economy to premium — all in one place, with quality and comfort guaranteed."),
            isText: true
        },
        {
            id: 2,
            image: "/04.jpg",
            isText: false
        },
        {
            id: 3,
            image: "/456x342.webp",
            isText: false
        },
        {
            id: 4,
            title: t("Free Support"),
            description: t("Our team is available to assist you at any time with bookings, questions, or support needs. We are committed to providing fast, friendly, and reliable assistance whenever you need it."),
            isText: true
        }
    ];

    return (
        <section className="py-12 md:py-24 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">

                <div className="text-center mb-10 md:mb-16">
                    <h2 className={`font-serif italic font-bold text-[#1a1a1a] tracking-tight transition-all duration-300 ${
                        isKA ? "text-xl md:text-4xl" : "text-2xl md:text-5xl"
                    }`}>
                        {t("Our Services")}
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-8 max-w-[1200px] mx-auto">
                    {serviceData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative h-[220px] md:h-[400px] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm"
                        >
                            {item.isText ? (
                                <div className="bg-[#1a1f2c] w-full h-full p-4 md:p-12 flex flex-col justify-between items-start">
                                    
                                    {/* ტექსტის ბლოკი, რომელიც ცენტრში მოექცევა */}
                                    <div className="flex-grow flex flex-col justify-center w-full">
                                        <h3 className={`font-serif italic font-bold text-white mb-2 md:mb-5 transition-all ${
                                            isKA ? "text-[11px] md:text-2xl" : "text-[13px] md:text-3xl"
                                        }`}>
                                            {item.title}
                                        </h3>

                                        <p className={`text-gray-400 leading-[1.2] md:leading-relaxed opacity-90 transition-all ${
                                            isKA ? "text-[8.5px] md:text-[15px]" : "text-[10px] md:text-base"
                                        }`}>
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* ღილაკი, რომელიც ყოველთვის ბოლოში იქნება */}
                                    <Link
                                        to="/services"
                                        className="text-white font-bold flex items-center gap-1 md:gap-2 group transition-all pt-2"
                                    >
                                        <span className={`border-b border-white/20 group-hover:border-white pb-0.5 transition-all ${
                                            isKA ? "text-[9px] md:text-sm" : "text-[10px] md:text-sm"
                                        }`}>
                                            {t("Learn More")}
                                        </span>
                                        <span className="text-[10px] md:text-xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="w-full h-full overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt="Service detail"
                                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                                    />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services;