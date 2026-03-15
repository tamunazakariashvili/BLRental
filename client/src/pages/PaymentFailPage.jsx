import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PaymentFailPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    // წითელი აქცენტი შეცდომის აღსანიშნავად
    const errorColor = "rgb(220, 38, 38)"; 
    const darkColor = "rgb(34, 40, 52)";

    return (
        <>
            <div className="w-full bg-[rgb(34,40,52)] p-9 md:p-12"></div>
            <section className="bg-[#f8f9fa] min-h-screen py-10 md:py-20 px-4 md:px-6 relative overflow-hidden font-sans flex items-center justify-center">

                {/* Background Typography */}
                <div className="absolute top-10 left-10 text-[15vw] md:text-[10vw] font-black text-red-100/50 leading-none select-none pointer-events-none uppercase hidden xs:block">
                    FAILED
                </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white border border-gray-200 p-6 md:p-16 rounded-[30px] md:rounded-[40px] shadow-sm">

                        {/* Left Side: Content */}
                        <div className="text-left order-2 lg:order-1">
                            <div className="mb-6 md:mb-8">
                                <div className="flex items-center gap-2 mb-4 justify-start">
                                    <div className="w-8 h-[1px]" style={{ backgroundColor: errorColor }}></div>
                                    <span style={{ color: errorColor }} className="font-bold tracking-widest uppercase text-[9px] md:text-[10px]">
                                        Transaction Declined
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-[rgb(34,40,52)] leading-tight tracking-tight mb-4">
                                    Payment <span className="text-red-500 font-light">Failed.</span>
                                </h2>

                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md">
                                    We couldn't process your payment. This could be due to insufficient funds, 
                                    an expired card, or a temporary technical issue.
                                </p>
                            </div>

                            {/* Status Details Strip */}
                            <div className="grid grid-cols-2 gap-4 mb-8 md:mb-10 border-t border-gray-100 pt-6 md:pt-8">
                                <div>
                                    <p className="text-gray-400 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Reference ID</p>
                                    <p className="text-[rgb(34,40,52)] text-[11px] md:text-sm font-mono tracking-tighter truncate">
                                        #{bookingId?.slice(-8).toUpperCase() || "ERROR_TXN"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">Error Status</p>
                                    <div className="flex items-center gap-2 text-red-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                                        <p className="text-[10px] md:text-[11px] font-bold uppercase">Action Required</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                                <button
                                    onClick={() => navigate(-1)} // აბრუნებს წინა გვერდზე (გადახდის მცდელობამდე)
                                    style={{ backgroundColor: darkColor }}
                                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-white font-bold text-[10px] md:text-xs rounded-full hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest shadow-md"
                                >
                                    Try Again
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-gray-200 text-[rgb(34,40,52)] font-bold text-[10px] md:text-xs rounded-full hover:bg-gray-50 transition-all uppercase tracking-widest"
                                >
                                    Go to Home
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Visual Showcase */}
                        <div className="relative flex justify-center items-center order-1 lg:order-2">
                            <div className="relative z-10 w-full max-w-[200px] md:max-w-sm aspect-square bg-red-50/30 rounded-3xl p-6 md:p-8 border border-red-100">
                                {/* აქ შეგიძლია გამოიყენო სხვა ფოტო, მაგალითად error.png ან fail.png */}
                                <img
                                    src="/fail.png" 
                                    className="w-full h-full object-contain grayscale-[0.5] contrast-125 drop-shadow-xl"
                                    alt="Payment Failed"
                                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/5972/5972778.png" }} // Fallback თუ ფოტო არ გაქვს
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-red-500/[0.05] rounded-full"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border border-red-500/[0.08] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PaymentFailPage;