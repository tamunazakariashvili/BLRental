import ChangePassword from "./ChangePasswordForm";
import { useAuth } from "../contexts/AuthContext";
import { IconUser, IconMail, IconCrown, IconId, IconFingerprint } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import UpdateMyProfileForm from "./UpdateMyProfileForm";

const AdminSystemConfig = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    
    return (
        <div className="max-w-6xl mx-auto p-6 md:p-12">

            <div className="mb-12">
                <h1 className="text-4xl font-bold uppercase tracking-tighter text-black leading-none">
                    {t('System')} <span className="text-gray-400">{t('Config')}</span>
                </h1>
                <div className="flex items-center gap-3 mt-3">
                    {/* ხაზი - შავი */}
                    <div className="h-[1px] w-12 bg-black" />
                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">
                        {t('Administrative Security Gateways')}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

             
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white border border-gray-100 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
                    >
                        {/* ფონური დეკორაცია (Watermark) */}
                        <div className="absolute top-10 right-10 text-black/[0.02] scale-[3.5] pointer-events-none">
                            <IconFingerprint size={80} />
                        </div>

                      
                        <div className="flex items-center gap-3 mb-10 relative z-10">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center border border-gray-200">
                                <IconId size={22} className="text-black" />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tighter text-black">
                                {t('Admin')} <span className="text-gray-400">{t('Identity')}</span>
                            </h3>
                        </div>

                        <div className="space-y-10 relative z-10">
                            {/* Full Name */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                                    {t('Full Name')}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-300 group-hover:text-black transition-colors">
                                        <IconUser size={20} />
                                    </span>
                                    <p className="text-xl font-bold text-black tracking-tight">
                                        {user?.fullname || t('Administrator')}
                                    </p>
                                </div>
                            </div>

                            {/* Email Address */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">
                                    {t('Communication Link')}
                                </p>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-300 group-hover:text-black transition-colors">
                                        <IconMail size={20} />
                                    </span>
                                    <p className="text-xl font-bold text-black/80 tracking-tight">
                                        {user?.email || 'admin@nexus.sys'}
                                    </p>
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div className="w-full h-[1px] bg-gradient-to-r from-gray-100 to-transparent" />

                            {/* Privileges/Role */}
                            <div className="group">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">
                                    {t('Access Privileges')}
                                </p>
                                {/* Role Badge - შავ-თეთრი */}
                                <div className="inline-flex items-center gap-3 bg-black border border-black px-5 py-2 rounded-full shadow-lg shadow-black/5">
                                    <IconCrown size={16} className="text-white" />
                                    <span className="text-[11px] font-bold text-white uppercase tracking-[0.15em]">
                                        {user?.role || t('Root Admin')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Security Info Card */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-50 border border-gray-100 rounded-[24px] p-6"
                    >
                        <div className="flex gap-4">
                            {/* პულსირებადი წერტილი - შავი */}
                            <div className="w-2 h-2 rounded-full bg-black animate-pulse mt-1.5" />
                            <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                                {t('System logs are active. Any modification to the identity or security credentials will be timestamped and linked to your current session IP.')}
                            </p>
                        </div>
                    </motion.div>
                </div>


                {/* მარჯვენა მხარე: ChangePassword კომპონენტი */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col h-full"
                >
                    <ChangePassword />
                </motion.div>
                
                <UpdateMyProfileForm />
            </div>
        </div>
    );
};

export default AdminSystemConfig;