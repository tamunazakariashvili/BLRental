import { useCars } from "../contexts/CarsContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const Fleets = () => {
    const { cars } = useCars();
    const { t, isKA } = useLanguage(); // ენის ცვლადები

    const displayCars = cars.slice(0, 6);

    return (
        <section className="bg-white text-[#1a1a1a] py-20 md:py-32">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">

                {/* Header Section */}
                <div className="mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2 mb-3"
                    >
                        <span className="w-6 h-[1.5px] bg-[#FE9A00]"></span>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-semibold">
                            {t("Luxury Selection")}
                        </span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className={`font-bold tracking-tight text-[#1a1a1a] uppercase ${
                                isKA ? "text-2xl md:text-4xl" : "text-3xl md:text-5xl"
                            }`}
                        >
                            {t("Our Premium")} <span className="text-gray-300">{t("Fleet")}</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden md:block h-[40px] w-[1px] bg-gray-100 mx-6"
                        ></motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="max-w-[300px] text-[11px] md:text-xs text-gray-400 leading-relaxed uppercase tracking-wider"
                        >
                            {t("Exclusive collection of world-class vehicles for your ultimate comfort.")}
                        </motion.p>
                    </div>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {displayCars.map((car, index) => (
                        <motion.div
                            key={car._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group"
                        >
                            <Link to={`/car/${car._id}`} className="block">
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#f9f9f9] rounded-2xl mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                                    <img
                                        src={car.images[0]}
                                        className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                        alt={car.brand}
                                    />

                                    <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-md px-6 py-3 rounded-bl-2xl border-l border-b border-gray-100/50">
                                        <span className="text-lg font-bold text-[#1a1a1a]">${car.pricePerDay}</span>
                                        <span className="text-[10px] text-gray-400 uppercase ml-1 block text-right tracking-tighter">
                                            {t("Per Day")}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>

                                <div className="space-y-4 px-2">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#FE9A00] font-bold mb-1">
                                                {car.brand}
                                            </p>
                                            <h3 className="text-2xl font-bold tracking-tight text-[#1a1a1a] uppercase">
                                                {car.model}
                                            </h3>
                                        </div>
                                        <span className="text-4xl font-black text-gray-100/80 tracking-tighter italic">
                                            0{index + 1}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-6 pt-6 border-t border-gray-100">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase text-gray-400 font-bold mb-1 tracking-widest">{t("Fuel")}</span>
                                            <span className="text-xs font-medium text-[#1a1a1a] uppercase">
                                                {t(car.fueltype)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase text-gray-400 font-bold mb-1 tracking-widest">{t("Capacity")}</span>
                                            <span className="text-xs font-medium text-[#1a1a1a] uppercase">{car.pasenger} {t("Seats")}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase text-gray-400 font-bold mb-1 tracking-widest">{t("Transmission")}</span>
                                            <span className="text-xs font-medium text-[#1a1a1a] uppercase">
                                                {t(car.transmission || "Auto")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4 overflow-hidden">
                                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1a1a1a] group-hover:text-[#FE9A00] transition-all">
                                            <span className="relative pb-1">
                                                {t("View Details")}
                                                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#FE9A00] group-hover:w-full transition-all duration-500"></span>
                                            </span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-2 transition-transform duration-500"><path d="M5 12H19M19 12L12 5M19 12L12 19" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <Link
                        to="/cars"
                        className="inline-block px-10 py-4 border border-gray-200 text-sm font-medium tracking-wide rounded-full hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-500 shadow-sm"
                    >
                        {t("Explore Entire Fleet")}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Fleets;