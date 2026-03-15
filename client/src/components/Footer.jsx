import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from "../hooks/useLanguage"; // ჰუკის იმპორტი

const Footer = () => {
    const { t } = useLanguage();
    const brandAccent = 'rgb(197,160,89)';

    const navLinks = [
        { name: t('Home'), path: 'Home' },
        { name: t('Fleet'), path: 'Fleet' },
        { name: t('Experience'), path: 'Experience' },
        { name: t('Concierge'), path: 'Concierge' }
    ];

    const legalLinks = [
        { name: t('Terms of Use'), path: '/terms' },
        { name: t('Privacy Policy'), path: '/privacy' },
        { name: t('Refund Policy'), path: '/refundpolicy' },
        { name: t('Security'), path: '/security' }
    ];

    return (
        <footer className="bg-[#fcfcfc] text-[#1a1a1a] w-full pt-24 pb-12 px-6 md:px-12 lg:px-24 border-t border-gray-100 relative overflow-hidden font-sans">

            {/* ფონის დეკორატიული ელემენტი */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
                <h2 className="text-[15vw] font-bold text-black/[0.02] leading-none uppercase tracking-tighter">
                    BLRental
                </h2>
            </div>

            {/* Glow ეფექტი */}
            <div
                className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.05] blur-[120px] rounded-full pointer-events-none"
                style={{ backgroundColor: brandAccent }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

                    {/* ლოგო და ბრენდინგი */}
                    <div className="lg:col-span-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <h1 className="text-3xl font-bold tracking-tight mb-6 uppercase">
                                BL<span style={{ color: brandAccent }}>Rental</span>
                            </h1>
                            <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                                {t("Redefining the boundaries of premium mobility. Your journey, our masterpiece.")}
                            </p>
                        </motion.div>
                    </div>

                    {/* ლინკების ბლოკები */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-8">
                                {t("Navigation")}
                            </h3>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.path}>
                                        <a href={`#${link.path}`} className="text-gray-600 hover:text-black transition-colors text-sm flex items-center group">
                                            <span className="w-0 group-hover:w-4 h-[1px] bg-gray-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-8">
                                {t("Legal Space")}
                            </h3>
                            <ul className="space-y-4">
                                {legalLinks.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-gray-600 hover:text-black transition-colors text-sm flex items-center group"
                                        >
                                            <span className="w-0 group-hover:w-4 h-[1px] bg-gray-400 mr-0 group-hover:mr-3 transition-all duration-300"></span>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter ბლოკი */}
                    <div className="lg:col-span-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-black/30 mb-8">
                            {t("Newsletter")}
                        </h3>
                        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                            {t("Join our elite circle for exclusive offers.")}
                        </p>
                        <form className="relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t("Enter your email")}
                                className="w-full bg-gray-50 border border-gray-100 rounded-lg py-4 px-5 outline-none text-sm focus:border-gray-300 transition-all placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-4 rounded-md text-white text-xs font-bold uppercase tracking-wide transition-all hover:brightness-90 active:scale-95 shadow-sm"
                                style={{ backgroundColor: brandAccent }}
                            >
                                {t("Join")}
                            </button>
                        </form>
                    </div>
                </div>

                {/* ქვედა ზოლი */}
                <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                        <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase text-center md:text-left">
                            © 2026 BLRENTAL AUTOMOTIVE.
                        </p>
                        <span className="hidden md:block w-1 h-1 bg-gray-200 rounded-full"></span>
                        <p className="text-gray-400 text-[11px] font-medium tracking-wide uppercase">
                            {t("Handcrafted with precision.")}
                        </p>
                    </div>

                    {/* ინფორმაცია */}
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex gap-8">
                            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">EST. 2024</span>
                            <span className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">{t("Global Service")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;