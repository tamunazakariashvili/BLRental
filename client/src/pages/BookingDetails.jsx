import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../contexts/BookingContext';
import { IconArrowLeft, IconPhone, IconMail, IconUser, IconCar, IconFileText, IconCircleCheck, IconMapPin } from '@tabler/icons-react';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { allBookings } = useBooking();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const found = allBookings?.find(b => b._id === id);
        setBooking(found);
    }, [id, allBookings]);

    if (!booking) return <div className="p-20 text-center uppercase font-black opacity-20 tracking-[0.5em]">Loading Intel...</div>;

    // მობილურზე (საწყისი) მომრგვალება არის მინიმალური, md-დან ხდება ისევ 24px
    const infoBoxStyle = "bg-gray-50 border border-gray-100 p-5 md:p-6 rounded-xl md:rounded-[24px]";
    const labelStyle = "text-[10px] uppercase font-black text-gray-400 tracking-widest mb-2 block";

    return (
        <>
            {/* მობილურზე ზედა პადინგი შევამცირე ცოტათი */}
            <div className="w-full bg-[rgb(34,40,52)] p-6 md:p-12"></div>

            {/* მობილურზე გვერდითა დაშორება p-4, დიდზე p-6 */}
            <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-3 bg-white border border-gray-100 rounded-xl md:rounded-2xl hover:bg-gray-50 transition-all">
                        <IconArrowLeft size={20} />
                    </button>
                    <div className="text-right">
                        <h1 className="text-xl font-black uppercase italic tracking-tighter text-[rgb(34,40,52)]">Booking Details</h1>
                        <p className="text-[10px] text-gray-400 font-bold">ID: #{booking._id.toUpperCase()}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column: Customer & Contact */}
                    <div className="lg:col-span-1 space-y-4 md:space-y-6">
                        {/* მობილურზე მომრგვალება rounded-2xl, დიდზე rounded-[40px]. პადინგი p-5 vs p-8 */}
                        <div className="bg-white border border-gray-100 p-5 md:p-8 rounded-2xl md:rounded-[40px] shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <IconUser size={80} stroke={3} />
                            </div>
                            <h3 className="text-sm font-black uppercase mb-6 pb-2 border-b border-gray-50">Customer Intel</h3>

                            <div className="space-y-6">
                                <div>
                                    <span className={labelStyle}>Full Name</span>
                                    <p className="text-lg font-black text-black capitalize">{booking.user?.fullname || 'N/A'}</p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                                        <IconPhone size={18} />
                                    </div>
                                    <div>
                                        <span className={labelStyle}>Phone Number</span>
                                        <a href={`tel:${booking.phone}`} className="text-sm font-black hover:underline tracking-tight">{booking.phone || 'No phone'}</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                        <IconMail size={18} />
                                    </div>
                                    <div>
                                        <span className={labelStyle}>Email Address</span>
                                        <p className="text-sm font-bold text-gray-600 truncate">{booking.user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={infoBoxStyle}>
                            <span className={labelStyle}>Payment Method</span>
                            <div className="flex items-center gap-2">
                                <IconCircleCheck size={18} className="text-black" />
                                <p className="font-black uppercase text-xs">{booking.paymentMethod || 'Cash'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Middle & Right: Documents & Vehicle */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Vehicle & Dates - მობილურზე rounded-2xl */}
                        <div className="bg-[rgb(34,40,52)] text-white p-6 md:p-8 rounded-2xl md:rounded-[40px] shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <span className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Selected Vehicle</span>
                                <div className="flex items-start gap-4 mt-3">
                                    <div className="mt-1">
                                        <IconCar size={32} stroke={2} className="text-[#FE9A00]" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-baseline gap-2">
                                            <h2 className="text-2xl font-black italic uppercase tracking-tighter">{booking.car?.brand}</h2>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-lg font-bold text-white/80">{booking.car?.model}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider text-white/50">
                                            <span>Year: {booking.car?.year}</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            <span>${booking.car?.pricePerDay?.toLocaleString()} / Day</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-white/5 p-4 md:p-5 rounded-xl md:rounded-3xl border border-white/10">
                                <div>
                                    <span className="text-[9px] uppercase font-bold text-white/30 tracking-widest">Total Revenue</span>
                                    <p className="text-2xl font-black text-[#FE9A00]">${booking.totalPrice?.toLocaleString()}</p>
                                </div>
                                <div className="text-right font-mono text-[11px] font-bold leading-relaxed">
                                    <div className="text-white">{new Date(booking.startDate).toLocaleDateString()}</div>
                                    <div className="text-white/20 italic my-0.5 text-[9px]">UNTIL</div>
                                    <div className="text-white">{new Date(booking.endDate).toLocaleDateString()}</div>
                                </div>
                            </div>
                        </div>

                        {/* Documents - მობილურზე rounded-2xl */}
                        <div className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl md:rounded-[40px] shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                                {/* Driver License */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-black uppercase flex items-center gap-2 text-[rgb(34,40,52)] mb-2">
                                        <IconFileText size={18} /> Driver License
                                    </h3>
                                    {booking.driverLicenseImg ? (
                                        <a href={booking.driverLicenseImg} target="_blank" rel="noreferrer" className="group relative block rounded-xl md:rounded-3xl overflow-hidden border border-gray-100 aspect-video shadow-inner">
                                            <img
                                                src={booking.driverLicenseImg}
                                                alt="License"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <span className="text-[10px] font-black uppercase text-white tracking-widest">Expand Image</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-gray-50 rounded-xl md:rounded-3xl border border-dashed border-gray-200">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Image Not Provided</p>
                                        </div>
                                    )}
                                </div>

                                {/* Status & Location */}
                                <div className="flex flex-col justify-between py-2">
                                    <div className="space-y-4">
                                        <span className={labelStyle}>Current Status</span>
                                        <div>
                                            <span className={`inline-flex px-6 py-2 rounded-xl md:rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] border transition-all shadow-sm ${booking.status === 'confirmed'
                                                ? 'bg-green-50 text-green-600 border-green-100'
                                                : booking.status === 'completed'
                                                    ? 'bg-[rgb(34,40,52)] text-white border-[rgb(34,40,52)]'
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {booking.status || 'Pending'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-gray-50 mt-8 md:mt-auto">
                                        <span className={labelStyle}>Pickup location</span>
                                        <div className="flex items-start gap-4 mt-3">
                                            <div className="w-12 h-12 bg-orange-50 rounded-xl md:rounded-2xl flex-shrink-0 flex items-center justify-center text-orange-600 border border-orange-100/50 shadow-sm">
                                                <IconMapPin size={22} />
                                            </div>
                                            <div className="flex flex-col">
                                                <p className="text-sm font-black text-[rgb(34,40,52)] leading-tight uppercase italic tracking-tight">
                                                    {booking.pickupLocation || 'Not specified'}
                                                </p>
                                                <p className="text-[10px] font-normal text-gray-400 mt-1 ">Physical Pick-up Address</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BookingDetails;