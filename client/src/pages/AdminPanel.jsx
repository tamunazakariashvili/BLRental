import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../hooks/useLanguage"; // დავამატეთ ენის ჰუკი
import UserControl from "../components/userControl";
import CarControl from "../components/CarControl";
import BookingsControl from "../components/BookingsControl";
import AdminSystemConfig from "../components/AdminSystemConfig";
import { motion, AnimatePresence } from "framer-motion";
import {
    IconUsers, IconCar, IconCalendarStats, IconSettings,
    IconLogout, IconMenu2, IconShieldLock
} from "@tabler/icons-react";
import { useBooking } from "../contexts/BookingContext";
import { useCars } from "../contexts/CarsContext";

const AdminPanel = () => {
    const { logout, users, user } = useAuth();
    const { t } = useLanguage(); // i18n ტრანსლაციის ფუნქცია
    const { totalRevenue, myBookings } = useBooking();
    const { totalCars } = useCars();

    const [activeTab, setActiveTab] = useState("users");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const accentColor = "rgb(34, 40, 52)";

    const menuItems = [
        { id: "cars", label: t("Cars Control"), icon: <IconCar size={20} /> },
        { id: "users", label: t("User Directory"), icon: <IconUsers size={20} /> },
        { id: "bookings", label: t("Booking Control"), icon: <IconCalendarStats size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-[rgb(34,40,52)] font-sans text-[#1A1C21] overflow-hidden pt-[80px] md:pt-[90px]">

            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <aside className={`
                fixed md:relative z-[160]
                w-72 bg-white border-r border-gray-100 
                flex flex-col transition-all duration-300
                h-full
                ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}
            `}>
                <div className="p-8 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-black">
                            <IconShieldLock size={22} color="white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t("Management")}</p>
                            <h2 className="text-sm font-bold uppercase tracking-tighter">Admin <span className="text-gray-400">Console</span></h2>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all group
                                ${activeTab === item.id
                                    ? 'bg-black text-white'
                                    : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                        >
                            <span className={`${activeTab === item.id ? 'text-white' : 'text-gray-400 group-hover:text-black'}`}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}

                    <div className="pt-8 mt-8 border-t border-gray-100 space-y-1">
                        <button
                            onClick={() => { setActiveTab("config"); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all
                                ${activeTab === "config" ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <IconSettings size={20} />
                            {t("System Config")}
                        </button>

                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
                        >
                            <IconLogout size={20} />
                            {t("Terminate Session")}
                        </button>
                    </div>
                </nav>

                <div className="p-6">
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center font-bold text-sm text-white">
                            {user?.fullname?.charAt(0) || 'A'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate text-gray-900">{user?.fullname}</p>
                            <p className="text-[9px] font-black uppercase text-gray-400">{t("Master Admin")}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar relative bg-white">
                <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2.5 bg-gray-50 rounded-xl">
                            <IconMenu2 size={20} className="text-gray-600" />
                        </button>
                        <h1 className="text-xl font-black uppercase tracking-tight text-gray-900">
                            {t(activeTab.replace('-', ' '))} <span className="text-gray-400 font-medium">{t("Control")}</span>
                        </h1>
                    </div>
                </header>

                <div className="flex-1 flex flex-col">
                    <div className="w-full h-full">
                        {activeTab !== "config" && (
                            <div className="px-8 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                    {activeTab === "my-bookings" ? t("My Personal History") : t("Live Data Feed")}
                                </h3>
                            </div>
                        )}

                        <div className="p-0 w-full overflow-x-auto no-scrollbar">
                            {activeTab === "users" && <UserControl users={users} />}
                            {activeTab === "cars" && <CarControl />}
                            {activeTab === "bookings" && <BookingsControl />}
                            {activeTab === "config" && <AdminSystemConfig />}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminPanel;