import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
    const brandAccent = 'rgb(171,171,171)';
    const darkBg = 'rgb(34, 40, 52)';

    const sections = [
        {
            title: "Data Collection & Usage",
            content: "We collect only essential information required for car rental services, such as your full name and email address. This data is used exclusively to manage your bookings and provide a personalized experience. We do not store sensitive identity documents like passports or driver's licenses on our servers."
        },
        {
            title: "Authentication & Security",
            content: "To protect your account, we implement industry-standard security measures. Passwords are encrypted using advanced hashing (Bcrypt). For users choosing Google or GitHub authentication, we only store unique provider identifiers to maintain secure sessions without accessing your external account data."
        },
        {
            title: "Third-Party Disclosure",
            content: "Your personal information is never sold, traded, or rented to third parties. Disclosure only occurs when necessary to fulfill your service (e.g., to the bank for payment or insurance providers) or as required by Georgian law."
        },
        {
            title: "Cookies & Tracking",
            content: "We use cookies to enhance your browsing experience and maintain secure login sessions. These cookies do not store personal information and are essential for the technical functionality of the booking system."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
            {/* Dark Hero Section */}
            <section
                className="pt-32 pb-16 px-6 relative border-b border-white/5"
                style={{ backgroundColor: darkBg }}
            >
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* პატარა ზედა ტექსტი */}
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">
                            Legal & Compliance
                        </p>

                        {/* მთავარი სათაური - სუფთა ფონტით */}
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                            Privacy Policy
                        </h1>

                        {/* დამატებული ტექსტი - შესავალი */}
                        <p className="text-white/60 text-base leading-relaxed max-w-2xl font-normal">
                            This policy outlines our commitment to protecting your personal data and ensuring
                            secure transactions. We strictly adhere to banking security standards to provide
                            you with a safe and premium car rental experience in Georgia.
                        </p>

                        {/* თარიღი */}
                        <div className="mt-8 flex items-center gap-3">
                            <span className="text-white/20 text-[11px] font-bold uppercase tracking-widest">
                                Last Updated: Feb 2026
                            </span>
                            <div className="h-[1px] w-8 bg-white/10" />
                            <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: brandAccent }}>
                                v1.1
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-20">
                        {sections.map((section, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    <div className="md:w-1/3">
                                        <span className="text-[10px] font-bold text-gray-300 tracking-[0.3em] uppercase block mb-4">
                                            Section 0{index + 1}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="text-gray-600 leading-relaxed text-base font-normal">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-32 pt-16 border-t border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8"
                    >
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Legal Inquiries</h3>
                            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                                For any questions regarding your data protection or to exercise your privacy rights, please contact us.
                            </p>
                        </div>
                        <div className="flex flex-col items-start gap-2">
                            <span className="text-xs font-medium text-gray-400">Official Support</span>
                            <a
                                href="https://mail.google.com/mail/u/0/?hl=en#search/tamunazakariashvili%40gmail.com?compose=new"
                                className="text-lg font-bold border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition-all"
                            >
                                info@blrental.ge
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom Copyright */}
            <div className="py-12 border-t border-gray-50 text-center">
                <p className="text-gray-300 text-[10px] font-bold uppercase tracking-[0.4em]">
                    © 2026 BLRENTAL • Managed Security
                </p>
            </div>
            <Footer />
        </div>

    );
};

export default PrivacyPolicy;