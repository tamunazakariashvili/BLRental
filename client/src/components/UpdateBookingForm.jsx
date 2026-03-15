import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import { useTranslation } from "react-i18next";

const UpdateBookingForm = ({ booking, onClose }) => {
    const { t } = useTranslation();
    const { updateBooking } = useBooking();
    const [status, setStatus] = useState(booking?.status || "pending");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateBooking(booking._id, { status });
            if (onClose) onClose(); // წარმატების შემთხვევაში ვხურავთ ფორმას/მოდალს
        } catch (err) {
            console.error("Failed to update status", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full">
            <h3 className="text-lg font-bold text-[rgb(34,40,52)] mb-4">
                {t('Update Status')}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                        {t('Booking Status')}
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(34,40,52)]/10 transition-all"
                    >
                        <option value="pending">{t('Pending')}</option>
                        <option value="confirmed">{t('Confirmed')}</option>
                        <option value="cancelled">{t('Cancelled')}</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        disabled={loading || status === booking.status}
                        className="flex-1 px-4 py-2.5 bg-[rgb(34,40,52)] text-white rounded-xl text-sm font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-[rgb(34,40,52)]/10"
                    >
                        {loading ? t('Saving...') : t('Save Changes')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBookingForm;