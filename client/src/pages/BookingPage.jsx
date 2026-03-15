import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import CreateBookingForm from "../components/BookingForm";
import { CreditCard, Banknote } from 'lucide-react';
import { useLanguage } from "../hooks/useLanguage"; // დავამატეთ ჰუკი

const BookingPage = () => {
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const { id } = useParams();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleBookingSuccess = () => {
        navigate('/paymentsuccess');
    };

    if (!id) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f4f4f5]">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-[rgb(34,40,52)] tracking-tighter uppercase">{t("MACHINE NOT FOUND")}</h1>
                    <button onClick={() => navigate(-1)} className="mt-6 text-gray-500 uppercase tracking-widest">{t("Go Back")}</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] text-[rgb(34,40,52)] flex flex-col items-center font-sans">
            <div className=" w-full bg-[rgb(34,40,52)] p-9 md:p-12"></div>
            <div className="max-w-[1200px] w-full p-6 md:p-12">
                <div className="mb-12">
                    <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-xs text-gray-500 hover:text-[rgb(34,40,52)] transition-colors">
                        ← {t("Back to Vehicle details")}
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-[rgb(34,40,52)]">
                        {t("Complete Your")} <span className="text-gray-400">{t("Reservation")}</span>
                    </h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8">
                        {/* მთავარი ბლოკი - თეთრი ფონი ნაცრისფერზე */}
                        <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-sm">

                            {/* Payment Method Selection */}
                            <div className="mb-10 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
                                <p className="font-bold mb-1">{t("Booking with us is easy!")}</p>
                                <p>
                                    {t("Thank you for choosing us! Book easily and we will contact you within 24 hours")}
                                </p>
                            </div>

                            <div className="mb-6 border-b border-gray-100 pb-6">
                                <h2 className="text-xl font-semibold">{t("Personal Information")}</h2>
                            </div>

                            <div className="booking-form-wrapper custom-light-form">
                                <CreateBookingForm carId={id} paymentMethod={paymentMethod} onSuccess={handleBookingSuccess} />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* ბენეფიტების ბლოკი */}
                        <div className="bg-[rgb(34,40,52)] p-8 rounded-3xl text-white">
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-70">{t("Service Benefits")}</h3>
                            <ul className="space-y-4">
                                {["Professional Concierge", "Premium Insurance", "Flexible Cancellation"].map((text, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-200">
                                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                        {t(text)}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* კონტაქტის ბლოკი - ღია ფერი */}
                        <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm text-[rgb(34,40,52)]">
                            <p className="text-xs font-bold uppercase opacity-60">{t("Need fast help?")}</p>
                            <p className="font-bold text-2xl">+995 555 00 89 84</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-auto py-10 w-full border-t border-gray-200 text-center text-gray-400 text-[11px] uppercase tracking-widest">
                © 2024 NovaRide Premium - {t("All Rights Reserved")}
            </footer>

            <style jsx>{`
                .custom-light-form input, .custom-light-form select, .custom-light-form textarea {
                    background: #fdfdfd !important;
                    border: 1px solid #e2e8f0 !important;
                    color: rgb(34, 40, 52) !important;
                    border-radius: 12px !important;
                    padding: 14px !important;
                    width: 100%;
                    outline: none !important;
                }
                .custom-light-form input:focus {
                    border-color: rgb(34, 40, 52) !important;
                }
                .custom-light-form button[type="submit"] {
                    background: rgb(34, 40, 52) !important;
                    color: #fff !important;
                    font-weight: 700 !important;
                    width: 100%;
                    padding: 16px !important;
                    border-radius: 14px !important;
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }
                .custom-light-form button[type="submit"]:hover {
                    opacity: 0.95;
                    transform: translateY(-1px);
                }
            `}</style>
        </div>
    );
};

export default BookingPage;