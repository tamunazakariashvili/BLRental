import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useCars } from "../contexts/CarsContext";
import Footer from "../components/Footer";
import CarFilter from "../components/carFilter";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const CarsPage = () => {
    const { t, isKA } = useLanguage(); // ენის ცვლადები
    const { cars, getCars } = useCars();
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlFilters = {
            brand: queryParams.get('brand') || "",
            model: queryParams.get('model') || "",
            carType: queryParams.get('type') || "",
            maxPrice: queryParams.get('maxPrice') || "",
        };

        const activeFilters = Object.fromEntries(
            Object.entries(urlFilters).filter(([_, value]) => value !== "")
        );

        getCars(activeFilters);
        setCurrentPage(0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.search]);

    const itemsPerPage = 6;
    const offset = currentPage * itemsPerPage;
    const currentItems = cars.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(cars.length / itemsPerPage);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] flex flex-col items-center w-full overflow-x-hidden">
            <section className="relative w-full overflow-hidden">
                {/* Desktop Hero Section */}
                <div className="hidden min-[671px]:flex relative w-full min-h-[700px] items-center bg-white">
                    <div
                        className="absolute inset-0 z-10 bg-[#222834]"
                        style={{ clipPath: 'ellipse(90% 100% at 15% 0%)' }}
                    ></div>

                    <div className="container mx-auto px-16 relative z-30">
                        <div className="grid grid-cols-2 items-center gap-0">
                            <div className="text-white space-y-6 max-w-2xl py-10">
                                <p className="text-gray-400 text-base font-medium tracking-wide">
                                    {t("Available 24/7 | Premium Fleet | Self-Drive Rentals in Georgia")}
                                </p>
                                <h1 className={`font-bold leading-tight ${isKA ? "text-4xl" : "text-5xl"}`}>
                                    {t("Premium Car Rental")} <br />
                                    {t("Across")} <span className="">{t("Georgia")}</span>
                                </h1>
                                <p className="text-gray-300 text-lg max-w-xl leading-relaxed opacity-80">
                                    {t("Discover the ultimate driving experience with our exclusive car rental service. We provide a wide range of high-end vehicles for daily hire without the need for a driver.")}
                                </p>
                                <div className="flex items-center gap-4 pt-4">
                                    <button className="bg-[rgb(197,160,89)] hover:bg-[#a1313f] text-white px-10 py-3.5 rounded-full font-bold text-sm transition-all shadow-xl active:scale-95">
                                        {t("Check Availability")}
                                    </button>
                                    <a href="tel:+995555008984" className="border border-gray-500 hover:border-white text-white px-10 py-3.5 rounded-full font-bold text-sm transition-all flex items-center gap-2">
                                        <span>📞</span> +995 555 00 89 84
                                    </a>
                                </div>
                            </div>

                            <div className="relative flex justify-end">
                                <div className="relative w-full max-w-5xl transform scale-[1.4] translate-x-16 translate-y-10 z-40">
                                    <img src="/carsimage.png" alt="Car" className="w-full h-auto object-contain drop-shadow-[0_45px_50px_rgba(0,0,0,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-full h-[150px] bg-white pointer-events-none" style={{ clipPath: 'ellipse(100% 100% at 70% 100%)' }}></div>
                </div>

                {/* Mobile Hero Section */}
                <div className="block min-[671px]:hidden bg-[#222834] w-full pt-20 pb-10 px-6 relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#BD3A4A] opacity-10 blur-3xl rounded-full"></div>
                    <div className="flex flex-col items-center text-center space-y-8 relative z-20">
                        <div className="space-y-4">
                            <span className="inline-block bg-[#c5a059]/10 text-[#c5a059] text-[10px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-full border border-[#c5a059]/30">
                                {t("Premium Experience")}
                            </span>
                            <h1 className="text-3xl font-extrabold text-white leading-tight">
                                {t("Rent Your")} <span className="text-[rgb(197,160,89)]">{t("Dream Car")}</span> {t("In Georgia")}
                            </h1>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px] mx-auto">
                                {t("Premium fleet available 24/7. Explore the country with style and comfort.")}
                            </p>
                        </div>
                        <div className="w-full py-4 transform scale-110">
                            <img src="/carsimage.png" alt="Car" className="w-full h-auto drop-shadow-[0_15px_20px_rgba(0,0,0,0.8)]" />
                        </div>
                        <div className="w-full space-y-3 pt-4">
                            <button className="w-full bg-[#c5a059] font-semibold text-[#222834] py-4 rounded-2xl text-base shadow-lg active:scale-95 transition-transform">
                                {t("Check Availability")}
                            </button>
                            <a href="tel:+995555008984" className="w-full flex items-center justify-center gap-3 border border-gray-700 text-white py-4 rounded-2xl font-bold text-base bg-white/5 active:bg-white/10">
                                <span>📞</span> +995 555 00 89 84
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col lg:flex-row gap-12">
                <aside className="w-full lg:w-[320px] flex-shrink-0">
                    <div className="sticky top-28">
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-[0_20px_40px_rgba(0,0,0,0.04)]">
                            <h3 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-widest text-[#1A1A1A]">
                                <span className="w-2 h-6 bg-amber-600 rounded-full"></span>
                                {t("Filter")}
                            </h3>
                            <div className="light-filter-wrapper">
                                <CarFilter />
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {currentItems.length > 0 ? (
                            currentItems.map((car) => (
                                <div key={car._id} className="group bg-white rounded-[32px] overflow-hidden border border-gray-100 hover:border-amber-600/30 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col h-full">
                                    <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                                        <img className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" src={car.images[0] || ""} alt={car.brand} />
                                        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md border border-gray-100 px-3 py-1 rounded-full z-10">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-600">{t(car.carType)}</p>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-amber-600 transition-colors uppercase tracking-tight line-clamp-1">
                                                {car.brand} {car.model}
                                            </h3>
                                            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-0.5">{car.fueltype} {t("Tech")}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 py-4 border-y border-gray-50 mb-5">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                    <img className="w-4 opacity-40" src="/810008.png" alt="Doors" />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{car.doors} {t("Doors")}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                    <img className="w-4 opacity-40" src="/Screenshot_2025-10-24_213042-removebg-preview.png" alt="Pax" />
                                                </div>
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{car.pasenger} {t("Pax")}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div>
                                                <p className="text-gray-400 text-[9px] font-black uppercase tracking-widest mb-0.5">{t("Daily Rate")}</p>
                                                <p className="text-2xl font-black text-[#1A1A1A] tracking-tighter">
                                                    ${car.pricePerDay}<span className="text-xs text-amber-600 font-medium ml-0.5">/{t("d")}</span>
                                                </p>
                                            </div>
                                            <Link to={`/car/${car._id}`} className="w-11 h-11 bg-black text-white rounded-xl flex items-center justify-center hover:bg-[#1A1A1A] transition-all duration-300 shadow-md active:scale-90">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="7" y1="17" x2="17" y2="7"></line>
                                                    <polyline points="7 7 17 7 17 17"></polyline>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white rounded-[40px] border border-dashed border-gray-200">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl opacity-50">🏎️</span>
                                </div>
                                <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">{t("No matching rides found")}</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {pageCount > 1 && (
                        <div className="mt-24 flex justify-center">
                            <ReactPaginate
                                previousLabel={<span className="flex items-center justify-center w-14 h-14 bg-white border border-gray-200 rounded-2xl hover:bg-amber-600 hover:text-white transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                </span>}
                                nextLabel={<span className="flex items-center justify-center w-14 h-14 bg-white border border-gray-200 rounded-2xl hover:bg-amber-600 hover:text-white transition-all">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7 7 7-7-7-7" /></svg>
                                </span>}
                                pageCount={pageCount}
                                onPageChange={handlePageClick}
                                forcePage={currentPage}
                                containerClassName={"flex items-center gap-4"}
                                pageClassName={"w-14 h-14 flex items-center justify-center font-black text-gray-400 rounded-2xl border border-gray-100 bg-white transition-all cursor-pointer hover:border-amber-600 hover:text-amber-600"}
                                activeClassName={"!text-white !bg-amber-600 !border-amber-600 shadow-lg"}
                                breakLabel={"..."}
                                disabledClassName={"opacity-30 cursor-not-allowed"}
                            />
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </main>
    );
};

export default CarsPage;