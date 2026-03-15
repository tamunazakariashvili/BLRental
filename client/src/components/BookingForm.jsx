import { useState } from "react";
import { useBooking } from "../contexts/BookingContext";
import { useCars } from "../contexts/CarsContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";

const CreateBookingForm = ({ carId }) => {
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const { createBooking, error } = useBooking();
    const { cars } = useCars();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        startDate: "",
        endDate: "",
        phone: "",
        pickupLocation: "",
    });
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const today = new Date().toISOString().split("T")[0];
    const car = cars?.find(c => c._id === carId);

    let days = 0;
    let totalPrice = 0;
    if (formData.startDate && formData.endDate) {
        const start = new Date(formData.startDate);
        const end = new Date(formData.endDate);
        days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        if (days > 0 && car) totalPrice = days * car.pricePerDay;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (days <= 0) return alert(t("Please select valid dates"));
        if (!file) return alert(t("Please upload your driver license"));

        setLoading(true);

        const data = new FormData();
        data.append("carId", carId);
        data.append("startDate", formData.startDate);
        data.append("endDate", formData.endDate);
        data.append("phone", formData.phone);
        data.append("pickupLocation", formData.pickupLocation);
        data.append("driverLicense", file);

        try {
            await createBooking(data);
            navigate('/paymentsuccess');
        } catch (err) {
            console.error("Booking failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {error && (
                <div className="p-4 bg-red-500/10 border-l-4 border-[#FE9A00] rounded-r-xl">
                    <p className="text-[11px] font-black uppercase tracking-tight text-[#FE9A00]">{t(error)}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">{t("Pick-up Date")}</label>
                    <input type="date" name="startDate" value={formData.startDate} min={today} onChange={handleChange} required className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00]" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">{t("Return Date")}</label>
                    <input type="date" name="endDate" value={formData.endDate} min={formData.startDate || today} onChange={handleChange} required className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00]" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">{t("WhatsApp / Phone")}</label>
                    <input type="text" name="phone" placeholder="+995 555..." onChange={handleChange} required className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00]" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">{t("Pick-up Location")}</label>
                    <input type="text" name="pickupLocation" placeholder={t("Airport, Hotel, etc.")} onChange={handleChange} required className="w-full p-4 bg-[#151515] border border-white/5 rounded-xl text-white outline-none focus:border-[#FE9A00]" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">{t("Driver License (Photo)")}</label>
                <div className="relative">
                    <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full p-3 bg-[#151515] border border-dashed border-white/10 rounded-xl text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:bg-[#FE9A00] file:text-black cursor-pointer" />
                </div>
            </div>

            <div className="p-6 border border-white/10 rounded-2xl flex justify-between items-center bg-white/[0.02]">
                <div className="text-right w-full">
                    <div className="text-2xl font-black text-[#FE9A00]">{days > 0 ? `$${totalPrice}` : "$0"}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">
                        {days > 0 ? `${days} ${t("days total")}` : t("Select dates")}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-sm transition-all duration-300
                    ${loading ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-[#FE9A00] text-black hover:bg-white"}`}
            >
                {loading ? t("Sending Request...") : t("Request Booking")}
            </button>
        </form>
    );
};

export default CreateBookingForm;