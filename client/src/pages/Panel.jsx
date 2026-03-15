import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBooking } from "../contexts/BookingContext";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    IconCar, IconSettings, IconLogout, IconMenu2, IconActivity,
    IconId, IconLock, IconUserEdit, IconArrowLeft,
    IconChevronRight, IconPhone
} from "@tabler/icons-react";
import ChangePassword from "../components/ChangePasswordForm";
import UpdateMyProfileForm from "../components/UpdateMyProfileForm";

const Panel = () => {
    const { t } = useTranslation();
    const { logout, user } = useAuth();
    const { myBookings } = useBooking();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
    const [settingsView, setSettingsView] = useState("overview");

    const accentColor = "rgb(34, 40, 52)";
    const accentLight = "rgba(197, 160, 89, 0.1)";

    return (
        <div className="flex h-screen bg-[#F9FAFB] font-sans text-[#1A1C21] overflow-hidden">
            {/* Overlay for mobile sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[150] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* SIDEBAR */}
            <aside className={`fixed md:relative z-[160] w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-full ${isSidebarOpen ? "left-0" : "-left-full md:left-0"}`}>
                <div className="p-6 md:p-8 mb-4">
                    <Link to="/" className="group flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300" style={{ backgroundColor: accentColor }}>
                            <IconCar size={18} color="white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg md:text-xl font-black tracking-tighter leading-none uppercase" style={{ color: accentColor }}>
                                bl<span className="text-gray-900">rental</span>
                            </span>
                            <span className="text-[8px] md:text-[9px] font-medium text-gray-400 tracking-[0.2em] uppercase mt-1">{t('Premium Service')}</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <button onClick={() => { setActiveTab("dashboard"); setIsSidebarOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: activeTab === 'dashboard' ? accentLight : 'transparent', color: activeTab === 'dashboard' ? accentColor : '#6B7280' }}>
                        <IconActivity size={20} /> {t('Bookings')}
                    </button>
                    <button onClick={() => { setActiveTab("settings"); setIsSidebarOpen(false); setSettingsView("overview"); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all" style={{ backgroundColor: activeTab === 'settings' ? accentLight : 'transparent', color: activeTab === 'settings' ? accentColor : '#6B7280' }}>
                        <IconSettings size={20} /> {t('Settings')}
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2">
                        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                            {user?.fullname?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-xs md:text-sm font-semibold truncate text-gray-900">{user?.fullname}</p>
                            <button onClick={logout} className="text-[10px] md:text-[11px] text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                                <IconLogout size={12} /> {t('Logout')}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">

                <div className="h-20 flex items-center justify-between px-8 bg-[rgb(34,40,52)] border-b border-gray-200 sticky top-0 z-40">

                </div>
                <header className="h-16 md:h-20 flex items-center justify-between px-4 md:px-8 bg-white border-b border-gray-200 sticky top-0 z-40">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <IconMenu2 size={22} />
                        </button>
                        <h1 className="text-[13px] md:text-xl font-black uppercase tracking-tight text-gray-900 truncate leading-tight">
                            {activeTab === "dashboard" ? t("My Bookings") : t("Account Settings")}
                        </h1>
                    </div>

                    <Link to="/cars" className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-[#1A1C21] text-white rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all hover:opacity-90 shadow-md">
                        {t('Book Now')}
                    </Link>
                </header>

                <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
                    <AnimatePresence mode="wait">
                        {activeTab === "dashboard" ? (
                            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {/* MOBILE LIST VIEW */}
                                <div className="grid grid-cols-1 gap-4 md:hidden">
                                    {myBookings.length > 0 ? (
                                        myBookings.map((booking, index) => (
                                            <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-100">
                                                            <IconCar size={20} className="text-orange-500" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-mono font-bold text-gray-400 leading-none mb-1">
                                                                #{booking._id?.slice(-6).toUpperCase() || index + 1}
                                                            </p>
                                                            <h4 className="font-black italic text-gray-900 text-sm">
                                                                {booking.car?.model || t("Standard Vehicle")}
                                                            </h4>
                                                        </div>
                                                    </div>
                                                    <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-100' :
                                                        booking.status === 'completed' ? 'bg-gray-50 text-gray-400 border-gray-200' :
                                                            'bg-orange-50 text-orange-600 border-orange-100'
                                                        }`}>
                                                        {t(booking.status)}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 py-3 border-y border-gray-50">
                                                    <div>
                                                        <p className="text-[8px] text-gray-400 uppercase font-black mb-1">{t('Period')}</p>
                                                        <p className="text-[10px] font-bold text-gray-900">
                                                            {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : '---'} - {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : '---'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[8px] text-gray-400 uppercase font-black mb-1">{t('Price')}</p>
                                                        <p className="text-sm font-black italic text-gray-900">${booking.totalPrice || '0'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <IconPhone size={14} className="text-gray-400" />
                                                    <span className="text-[11px] font-bold tracking-tight">
                                                        {booking.phone || user?.phone || "---"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center uppercase text-[10px] font-black text-gray-300 tracking-[0.2em]">
                                            {t('No active history detected.')}
                                        </div>
                                    )}
                                </div>

                                {/* DESKTOP TABLE VIEW */}
                                <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-gray-50 bg-gray-50/50">
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{t('ID')}</th>
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{t('Vehicle')}</th>
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{t('Contact')}</th>
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{t('Period')}</th>
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">{t('Status')}</th>
                                                    <th className="px-6 py-5 text-[10px] uppercase font-black text-gray-400 tracking-[0.2em] text-right">{t('Price')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {myBookings.length > 0 ? (
                                                    myBookings.map((booking, index) => (
                                                        <tr key={index} className="group hover:bg-gray-50/50 transition-colors">
                                                            <td className="px-6 py-6">
                                                                <span className="text-[11px] font-mono font-bold text-gray-400">
                                                                    #{booking._id?.slice(-6).toUpperCase() || index + 1}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-100 shrink-0">
                                                                        <IconCar size={18} className="text-orange-500" />
                                                                    </div>
                                                                    <span className="font-bold italic text-gray-900 text-sm truncate">
                                                                        {booking.car?.model || t("Standard Vehicle")}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <div className="flex items-center gap-2 text-gray-600">
                                                                    <IconPhone size={12} className="text-gray-400 shrink-0" />
                                                                    <span className="text-xs font-bold tracking-tight">
                                                                        {booking.phone || user?.phone || "---"}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <div className="flex flex-col gap-1">
                                                                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-900">
                                                                        {booking.startDate ? new Date(booking.startDate).toLocaleDateString() : '---'}
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400">
                                                                        {booking.endDate ? new Date(booking.endDate).toLocaleDateString() : '---'}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-6">
                                                                <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${booking.status === 'confirmed' ? 'bg-green-50 text-green-600 border-green-100' :
                                                                    booking.status === 'completed' ? 'bg-gray-50 text-gray-400 border-gray-200' :
                                                                        'bg-orange-50 text-orange-600 border-orange-100'
                                                                    }`}>
                                                                    {t(booking.status)}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-6 text-right">
                                                                <span className="font-black italic text-lg text-gray-900">
                                                                    ${booking.totalPrice || '0'}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="6" className="px-6 py-20 text-center text-gray-400 font-bold italic tracking-widest uppercase text-xs">
                                                            {t('No active history detected.')}
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
                                {settingsView === "overview" ? (
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                                        <div className="md:col-span-1 bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm h-fit">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-4 md:mb-6" style={{ backgroundColor: accentLight, color: accentColor }}>
                                                <IconId size={22} />
                                            </div>
                                            <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6">{t('Profile Identity')}</h3>
                                            <div className="space-y-4 md:space-y-6">
                                                <div>
                                                    <p className="text-[9px] md:text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">{t('Full Name')}</p>
                                                    <p className="text-xs md:text-sm font-bold text-gray-900 truncate">{user?.fullname}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] md:text-[10px] font-bold uppercase text-gray-400 tracking-wider mb-1">{t('Email Address')}</p>
                                                    <p className="text-xs md:text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-3 md:space-y-4">
                                            <button onClick={() => setSettingsView("profile")} className="w-full group flex items-center justify-between bg-white border border-gray-200 p-4 md:p-6 rounded-2xl transition-all shadow-sm hover:border-gray-400">
                                                <div className="flex items-center gap-3 md:gap-4 text-left overflow-hidden">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors shrink-0">
                                                        <IconUserEdit size={20} />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">{t('Update Profile')}</h4>
                                                        <p className="text-[10px] md:text-xs text-gray-500 truncate">{t('Personal information and metadata')}</p>
                                                    </div>
                                                </div>
                                                <IconChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all shrink-0" />
                                            </button>
                                            <button onClick={() => setSettingsView("password")} className="w-full group flex items-center justify-between bg-white border border-gray-200 p-4 md:p-6 rounded-2xl transition-all shadow-sm hover:border-gray-400">
                                                <div className="flex items-center gap-3 md:gap-4 text-left overflow-hidden">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-100 transition-colors shrink-0">
                                                        <IconLock size={20} />
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h4 className="font-bold text-gray-900 text-sm md:text-base">{t('Security Access')}</h4>
                                                        <p className="text-[10px] md:text-xs text-gray-500 truncate">{t('Change password and credentials')}</p>
                                                    </div>
                                                </div>
                                                <IconChevronRight size={18} className="text-gray-300 group-hover:translate-x-1 transition-all shrink-0" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto">
                                        <button onClick={() => setSettingsView("overview")} className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase text-gray-400 hover:text-gray-900 mb-6 md:mb-8 transition-colors group">
                                            <IconArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> {t('Back')}
                                        </button>
                                        <div className="mobile-form-container">
                                            {settingsView === "profile" ? <UpdateMyProfileForm /> : <ChangePassword />}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Panel;











<div className="h-20 flex items-center justify-between px-8 bg-[rgb(34,40,52)] border-b border-gray-200 sticky top-0 z-40">

</div>