import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../hooks/useLanguage"; // დავამატეთ ჰუკი
import { Mail, Eye, EyeOff, ArrowRight } from 'react-feather';
import { IconLock } from '@tabler/icons-react';
import { SiGoogle } from 'react-icons/si';
import { useNavigate } from "react-router-dom";
import { googleAuth } from "../services/authservice";
import { motion } from "framer-motion";

const Login = () => {
    const { login } = useAuth();
    const { t } = useLanguage(); // ტრანსლაციის ფუნქცია
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const accentColor = "rgb(254, 154, 0)";

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        };
        login(data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 ml-1">
                    {t("Email Address")}
                </label>
                <div className="relative group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={t("example@mail.com")}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pl-12 text-base text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:bg-white/[0.05]"
                    />
                    <style>{`
                        input:focus { border-color: ${accentColor}80 !important; } 
                    `}</style>
                    <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[rgb(254,154,0)] transition-colors"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                        {t("Password")}
                    </label>
                </div>
                <div className="relative group">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder={t("Enter your password")}
                        required
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 pl-12 pr-12 text-base text-white placeholder:text-gray-600 outline-none transition-all duration-300 focus:bg-white/[0.05]"
                    />
                    <IconLock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[rgb(254,154,0)] transition-colors"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 px-1">
                <div
                    onClick={() => setRememberMe(!rememberMe)}
                    className="relative w-10 h-5 bg-white/5 rounded-full border border-white/10 cursor-pointer transition-all overflow-hidden"
                >
                    <motion.div
                        animate={{ x: rememberMe ? 22 : 2 }}
                        className="absolute top-1 w-3 h-3 rounded-full mt-[0.5px] transition-colors"
                        style={{ backgroundColor: rememberMe ? accentColor : '#4B5563' }}
                    />
                </div>
                <span className="text-sm text-gray-400 cursor-pointer select-none" onClick={() => setRememberMe(!rememberMe)}>
                    {t("Remember me")}
                </span>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                style={{ backgroundColor: accentColor }}
                className="w-full text-black font-semibold text-base py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
                {t("Sign In")}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
                <div className="h-[1px] flex-1 bg-white/5" />
                <span className="text-sm text-gray-600">{t("Or continue with")}</span>
                <div className="h-[1px] flex-1 bg-white/5" />
            </div>

            {/* Social Logins */}
            <div className="w-full">
                <button
                    onClick={googleAuth}
                    type="button"
                    className="group flex items-center justify-center gap-3 w-full py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500/20 active:bg-emerald-500/30 transition-all duration-300 text-emerald-500 font-medium shadow-lg shadow-emerald-500/5"
                >
                    <SiGoogle size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    <span>{t("Continue with Google")}</span>
                </button>
            </div>
        </form>
    );
};

export default Login;