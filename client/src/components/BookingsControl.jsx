import { useBooking } from "../contexts/BookingContext";
import { useLanguage } from "../hooks/useLanguage"; // ენის ჰუკი
import { IconTrash, IconCalendarMonth, IconUser, IconCar, IconSearch, IconArrowRight, IconEdit, IconWallet } from "@tabler/icons-react";
import UpdateBookingForm from "./UpdateBookingForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingsControl = () => {
    const { allBookings, deletedBooking } = useBooking();
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await deletedBooking(id);
        } catch (error) {
            console.error("Failed to delete booking:", error);
        }
    };

    const handleEditClick = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'confirmed': return "bg-green-50 text-green-600 border-green-100 shadow-sm";
            case 'pending': return "bg-gray-50 text-gray-500 border-gray-200 shadow-sm";
            case 'complete':
            case 'completed': return "bg-black text-white border-black font-black";
            case 'cancelled': return "bg-red-50 text-red-500 border-red-100";
            default: return "bg-gray-50 text-gray-400 border-gray-200";
        }
    };

    const headerStyle = "p-6 text-[10px] uppercase font-black text-gray-400 tracking-widest border-b border-gray-100";
    const cellStyle = "p-6 text-sm border-b border-gray-100 text-black font-medium";

    return (
        <div className="w-full space-y-6">

            {isModalOpen && selectedBooking && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="relative z-10 w-full max-w-sm">
                        <UpdateBookingForm
                            booking={selectedBooking}
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden px-2">
                {allBookings?.map((booking) => (
                    <div key={booking._id} onClick={() => navigate(`/admin/bookings/${booking._id}`)} className="bg-white border border-gray-100 rounded-[32px] p-5 shadow-sm space-y-4 relative overflow-hidden">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-black border border-gray-200">
                                    <IconCar size={20} stroke={2} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-black">
                                        {booking.car?.brand || 'N/A'}
                                    </h4>
                                    <p className="text-[10px] text-gray-400 font-bold italic uppercase">
                                        #{booking._id.slice(-6).toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            <span className={`py-1.5 px-3 rounded-lg text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(booking.status)}`}>
                                {t(booking.status) || booking.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3 py-3 border-y border-gray-50">
                            <div className="flex items-center gap-2 text-gray-600">
                                <IconUser size={14} className="text-gray-400" />
                                <span className="text-xs font-bold capitalize">{booking.user?.fullname || t('Guest User')}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <IconCalendarMonth size={14} className="text-gray-400" />
                                <div className="flex items-center gap-1.5 text-[10px] font-black font-mono">
                                    <span className="text-gray-500">{new Date(booking.startDate).toLocaleDateString()}</span>
                                    <IconArrowRight size={10} className="text-black" />
                                    <span className="text-gray-500">{new Date(booking.endDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                            <div className="flex items-center gap-1.5">
                                <IconWallet size={16} className="text-gray-400" />
                                <span className="text-lg font-black text-black italic tracking-tighter">
                                    ${booking.totalPrice?.toLocaleString()}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleEditClick(booking); }}
                                    className="p-3 bg-gray-50 text-gray-500 rounded-2xl border border-gray-100 active:scale-90 transition-transform"
                                >
                                    <IconEdit size={18} />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDelete(booking._id); }}
                                    className="p-3 bg-red-50 text-red-500 rounded-2xl border border-red-100 active:scale-90 transition-transform"
                                >
                                    <IconTrash size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {(!allBookings || allBookings.length === 0) && (
                    <div className="py-20 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                        <IconSearch size={40} className="mx-auto text-gray-200 mb-2" />
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{t('No Active Bookings')}</p>
                    </div>
                )}
            </div>

            {/* --- DESKTOP VIEW (Table) --- */}
            <div className="hidden md:block bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm relative">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className={headerStyle}>{t('Vehicle Identity')}</th>
                                <th className={headerStyle}>{t('Customer Intel')}</th>
                                <th className={headerStyle}>{t('Operational Window')}</th>
                                <th className={headerStyle}>{t('Total Revenue')}</th>
                                <th className={headerStyle}>{t('Status')}</th>
                                <th className={headerStyle} style={{ textAlign: 'right' }}>{t('Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {allBookings?.map((booking) => (
                                <tr key={booking._id} onClick={() => navigate(`/admin/bookings/${booking._id}`)} className="hover:bg-gray-50/50 transition-all group cursor-pointer">
                                    <td className={cellStyle}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 group-hover:border-black/10 transition-colors text-black">
                                                <IconCar size={20} stroke={2} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-black group-hover:text-gray-600 transition-colors uppercase tracking-tight">
                                                    {booking.car?.brand || 'N/A'}
                                                </p>
                                                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5 italic">
                                                    #{booking._id.slice(-6).toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-700 capitalize">{booking.user?.fullname || t('Guest User')}</span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex items-center gap-2 text-[10px] font-black">
                                            <span className="bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-500 font-mono">
                                                {new Date(booking.startDate).toLocaleDateString()}
                                            </span>
                                            <IconArrowRight size={12} className="text-black" />
                                            <span className="bg-gray-50 border border-gray-200 px-2 py-1 rounded text-gray-500 font-mono">
                                                {new Date(booking.endDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <div className="flex flex-col">
                                            <span className="text-lg font-black text-black italic tracking-tighter">
                                                ${booking.totalPrice?.toLocaleString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td className={cellStyle}>
                                        <span className={`inline-flex items-center py-1.5 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${getStatusStyle(booking.status)}`}>
                                            {t(booking.status) || booking.status}
                                        </span>
                                    </td>

                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleEditClick(booking); }}
                                                className="p-3 bg-gray-50 text-gray-400 hover:bg-[rgb(34,40,52)] hover:text-white rounded-xl transition-all duration-300 border border-gray-100 active:scale-90"
                                                title={t("Update Status")}
                                            >
                                                <IconEdit size={18} stroke={2} />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDelete(booking._id); }}
                                                className="p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-gray-100 active:scale-90"
                                                title={t("Delete")}
                                            >
                                                <IconTrash size={18} stroke={2} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {(!allBookings || allBookings.length === 0) && (
                                <tr>
                                    <td colSpan="6" className="p-32 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-10">
                                            <IconSearch size={48} stroke={1} className="text-black" />
                                            <p className="text-black font-black uppercase tracking-[0.4em] italic text-sm">{t('No Active Bookings')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookingsControl;