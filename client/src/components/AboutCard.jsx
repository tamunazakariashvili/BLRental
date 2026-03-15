import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCar, FaPlaneDeparture, FaCreditCard } from "react-icons/fa";
import { useLanguage } from "../hooks/useLanguage"; 

const AboutCard = () => {
    const { isKA, t } = useLanguage(); // ვიყენებთ isKA-ს და t-ს

    const truncateText = (text, charLimit) => {
        if (text.length > charLimit) {
            return text.substring(0, charLimit) + "...";
        }
        return text;
    };

    const services = [
        {
            title: t("Car Rentals"),
            desc: t("Rent a car without a driver and explore Georgia at your own pace. Wide selection of vehicles from economy to luxury."),
            icon: <FaCar />,
            link: "/carspage",
            buttonText: t("Learn More")
        },
        {
            title: t("About Us"),
            desc: t("We are a modern car rental service focused on comfort, reliability, and simple booking."),
            icon: <FaPlaneDeparture />,
            link: "/about",
            buttonText: t("Learn More")
        },
        {
            title: t("Secure Payment"),
            desc: t("If you book a car, our staff will contact you regarding the details"),
            icon: <FaCreditCard />,
            link: "#",
            buttonText: t("Learn More"),
            isComingSoon: false
        }
    ];

    return (
        <section className="relative z-20 pb-10 md:pb-20 ">
            <div className="container mx-auto px-1 md:px-4">
                <div className="grid grid-cols-3 gap-1 md:gap-8 -mt-16 md:-mt-24">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[rgb(255,255,255)] p-2 md:p-10 rounded-lg md:rounded-xl shadow-lg flex flex-col items-center text-center group hover:shadow-2xl transition-all duration-300 min-h-full"
                        >
                            {/* Icon */}
                            <div className="w-6 h-6 md:w-16 md:h-16 bg-black text-white rounded-full flex items-center justify-center text-[10px] md:text-2xl mb-1.5 md:mb-6 group-hover:bg-[#C5A059] transition-colors shrink-0">
                                {service.icon}
                            </div>

                            {/* Title - ზომის შემცირება ქართულზე */}
                            <h3 className={`font-bold mb-1 md:mb-4 text-gray-800 leading-none md:leading-tight uppercase md:normal-case transition-all ${isKA ? "text-[7px] md:text-lg" : "text-[8px] md:text-xl"
                                }`}>
                                {service.title}
                            </h3>

                            {/* Description - ზომის შემცირება ქართულზე */}
                            <p className={`text-gray-500 leading-[1.1] md:leading-relaxed mb-2 md:mb-8 flex-grow transition-all ${isKA ? "text-[6px] md:text-[13px]" : "text-[7px] md:text-sm"
                                }`}>
                                <span className="md:hidden">
                                    {truncateText(service.desc, 50)}
                                </span>
                                <span className="hidden md:inline">
                                    {service.desc}
                                </span>
                            </p>

                            {/* Button - ზომის შემცირება ქართულზე */}
                            <div className="mt-auto">
                                {service.isComingSoon ? (
                                    <span className={`text-gray-300 font-medium italic transition-all ${isKA ? "text-[5px] md:text-[12px]" : "text-[6px] md:text-sm"
                                        }`}>
                                        {service.buttonText}
                                    </span>
                                ) : (
                                    <Link
                                        to={service.link}
                                        className={`inline-flex items-center font-semibold text-gray-800 border-b border-gray-200 pb-0 md:pb-0.5 hover:border-black transition-all whitespace-nowrap ${isKA ? "text-[6px] md:text-[12px]" : "text-[7px] md:text-sm"
                                            }`}
                                    >
                                        {service.buttonText}
                                        <span className="ml-0.5 hidden md:inline">→</span>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutCard;