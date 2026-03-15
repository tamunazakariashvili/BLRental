import { useState } from "react";
import UserUpdateForm from "./UsersUpdateForm";
import { useLanguage } from "../hooks/useLanguage"; // ენის ჰუკი
import { motion, AnimatePresence } from "framer-motion";
import { IconEdit, IconCheck, IconClock, IconTrash, IconMail, IconShield } from "@tabler/icons-react";
import { useAuth } from "../contexts/AuthContext";

const UserControl = ({ users }) => {
    const [editingUser, setEditingUser] = useState(null);
    const { deleteUserrr } = useAuth();
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია

    const handleDelete = async (userId) => {
        try {
            await deleteUserrr(userId);
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div className="w-full space-y-6">

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden px-2">
                {users?.map((u) => (
                    <div key={u._id} className="bg-white border border-gray-100 rounded-[32px] p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-white border border-gray-800">
                                    <span className="text-sm font-black uppercase">{u.fullname?.charAt(0)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-black capitalize">{u.fullname}</p>
                                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">{t(u.role) || u.role}</p>
                                </div>
                            </div>
                            <div className={`${u.isVerified ? 'text-green-500' : 'text-orange-400'}`}>
                                {u.isVerified ? <IconCheck size={20} stroke={3} /> : <IconClock size={20} stroke={3} />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-gray-500">
                                <IconMail size={14} />
                                <span className="text-xs font-medium truncate">{u.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <IconShield size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">ID: {u._id?.slice(-8).toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={() => setEditingUser(u._id)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-black rounded-2xl font-bold text-xs border border-gray-100 active:scale-95 transition-transform"
                            >
                                <IconEdit size={16} />
                                {t('Edit')}
                            </button>
                            <button
                                onClick={() => handleDelete(u._id)}
                                className="w-14 flex items-center justify-center py-3 bg-red-50 text-red-500 rounded-2xl border border-red-100 active:scale-95 transition-transform"
                            >
                                <IconTrash size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- DESKTOP VIEW (Table) --- */}
            <div className="hidden md:block bg-white border border-gray-100 rounded-[40px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">{t('Operator Identity')}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">{t('Network Details')}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-400 tracking-widest">{t('Access Status')}</th>
                                <th className="p-6 text-[10px] uppercase font-black text-gray-400 tracking-widest text-right">{t('System Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users?.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200 group-hover:border-black/10 transition-colors">
                                                <span className="text-sm font-black text-black uppercase">{u.fullname?.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-black group-hover:text-gray-600 transition-colors capitalize tracking-tight">{u.fullname}</p>
                                                <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">ID: {u._id?.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xs font-semibold text-gray-600">{u.email}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className="w-1 h-1 rounded-full bg-black animate-pulse" />
                                            <p className="text-[9px] text-gray-400 uppercase font-black tracking-widest">{t(u.role) || u.role}</p>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <span className={`inline-flex items-center gap-2 py-1.5 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all
                                            ${u.isVerified
                                                ? 'bg-green-50 text-green-600 border-green-100'
                                                : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                            {u.isVerified ? <IconCheck size={12} stroke={4} /> : <IconClock size={12} stroke={4} />}
                                            {u.isVerified ? t('Verified') : t('Pending')}
                                        </span>
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => setEditingUser(u._id)}
                                                className="p-3 bg-gray-50 text-gray-600 hover:bg-black hover:text-white rounded-xl transition-all duration-300 border border-gray-100"
                                                title={t("Edit User")}
                                            >
                                                <IconEdit size={18} stroke={2} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                className="p-3 bg-gray-50 text-gray-400 hover:bg-red-500 hover:text-white rounded-xl transition-all duration-300 border border-gray-100 hover:border-red-500"
                                                title={t("Delete User")}
                                            >
                                                <IconTrash size={18} stroke={2} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODAL SECTION --- */}
            <AnimatePresence>
                {editingUser && (
                    <div className="fixed inset-0 z-[200] flex items-end md:items-center justify-center p-0 md:p-4 overflow-hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-md"
                            onClick={() => setEditingUser(null)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-2xl z-10"
                        >
                            <div className="bg-white border border-gray-100 rounded-t-[40px] md:rounded-[48px] shadow-2xl overflow-hidden relative">
                                <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 md:hidden" />
                                <div className="p-4 md:p-2">
                                    <UserUpdateForm
                                        userId={editingUser}
                                        onClose={() => setEditingUser(null)}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserControl;