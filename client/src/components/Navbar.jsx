import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../hooks/useLanguage";

const Navbar = () => {
    const { user } = useAuth();
    const { t, currentLanguage } = useLanguage(); 
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const brandColor = "rgb(26, 32, 44)";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
    }, [isMobileMenuOpen]);

    const getDashboardLink = () => {
        if (!user) return "/authentication";
        return user.role === 'admin' ? "/admin" : "/panel";
    };

    const navLinks = [
        { name: t('Home'), path: '/' },
        { name: t('Cars'), path: '/carspage' },
        { name: t('About'), path: '/about' },
        { name: t('Contact'), path: '/contactus' },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${isScrolled
                ? "lg:bg-[rgb(226,226,226)] lg:backdrop-blur-md py-3 lg:py-4 lg:shadow-md"
                : "bg-transparent py-3 lg:py-6"
                }`}>

                <div className="max-w-[1400px] mx-auto px-4 md:px-10 flex justify-between items-center relative h-10 lg:h-12">

                    <Link to="/" className="z-[110] hidden lg:flex items-center gap-3 group shrink-0">
                        <img
                            src="/logoo.png"
                            className="h-16 lg:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            alt="Logo"
                        />
                    </Link>

                    {/* Desktop Nav - დაბრუნდა სტანდარტულ ცენტრულ პოზიციაზე */}
                    <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-auto transition-all duration-300">
                        <ul className={`flex items-center ${currentLanguage === 'ka' ? 'gap-5 xl:gap-7' : 'gap-6 xl:gap-10'}`}>
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`text-[11px] xl:text-[12px] uppercase tracking-[0.1em] font-bold transition-all hover:text-[#C5A059] whitespace-nowrap ${
                                            isScrolled ? "text-gray-800" : "text-white"
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="hidden lg:flex items-center gap-4 xl:gap-6 shrink-0">
                        <div className={`${isScrolled ? "text-gray-800" : "text-white"} scale-90`}>
                            <LanguageSwitcher />
                        </div>

                        <Link
                            to={getDashboardLink()}
                            className={`text-[12px] font-bold transition-colors hover:text-[#C5A059] whitespace-nowrap ${isScrolled ? "text-gray-800" : "text-white"
                                }`}
                        >
                            {user ?
                                (user.role === 'admin' ? t('Admin Panel') : t('Dashboard')) :
                                t('Sign In')
                            }
                        </Link>

                        <Link to='/carspage'>
                            <button
                                style={{ backgroundColor: brandColor }}
                                className="text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all shadow-lg hover:brightness-105 active:scale-95 whitespace-nowrap"
                            >
                                {t('Search')}
                            </button>
                        </Link>
                    </div>

                    {/* Burger Menu Button */}
                    <div className="lg:hidden flex justify-end w-full">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="z-[110] p-2 bg-white/10 backdrop-blur-sm rounded-lg"
                        >
                            <div className="flex flex-col gap-1.5 items-end">
                                <div className={`h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-7 rotate-45 translate-y-[8px] bg-black' : (isScrolled ? 'w-7 bg-black' : 'w-7 bg-white')}`}></div>
                                <div className={`h-[2px] w-5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : (isScrolled ? 'bg-black' : 'bg-white')}`}></div>
                                <div className={`h-[2px] transition-all duration-300 ${isMobileMenuOpen ? 'w-7 -rotate-45 -translate-y-[8px] bg-black' : (isScrolled ? 'w-7 bg-black' : 'w-7 bg-white')}`}></div>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Background Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[102] lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <div className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[105] lg:hidden transition-transform duration-500 ease-out shadow-2xl ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="flex flex-col h-full p-8 pt-20">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-bold text-gray-800 border-b border-gray-50 pb-3 uppercase tracking-tight hover:text-[#C5A059] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 py-4 border-y border-gray-50 scale-95 origin-left">
                        <LanguageSwitcher />
                    </div>

                    <div className="mt-auto flex flex-col gap-4">
                        <Link
                            to={getDashboardLink()}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-center text-gray-800 font-bold uppercase tracking-tight text-xs"
                        >
                            {user ?
                                (user.role === 'admin' ? t('Admin Panel') : t('Dashboard')) :
                                t('Sign In')
                            }
                        </Link>
                        <Link
                            to="/carspage"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{ backgroundColor: brandColor }}
                            className="w-full text-white py-3.5 rounded-xl font-bold text-center uppercase tracking-wider text-xs shadow-lg active:scale-95 transition-transform"
                        >
                            {t('Book Now')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;