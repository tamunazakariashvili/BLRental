import React from 'react';
import { IconShieldCheck, IconLock, IconUserPlus, IconArrowRight, IconPhone } from '@tabler/icons-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from "../hooks/useLanguage"; 
import Login from '../components/Login';
import Signup from '../components/Signup';

const AuthenticationPage = () => {
    const { setActiveTab, activeTab } = useAuth();
    const { t, currentLanguage } = useLanguage(); 

    const bgDark = "#1A202C";
    const goldAccent = "#C5A059";
    const secondaryBg = "#232936";

    // ვამოწმებთ, არის თუ არა არჩეული ქართული ენა
    const isGeo = currentLanguage === 'ka';

    return (
        <div className="min-h-screen w-full flex items-stretch overflow-x-hidden font-sans" style={{ backgroundColor: bgDark }}>

            <div className="grid lg:grid-cols-2 w-full max-w-[1920px] mx-auto">

                {/* --- მარცხენა მხარე: ბრენდინგი --- */}
                <div className="hidden lg:flex relative flex-col justify-between p-12 xl:p-20 border-r border-white/5 overflow-hidden">
                    {/* ფონური განათება */}
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-10 blur-[100px]"
                        style={{ backgroundColor: goldAccent }} />

                    <div className="relative z-10 max-w-xl mx-auto w-full">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: goldAccent }}>
                                <IconLock size={24} className="text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white uppercase">
                                BL<span style={{ color: goldAccent }}>Rental</span>
                            </span>
                        </div>

                        {/* სათაური: ქართულის შემთხვევაში ზომა იკლებს 5xl-დან 4xl-მდე (XL ეკრანზე) */}
                        <h1 className={`
                            ${isGeo ? 'text-2xl md:text-3xl xl:text-4xl' : 'text-3xl md:text-4xl xl:text-5xl'} 
                            font-light leading-tight text-white mb-6 transition-all duration-300
                        `}>
                            {t("Your")} <br />
                            <span className="font-bold">{t("Journey Starts Here")}</span>
                        </h1>

                        {/* პარაგრაფი: ქართულზე მცირდება text-base-მდე */}
                        <p className={`
                            ${isGeo ? 'text-base xl:text-lg' : 'text-lg xl:text-xl'} 
                            text-gray-400 max-w-md leading-relaxed transition-all duration-300
                        `}>
                            {t("Find the right car for every journey. From economical daily rides to premium business vehicles. Simple, secure, and reliable car rental.")}
                        </p>
                    </div>

                    <div className="relative z-10 max-w-xl mx-auto w-full">
                        <div className="relative mb-12">
                            <img
                                src="/629825410_765671439918703_4252411258875430701_n-removebg-preview.png"
                                alt="Luxury Car"
                                className="w-full h-auto mt-[3%] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] scale-110"
                            />
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                                <IconPhone size={20} style={{ color: goldAccent }} />
                                <span className="text-white font-semibold tracking-wide">+995 555 00 89 84</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <IconShieldCheck size={22} className="text-green-500" />
                                <span className={`
                                    ${isGeo ? 'text-[9px]' : 'text-[11px]'} 
                                    uppercase font-black tracking-[0.25em] text-gray-500 transition-all
                                `}>
                                    {t("Secure Terminal")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- მარჯვენა მხარე: ფორმა --- */}
                <div className="w-full flex flex-col justify-center items-center px-6 py-12 lg:py-20 bg-[#171C26]">

                    <div className="w-full max-w-[440px] xl:max-w-[480px]">

                        <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
                            <span className="text-2xl font-black tracking-tighter text-white uppercase">
                                BL<span style={{ color: goldAccent }}>Rental</span>
                            </span>
                        </div>

                        <div className="mb-12 text-center lg:text-left">
                            <h3 className={`
                                ${isGeo ? 'text-2xl xl:text-3xl' : 'text-3xl xl:text-4xl'} 
                                font-bold text-white mb-4
                            `}>
                                {activeTab === 'login' ? t('Sign In') : t('Create Account')}
                            </h3>
                            <div className="h-1.5 w-16 rounded-full mx-auto lg:mx-0" style={{ backgroundColor: goldAccent }} />
                        </div>

                        {/* ტაბები: ქართულზე ტექსტი პატარავდება, რადგან "რეგისტრაცია" გრძელი სიტყვაა */}
                        <div className="flex p-1.5 rounded-[22px] mb-12 border border-white/5 shadow-2xl" style={{ backgroundColor: secondaryBg }}>
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[18px] font-bold transition-all duration-300 
                                    ${isGeo ? 'text-xs xl:text-sm' : 'text-sm xl:text-base'}
                                    ${activeTab === 'login' ? 'text-white shadow-2xl' : 'text-gray-500 hover:text-gray-300'}`}
                                style={activeTab === 'login' ? { backgroundColor: goldAccent } : {}}
                            >
                                <IconLock size={20} /> {t("Login")}
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-[18px] font-bold transition-all duration-300 
                                    ${isGeo ? 'text-xs xl:text-sm' : 'text-sm xl:text-base'}
                                    ${activeTab === 'signup' ? 'text-white shadow-2xl' : 'text-gray-500 hover:text-gray-300'}`}
                                style={activeTab === 'signup' ? { backgroundColor: goldAccent } : {}}
                            >
                                <IconUserPlus size={20} /> {t("Register")}
                            </button>
                        </div>

                        <div className="w-full">
                            {activeTab === 'login' ? <Login /> : <Signup />}
                        </div>

                        <div className="mt-16 flex flex-col gap-8">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-gray-600">
                                <span className="hover:text-gray-400 cursor-pointer transition-colors">{t("Privacy Policy")}</span>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors" style={{ color: goldAccent }}>
                                    {t("Support")} <IconArrowRight size={16} />
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl border border-white/5 flex items-center justify-center gap-4 bg-black/20">
                                <span className={`
                                    ${isGeo ? 'text-[9px]' : 'text-[10px] xl:text-[11px]'} 
                                    text-gray-500 font-bold uppercase tracking-wider text-center
                                `}>
                                    {t("Encrypted end-to-end connection")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;