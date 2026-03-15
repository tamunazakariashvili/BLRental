import React from 'react';
import Footer from '../components/Footer';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from "../hooks/useLanguage";

const ContactUs = () => {
    const { t } = useLanguage();

    return (
        <main className="bg-[#fcfcfc] text-[#1a1a1a] min-h-screen font-sans selection:bg-[#c5a059] selection:text-white">

            {/* --- Hero Section: Hidden on Mobile, Flex on Desktop --- */}
            <section className="hidden md:flex relative flex-col md:flex-row min-h-[500px] md:h-[500px] items-center bg-[#0a0a0a] overflow-visible">

                {/* მარცხენა მხარე: ტექსტი */}
                <div className="w-full md:w-1/2 z-10 px-8 py-16 md:py-0 md:pl-24 md:pr-12 text-center md:text-left">
                    <div className="space-y-4">
                        <div className="hidden md:block w-12 h-[2px] bg-[#c5a059] mb-8"></div>
                        <h1 className="text-3xl md:text-5xl font-light text-white tracking-tight leading-tight uppercase">
                            {t("Let's start a")} <br />
                            <span className="font-semibold text-white/90">
                                {t("New Journey")}
                            </span>
                        </h1>
                        <p className="text-gray-500 text-sm max-w-sm mx-auto md:mx-0 font-light tracking-wide leading-relaxed pt-4">
                            {t("Connect with our team to experience the excellence of premium mobility and personalized car rental services.")}
                        </p>
                    </div>
                </div>

                {/* მარჯვენა მხარე: ფოტო */}
                <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale"
                        style={{
                            backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop')",
                            clipPath: window.innerWidth > 768 ? "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" : "none"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
                    </div>
                </div>

                {/* --- გეომეტრიული გადასვლა --- */}
                <div
                    className="absolute -bottom-16 left-0 w-full h-32 bg-[#fcfcfc] z-20"
                    style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0, 0 60%)" }}
                ></div>

                {/* სექციის ნომერი */}
                <div className="absolute bottom-20 left-8 md:left-24 z-30">
                    <p className="text-white/20 text-xs font-mono tracking-widest uppercase">
                        01 / {t("Contact")}
                    </p>
                </div>
            </section>

            {/* --- Contact Grid: Spacing Reduced here (py-8 md:py-16) --- */}
            <section className="max-w-[1300px] mx-auto px-4 md:px-6 py-8 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">

                    {/* Left Side: Photo & Details */}
                    <div className="lg:col-span-5 relative">
                        <div className="lg:sticky lg:top-32 space-y-8">

                            {/* Photo: 10px rounded on mobile */}
                            <div className="relative h-[300px] md:h-[450px] rounded-[10px] md:rounded-[40px] overflow-hidden border border-black/5 shadow-md">
                                <img
                                    src="/contact-us-icons-virtual-screen.jpg"
                                    alt={t("Contact Us")}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-4 bg-white md:bg-transparent rounded-[10px] md:rounded-none border md:border-none border-black/5">
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
                    <div className="lg:col-span-7 bg-[#1a1a1a] rounded-[10px] md:rounded-[40px] p-8 md:p-16 h-full shadow-2xl relative overflow-hidden">
                        <div className="mb-12 text-left relative z-10">
                            <h3 className="text-2xl font-normal text-white mb-3">
                                {t("Send us a message")}
                            </h3>
                            <p className="text-gray-400 font-normal text-sm md:text-base">
                                {t("We'll get back to you within 24 hours.")}
                            </p>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 text-left relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <FloatingInput label={t("Your Name")} type="text" placeholder={t("John Doe")} />
                            <FloatingInput label={t("Email Address")} type="email" placeholder="example@gmail.com" />
                            <div className="md:col-span-2">
                                <FloatingInput label={t("Subject")} type="text" placeholder={t("How can we help?")} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-4 block">
                                    {t("Message")}
                                </label>
                                <textarea
                                    rows="4"
                                    className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-[#c5a059] text-white text-lg font-normal resize-none placeholder:text-gray-600 transition-colors"
                                    placeholder={t("Tell us more details...")}
                                />
                            </div>
                            <div className="md:col-span-2 pt-6">
                                <button className="w-full md:w-auto bg-[#c5a059] text-white px-12 py-5 rounded-[10px] md:rounded-full text-sm font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300">
                                    {t("Send Message")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* --- Map Section --- */}
            <div className="w-full h-[400px] md:h-[600px] px-4 md:px-6 pb-12 md:pb-24">
                <div className="w-full h-full rounded-[10px] md:rounded-[40px] overflow-hidden border border-black/5 shadow-lg">
                    <iframe
                        title="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.144415512345!2d44.7788!3d41.7211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQzJzE2LjAiTiA0NMKwNDYnNDMuNyJF!5e0!3m2!1ska!2sge!4v1620000000000!5m2!1ska!2sge"
                        className="w-full h-full border-0 contrast-125 brightness-90"
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
        instagram: <FaInstagram size={18} />,
        facebook: <FaFacebookF size={18} />,
        whatsapp: <FaWhatsapp size={18} />
    };
    let href = soc === 'whatsapp' ? "https://wa.me/message/NCLBBTPIZTVHH1" :
        soc === 'facebook' ? "https://www.facebook.com/tamo.tamo.400006" : "#";

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#c5a059] transition-all duration-300 transform hover:scale-110">
            {icons[soc]}
        </a>
    );
};

const ContactDetail = ({ label, value, link }) => (
    <div className="text-left group">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#c5a059] font-bold mb-2 group-hover:translate-x-1 transition-transform">{label}</p>
        <a href={link} className="text-lg md:text-xl text-[#1a1a1a] font-normal block leading-snug hover:text-[#c5a059] transition-colors">
            {value}
        </a>
    </div>
);

const FloatingInput = ({ label, type, placeholder }) => (
    <div className="relative text-left group">
        <label className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-bold mb-2 block group-focus-within:text-white transition-colors">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-[#c5a059] text-white text-lg font-normal placeholder:text-gray-600 transition-colors"
        />
    </div>
);

export default ContactUs;