import React from 'react';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from "../hooks/useLanguage";

const ContactUs = () => {
    const { t } = useLanguage();

    return (
        <main className="bg-[#fcfcfc] text-[#1a1a1a] min-h-screen font-sans selection:bg-[#c5a059] selection:text-white pt-10 md:pt-0">
            
            {/* --- Hero Section: მხოლოდ დესკტოპზე (hidden on mobile) --- */}
            <section className="hidden md:flex relative h-[400px] items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/about.png')" }}
                >
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
                </div>

                <div className="max-w-6xl mx-auto text-center relative z-10 px-6">
                    <div className="flex flex-col items-center">
                        <h1 className="text-6xl font-normal text-white tracking-tight leading-tight">
                            {t("Let's start a")} <br />
                            <span className="text-[#c5a059]">{t("New Journey")}</span>
                        </h1>

                        <div className="mt-10 flex flex-col items-center gap-3">
                            <p className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-normal">
                                {t("Scroll to explore")}
                            </p>
                            <div className="w-px h-8 bg-[#c5a059]/50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Contact Grid --- */}
            <section className="max-w-[1300px] mt-0 md:mt-[8%] mx-auto md:px-6 pb-20 md:pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 md:gap-8">

                    {/* Left Side: Photo & Details */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 space-y-0 md:space-y-8">
                            
                            {/* Photo: No rounding on mobile */}
                            <div className="relative h-[300px] md:h-[400px] rounded-none md:rounded-[40px] overflow-hidden border-b md:border border-black/5 shadow-sm">
                                <img
                                    src="/contact-us-icons-virtual-screen.jpg"
                                    alt={t("Contact Us")}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-4 bg-white md:bg-transparent">
                                <ContactDetail label={t("Email")} value="info@BLRental.ge" link="mailto:info@BLRental.ge" />
                                <ContactDetail label={t("Support")} value="+995 555 00 89 84" link="tel:+995555008984" />
                                <div className="md:col-span-2">
                                    <ContactDetail label={t("Studio")} value={t("Spiridon Kedia 10 A, Tbilisi, Georgia")} link="#" />
                                </div>
                                
                                <div className="pt-6 border-t border-black/5 flex gap-6 md:hidden">
                                    {['instagram', 'facebook', 'whatsapp'].map((soc) => (
                                        <SocialLink key={soc} soc={soc} />
                                    ))}
                                </div>
                            </div>
                            
                            <div className="hidden md:flex pt-8 border-t border-black/5 gap-8 px-4">
                                {['instagram', 'facebook', 'whatsapp'].map((soc) => (
                                    <SocialLink key={soc} soc={soc} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="lg:col-span-7 bg-[#1a1a1a] rounded-none md:rounded-[40px] p-8 md:p-16 h-full shadow-2xl">
                        <div className="mb-10 md:mb-12 text-left">
                            <h3 className="text-xl md:text-2xl font-normal text-white mb-2">
                                {t("Send us a message")}
                            </h3>
                            <p className="text-gray-400 font-normal text-sm md:text-base">
                                {t("We'll get back to you within 24 hours.")}
                            </p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left" onSubmit={(e) => e.preventDefault()}>
                            <FloatingInput label={t("Your Name")} type="text" placeholder={t("John Doe")} />
                            <FloatingInput label={t("Email Address")} type="email" placeholder="example@gmail.com" />

                            <div className="md:col-span-2 text-left">
                                <FloatingInput label={t("Subject")} type="text" placeholder={t("How can we help?")} />
                            </div>

                            <div className="md:col-span-2 text-left">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-4 block">
                                    {t("Message")}
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#c5a059] text-white text-lg font-normal resize-none placeholder:text-gray-500 transition-colors"
                                    placeholder={t("Tell us about your project...")}
                                />
                            </div>

                            <div className="md:col-span-2 pt-6">
                                <button className="w-full md:w-auto bg-[#c5a059] text-white px-10 py-5 rounded-none md:rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300">
                                    {t("Send Message")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- Map Section --- */}
            <div className="w-full h-[400px] md:h-[500px] md:px-6 pb-0 md:pb-24">
                <div className="w-full h-full rounded-none md:rounded-[40px] overflow-hidden border-t md:border border-black/5 shadow-inner">
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.614330616182!2d44.7745!3d41.7289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQzJzQ0LjAiTiA0NMKwNDYnMjguMiJF!5e0!3m2!1sen!2sge!4v1700000000000"
                        className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-1000"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            <Footer />
        </main>
    );
};

const SocialLink = ({ soc }) => {
    const icons = {
        instagram: <FaInstagram size={16} />,
        facebook: <FaFacebookF size={16} />,
        whatsapp: <FaWhatsapp size={16} />
    };
    let href = soc === 'whatsapp' ? "https://wa.me/message/NCLBBTPIZTVHH1" : 
               soc === 'facebook' ? "https://www.facebook.com/tamo.tamo.400006" : "#";

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#c5a059] transition-colors duration-300"
        >
            {icons[soc]}
        </a>
    );
};

const ContactDetail = ({ label, value, link }) => (
    <div className="text-left">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] font-bold mb-2">{label}</p>
        <a href={link} className="text-base md:text-xl text-[#1a1a1a] font-normal block leading-snug">
            {value}
        </a>
    </div>
);

const FloatingInput = ({ label, type, placeholder }) => (
    <div className="relative text-left">
        <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-2 block">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#c5a059] text-white text-lg font-normal placeholder:text-gray-500 transition-colors"
        />
    </div>
);

export default ContactUs;