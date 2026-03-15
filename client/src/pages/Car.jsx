import { useRef, useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useCars } from "../contexts/CarsContext";
import { useNavigate, useParams } from "react-router-dom";
import CarMap from "../components/CarMap";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const Car = () => {
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const { cars } = useCars();
    const { id } = useParams();
    const navigate = useNavigate();

    // --- Lightbox-ის State-ები ---
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const car = cars.find(c => c._id === id);

    const lat = car?.location?.coordinates?.coordinates[1];
    const lng = car?.location?.coordinates?.coordinates[0];

    // კლავიატურის ისრებით გადაფურცვლა
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isGalleryOpen) return;
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "Escape") setIsGalleryOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isGalleryOpen, currentImageIndex]);

    if (!car) {
        return <div className="h-screen flex items-center justify-center text-white bg-[#050505] text-2xl font-medium">{t("MACHINE NOT FOUND")}</div>;
    }

    const openGallery = (index) => {
        setCurrentImageIndex(index);
        setIsGalleryOpen(true);
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    };

    return (
        <main className="text-[#e0e0e0] min-h-screen font-sans selection:bg-[#FE9A00] selection:text-black">

            {/* Lightbox Modal */}
            {isGalleryOpen && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4">
                    <button
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>

                    <div className="relative w-full max-w-6xl flex items-center justify-center group">
                        <button onClick={prevImage} className="absolute left-4 p-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-20">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <img
                            src={car.images[currentImageIndex]}
                            className="max-h-[85vh] max-w-full object-contain shadow-2xl rounded-lg animate-in fade-in zoom-in duration-300"
                            alt="Gallery"
                        />

                        <button onClick={nextImage} className="absolute right-4 p-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-20">
                            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6 6-6" /></svg>
                        </button>
                    </div>

                    <div className="mt-6 flex gap-3 overflow-x-auto max-w-full p-2 scrollbar-hide">
                        {car.images.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-20 h-14 object-cover rounded-md cursor-pointer transition-all flex-shrink-0 ${idx === currentImageIndex ? 'ring-2 ring-orange-500 scale-105' : 'opacity-40 hover:opacity-100'}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative h-[450px] md:h-[600px] pt-[15%] md:pt-[5%] w-full bg-[#0b0e14] overflow-hidden flex items-center">
                <div className="absolute top-0 right-0 w-2/3 h-full bg-[#161b22] rounded-l-[100%] translate-x-1/4 scale-150 opacity-50" />
                <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center relative z-10">
                    <div className="text-white space-y-4 max-w-md">
                        <h1 className="hidden md:block md:text-5xl lg:text-6xl font-serif italic font-bold leading-tight text-white">
                            {t("Find Your")} <br />
                            <span className="mt-2 block">{t("Dream Car")}</span>
                        </h1>
                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-18 md:mt-0">
                            {t("Luxury and performance combined in one perfect package. Experience the thrill of driving.")}
                        </p>
                        <button className="mt-4 px-8 py-2 border border-white rounded-md hover:bg-white hover:text-black transition-all duration-300 text-sm uppercase tracking-wider">
                            {t("Explore More")}
                        </button>
                    </div>
                    <div className="relative flex justify-end mt-8 md:mt-0">
                        <img
                            src='/a426ed1a35acdfecc9104b6f3ce5b992x.png'
                            alt="Dream Car"
                            className="w-full max-w-[350px] md:max-w-[600px] object-contain drop-shadow-2xl scale-110 md:scale-125 transition-transform duration-300 md:translate-y-[18%]"
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-8 md:h-12 bg-white" />
            </div>

            {/* Main Content */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-10 bg-white">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-4 border-b border-gray-100 pb-6 md:pb-8">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 md:mb-3">
                            <span className="text-orange-500 font-bold">★ 4.91</span>
                            <span>(98 {t("reviews")})</span>
                            <span>•</span>
                            <span>{car.location.address}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                            {car.year} {car.make} {car.model}
                        </h1>
                    </div>
                    <div className="text-left md:text-right">
                        <p className="text-3xl md:text-4xl font-black text-gray-900">${car.pricePerDay.toLocaleString()}</p>
                        <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest">{t("PER DAY")}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                    {/* Left Column */}
                    <div className="lg:col-span-8 space-y-10 md:space-y-16">

                        {/* Photo Grid */}
                        <div className="grid grid-cols-4 gap-2 md:gap-4 h-[200px] sm:h-[300px] md:h-[550px]">
                            <div
                                onClick={() => openGallery(0)}
                                className="col-span-3 rounded-[20px] md:rounded-[40px] overflow-hidden shadow-xl border border-gray-100 cursor-pointer group"
                            >
                                <img
                                    src={car.images[0]}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt="Main"
                                />
                            </div>

                            <div className="col-span-1 flex flex-col gap-2 md:gap-4">
                                <div
                                    onClick={() => openGallery(1)}
                                    className="h-1/2 rounded-[15px] md:rounded-[30px] overflow-hidden border border-gray-100 shadow-sm cursor-pointer group"
                                >
                                    <img
                                        src={car.images[1]}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        alt="Side"
                                    />
                                </div>

                                <div
                                    onClick={() => openGallery(2)}
                                    className="h-1/2 rounded-[15px] md:rounded-[30px] overflow-hidden border border-gray-100 relative group cursor-pointer shadow-sm"
                                >
                                    <img
                                        src={car.images[2] || car.images[0]}
                                        className="w-full h-full object-cover brightness-75 group-hover:brightness-50 transition-all duration-500 group-hover:scale-110"
                                        alt="More"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white font-bold">
                                        <span className="text-sm md:text-2xl">+{car.images.length}</span>
                                        <span className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-80 hidden sm:block">{t("Photos")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Specs */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
                            {[
                                { label: t('Body type'), val: t('Sedan') },
                                { label: t('Volume'), val: car.pasenger + ` ${t('Seats')}` },
                                { label: t('Consumption'), val: t('27-28 Mpg') },
                                { label: t('Engine'), val: t('3.2L 6-Cyl') }
                            ].map((spec, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-50 p-3 md:p-6 rounded-[18px] md:rounded-[24px] flex flex-row md:flex-col items-center md:items-start gap-3 md:gap-3 border border-gray-100 shadow-sm"
                                >
                                    <div className="min-w-0">
                                        <p className="text-gray-400 text-[9px] md:text-[11px] uppercase font-bold tracking-wider truncate">
                                            {spec.label}
                                        </p>
                                        <p className="text-gray-900 font-bold text-[11px] md:text-sm truncate">
                                            {spec.val}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{t("About this")} {car.make}</h3>
                            <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-3xl">
                                {car.description || t("Experience the perfect blend of performance and luxury. This vehicle is meticulously maintained to provide the best driving experience for our clients.")}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12 pt-6 md:pt-10 border-t border-gray-100">
                            {Object.entries(car.features).slice(0, 10).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between md:justify-start md:gap-4 font-medium group">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${value
                                            ? "bg-[#BEF264]/10 border border-[#BEF264]/50"
                                            : "bg-gray-100 border border-gray-200"
                                            }`}>
                                            {value ? (
                                                <svg className="w-3.5 h-3.5 text-[#8dc032]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`capitalize text-sm md:text-base transition-colors ${value ? "text-gray-800" : "text-gray-400 line-through decoration-gray-300"
                                            }`}>
                                            {t(key.replace(/([A-Z])/g, ' $1'))}
                                        </span>
                                    </div>
                                    <span className="md:hidden text-[10px] font-bold uppercase tracking-tighter">
                                        {value ? t("Yes") : t("No")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 sticky top-24 space-y-6 md:space-y-8">
                        <div className="bg-white border border-gray-100 rounded-[30px] md:rounded-[40px] p-6 md:p-8 shadow-2xl shadow-gray-200/50">
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-orange-50 rounded-full flex items-center justify-center font-bold text-orange-600 border border-orange-100">
                                    SC
                                </div>
                                <div>
                                    <h4 className="text-gray-900 font-bold text-base md:text-lg flex items-center gap-2">
                                        {t("Premium Dealer")} <span className="text-blue-500 text-xs">✔</span>
                                    </h4>
                                    <p className="text-gray-400 text-xs md:text-sm italic font-medium">{car.location.address}</p>
                                </div>
                            </div>

                            <div className="rounded-[24px] md:rounded-[30px] overflow-hidden h-[200px] md:h-[250px] border border-gray-100 mb-6 md:mb-8 shadow-inner">
                                {lat && lng ? (
                                    <CarMap lat={lat} lng={lng} address={car.location.address} />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 animate-pulse" />
                                )}
                            </div>
                            <section className="w-full bg-gray-50 border border-gray-100 overflow-hidden rounded-[30px] md:rounded-[40px] pb-8 md:pb-10 shadow-sm relative">
                                <div className="mt-6 md:mt-8 flex flex-col gap-5 md:gap-6 px-5 md:px-10">
                                    {[
                                        { icon: "/810008.png", label: t("Doors"), val: car.doors },
                                        { icon: "/imgi_4_icon-passengers (1).svg", label: t("Passenger"), val: car.pasenger },
                                        { icon: "/imgi_5_icon-transmission.svg", label: t("Transmission"), val: t(car.transmission?.split(' ')[0]) },
                                        { icon: "/imgi_6_icon-age.svg", label: t("Year"), val: car.year },
                                        { icon: "/imgi_8_icon-aircondition.svg", label: t("Air Condition"), val: car.features.airCondition ? t("Yes") : t("No") }
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center justify-between gap-2 group w-full">
                                            <div className="flex items-center gap-3 md:gap-4 min-w-0">
                                                <div className="w-9 h-9 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center bg-white rounded-xl group-hover:bg-[#FE9A00]/10 transition-colors">
                                                    <img className="w-5 h-5 md:w-6 md:h-6 object-contain opacity-70 group-hover:opacity-100" src={item.icon} alt={item.label} />
                                                </div>
                                                <p className="text-[14px] md:text-[15px] text-gray-500 font-medium truncate">{item.label}</p>
                                            </div>
                                            <p className="text-[14px] md:text-[16px] font-bold text-gray-900 whitespace-nowrap pl-2">
                                                {item.val}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex items-center justify-center gap-3 md:gap-4 px-4 md:px-8">
                                    <div className="group flex items-center">
                                        <button
                                            onClick={() => navigate(`/bookingpage/${car._id}`)}
                                            className="w-[110px] md:w-[150px] h-[55px] md:h-[60px] cursor-pointer rounded-l-[25px] md:rounded-l-[30px] bg-black flex justify-center items-center text-white font-black text-[15px] md:text-[17px] transition-all duration-300"
                                        >
                                            {t("Book Now")}
                                        </button>

                                        <button
                                            onClick={() => navigate(`/bookingpage/${car._id}`)}
                                            className="bg-black w-[55px] md:w-[60px] h-[55px] md:h-[60px] rounded-r-[25px] md:rounded-r-[30px] border-l border-white/10 text-white  cursor-pointer flex justify-center items-center transition-all duration-300"
                                        >
                                            <svg
                                                className="transform rotate-[-45deg] transition-transform duration-500"
                                                fill="none"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                width="24"
                                            >
                                                <path
                                                    d="M15.0378 6.34317L13.6269 7.76069L16.8972 11.0157L3.29211 11.0293L3.29413 13.0293L16.8619 13.0157L13.6467 16.2459L15.0643 17.6568L20.7079 11.9868L15.0378 6.34317Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes zoom-in { from { transform: scale(0.95); } to { transform: scale(1); } }
                .animate-in { animation: fade-in 0.3s ease-out, zoom-in 0.3s ease-out; }
            `}</style>
        </main>
    );
};

export default Car;