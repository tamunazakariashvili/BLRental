import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { IconUser, IconMail, IconShieldLock, IconX, IconLoader2, IconCircleCheck } from "@tabler/icons-react";

const UserUpdateForm = ({ userId, onClose }) => {
    const { t } = useTranslation();
    const { updateUserrr, users } = useAuth();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(false);

    // აქცენტის ფერი შეცვლილია შავზე
    const accentColor = "#000000";

    useEffect(() => {
        const currentUser = users.find(u => u._id === userId);
        if (currentUser) {
            setFullname(currentUser.fullname || "");
            setEmail(currentUser.email || "");
            setRole(currentUser.role || "");
        }
    }, [userId, users]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateUserrr(userId, { fullname, email, role });
            if (onClose) onClose(); 
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-[40px] relative overflow-hidden border border-gray-100 shadow-2xl">
            {/* Background Glow - ნაცრისფერი ეფექტი */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gray-100 blur-[80px] rounded-full" />
            
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 bg-gray-50 hover:bg-black hover:text-white rounded-xl transition-all text-gray-400 active:scale-90 z-10"
            >
                <IconX size={20} />
            </button>

            {/* Header */}
            <div className="mb-10 relative">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1.5 h-6 bg-black rounded-full" />
                    <h2 className="text-2xl font-bold tracking-tight text-black leading-none">
                        {t('Update')} <span className="text-gray-500">{t('Operator')}</span>
                    </h2>
                </div>
                <p className="text-xs text-gray-400 font-medium tracking-wide ml-4">
                    {t('Security Level & Identity Clearance')}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 relative">
                {/* Fullname */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-black transition-colors">
                        {t('Full Name')}
                    </label>
                    <div className="relative">
                        <IconUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                        <input
                            type="text"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 rounded-2xl text-sm text-black focus:outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-gray-400"
                            placeholder={t('Enter full name')}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-black transition-colors">
                        {t('Email Address')}
                    </label>
                    <div className="relative">
                        <IconMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 rounded-2xl text-sm text-black focus:outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-gray-400"
                            placeholder="email@example.com"
                            required
                        />
                    </div>
                </div>

                {/* Role */}
                <div className="group">
                    <label className="text-xs font-semibold text-gray-500 ml-1 mb-2.5 block group-focus-within:text-black transition-colors">
                        {t('System Role')}
                    </label>
                    <div className="relative">
                        <IconShieldLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors" size={18} />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 pl-12 rounded-2xl text-sm text-black focus:outline-none focus:border-black/20 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="user" className="bg-white">{t('Standard User')}</option>
                            <option value="admin" className="bg-white">{t('System Admin')}</option>
                        </select>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-2xl border border-gray-200 text-xs font-bold text-gray-400 hover:bg-gray-50 hover:text-black transition-all active:scale-95"
                    >
                        {t('Cancel')}
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`flex-1 px-6 py-4 rounded-2xl bg-black text-white text-xs font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <IconLoader2 className="animate-spin" size={18} />
                                {t('Updating...')}
                            </>
                        ) : (
                            <>
                                <IconCircleCheck size={18} />
                                {t('Save Changes')}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserUpdateForm;