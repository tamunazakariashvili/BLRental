import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBooking } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import { confirmBookingPayment } from "../services/paymentService";
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const PaymentSuccessPage = () => {
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");
    const { fetchMyBookings } = useBooking();
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    const accentColor = "rgb(34, 40, 52)";

    useEffect(() => {
        const confirm = async () => {
            if (bookingId) {
                try {
                    // ✅ ბანკს ვეკითხებით გადახდა დასრულდა თუ არა
                    await confirmBookingPayment(bookingId);
                } catch (err) {
                    console.error('Confirm error:', err);
                }
            }
            // ✅ განახლება ნებისმიერ შემთხვევაში
            await fetchMyBookings();
        };

        confirm();
    }, []);

    return (
        <>
            <div className=" w-full bg-[rgb(34,40,52)] p-9 md:p-12"></div>
            <section className="bg-[#f8f9fa] min-h-screen py-10 md:py-20 px-4 md:px-6 relative overflow-hidden font-sans flex items-center justify-center">

                {/* Background Typography */}
                <div className="absolute top-10 left-10 text-[15vw] md:text-[10vw] font-black text-gray-200/40 leading-none select-none pointer-events-none uppercase hidden xs:block">
                    {t("SUCCESS")}
                </div>

                <div className="max-w-6xl mx-auto w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white border border-gray-200 p-6 md:p-16 rounded-[30px] md:rounded-[40px] shadow-sm">

                        {/* Left Side: Content */}
                        <div className="text-left order-2 lg:order-1">
                            <div className="mb-6 md:mb-8">
                                <div className="flex items-center gap-2 mb-4 justify-start">
                                    <div className="w-8 h-[1px]" style={{ backgroundColor: accentColor }}></div>
                                    <span style={{ color: accentColor }} className="font-bold tracking-widest uppercase text-[9px] md:text-[10px]">
                                        {t("Transaction Completed")}
                                    </span>
                                </div>

                                <h2 className="text-3xl md:text-5xl font-bold text-[rgb(34,40,52)] leading-tight tracking-tight mb-4">
                                    {t("Reservation")} <span className="text-gray-400 font-light">{t("accepted.")}</span>
                                </h2>

                                <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-md">
                                    {t("Your reservation has been successfully added. We will contact you within 24 hours.")}
                                </p>
                            </div>

                            {/* Order Details Strip */}
                            <div className="grid grid-cols-2 gap-4 mb-8 md:mb-10 border-t border-gray-100 pt-6 md:pt-8">
                                <div>
                                    <p className="text-gray-400 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">{t("Reference ID")}</p>
                                    <p className="text-[rgb(34,40,52)] text-[11px] md:text-sm font-mono tracking-tighter truncate">
                                        #{bookingId?.slice(-8).toUpperCase() || t("SUCCESS")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-[8px] md:text-[9px] uppercase tracking-widest mb-1">{t("System Status")}</p>
                                    <div className="flex items-center gap-2 text-green-600">
                                        <div className="w-1.5 h-1.5 rounded-full bg-current animate-ping"></div>
                                        <p className="text-[10px] md:text-[11px] font-bold uppercase">{t("Verified Safe")}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                                <button
                                    onClick={() => navigate(isAdmin ? "/adminpanel" : "/panel")}
                                    style={{ backgroundColor: accentColor }}
                                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 text-white font-bold text-[10px] md:text-xs rounded-full hover:opacity-90 transition-all active:scale-95 uppercase tracking-widest shadow-md shadow-[rgb(34,40,52)]/10"
                                >
                                    {t("View My Bookings")}
                                </button>
                                <button
                                    onClick={() => navigate("/")}
                                    className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-gray-200 text-[rgb(34,40,52)] font-bold text-[10px] md:text-xs rounded-full hover:bg-gray-50 transition-all uppercase tracking-widest"
                                >
                                    {t("Go to Home")}
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Visual Showcase */}
                        <div className="relative flex justify-center items-center order-1 lg:order-2">
                            <div className="relative z-10 w-full max-w-[200px] md:max-w-sm aspect-square bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
                                <img
                                    src="/success.png"
                                    className="w-full h-full object-contain grayscale-[0.2] drop-shadow-lg"
                                    alt="Success"
                                />
                            </div>

                            {/* Decorative Circles */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-[rgb(34,40,52)]/[0.05] rounded-full animate-spin-slow"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 border border-[rgb(34,40,52)]/[0.08] rounded-full"></div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                .animate-spin-slow {
                    animation: spin 20s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
            </section>
        </>
    );
};

export default PaymentSuccessPage;







// import { useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { useBooking } from "../contexts/BookingContext";

// const Panel = () => {
//     const { logout, user } = useAuth();
//     const { myBookings } = useBooking();
//     const [showSettings, setShowSettings ]= useState(false);




//     return (
//         <div className="flex min-h-screen  bg-[#fcfcfc] font-sans">

//             {/* --- SIDEBAR --- */}
//             <aside className="w-64 bg-black ml-[20px] rounded-tl-[30px] text-white flex flex-col hidden md:flex">
//                 <div className="p-8 text-2xl font-black italic tracking-tighter">
//                     NOVA<span className="text-[#ff3131]">RIDE</span>
//                 </div>

//                 <nav className="flex-1 px-4 space-y-2">
//                     <a href="#" className="flex items-center p-3 bg-[#ff3131] rounded-lg font-bold">Dashboard</a>
//                     <button  href="#" className="flex items-center cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors">My Bookings</button >

//                     <button className="flex items-center  cursor-pointer p-3 hover:bg-white/10 rounded-lg transition-colors" onClick={(e) => {
//                         e.preventDefault();
//                         setShowSettings(prev => !prev);
//                     }}>Settings</button>
//                 </nav>
//                 {showSettings &&
//                     <div className="mb-[400px] p-3 pl-15 border-t border-white/10">
//                         <button onClick={logout} className="flex items-center text-gray-400 hover:text-[#ff3131] transition-colors">
//                             Logout →
//                         </button>
//                     </div>
//                 }


//             </aside>

//             {/* --- MAIN CONTENT --- */}
//             <main className="flex-1 flex flex-col">

//                 {/* Top Header */}
//                 <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8">
//                     <h1 className="text-xl font-bold uppercase tracking-tight">User Dashboard</h1>
//                     <div className="flex items-center gap-4">
//                         <div className="text-right">
//                             <p className="text-sm font-bold leading-none">{user.fullname}</p>
//                             <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{user.role}</p>
//                         </div>
//                         <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-[#ff3131]">
//                             {user.fullname?.charAt(0).toUpperCase()}
//                         </div>
//                     </div>
//                 </header>

//                 <div className="p-8 space-y-8">

//                     {/* --- STATS SECTION --- */}
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
//                             <div className="absolute top-0 right-0 w-16 h-16 bg-[#ff3131]/5 rounded-bl-full transition-all group-hover:scale-110"></div>
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Active Bookings</p>
//                             <p className="text-4xl font-black mt-2">{myBookings.length}</p>
//                         </div>
//                         <div className="bg-black text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Distance</p>
//                             <p className="text-4xl font-black mt-2 italic">1,240 <span className="text-[#ff3131] text-lg">km</span></p>
//                         </div>
//                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Account Status</p>
//                             <p className="text-xl font-bold mt-2 text-green-500 flex items-center gap-2">
//                                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Verified
//                             </p>
//                         </div>
//                     </div>

//                     {/* --- TABLE SECTION --- */}
//                     <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//                         <div className="p-6 border-b border-gray-50 flex justify-between items-center">
//                             <h3 className="font-black uppercase tracking-tight italic text-lg">Recent Bookings</h3>
//                             <button className="text-[#ff3131] text-xs font-bold uppercase hover:underline">View All</button>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="w-full text-left border-collapse">
//                                 <thead className="bg-gray-50/50">
//                                     <tr>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Car Model</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Date</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest">Status</th>
//                                         <th className="p-4 text-[10px] uppercase font-bold text-gray-400 tracking-widest text-right">Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="divide-y divide-gray-50">
//                                     {
//                                         myBookings.map((booking, index) => (
//                                             <tr key={index}>
//                                                 <td className="p-4 font-bold group-hover:text-[#ff3131]">{booking.car.model}</td>
//                                                 <td className="p-4 text-sm text-gray-500">
//                                                     {booking.startDate ? new Date(booking.startDate).toLocaleDateString('ka-GE') : '---'}
//                                                 </td>
//                                                 <td className={`p-4 text-[10px] font-bold uppercase ${booking.status === 'confirmed' ? 'text-green-500' : 'text-orange-500'}`}> {booking.status}</td>
//                                                 <td className="p-4 text-right font-black italic">${booking.totalPrice}</td>
//                                             </tr>
//                                         ))
//                                     }
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Panel;




