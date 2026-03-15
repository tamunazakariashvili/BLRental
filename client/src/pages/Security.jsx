import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const Security = () => {
    const darkBg = 'rgb(34, 40, 52)';

    const securityMeasures = [
        {
            title: "Encryption Protocol",
            content: "We use 256-bit SSL (Secure Sockets Layer) encryption to protect all data transmitted between your browser and our servers, ensuring your session is always private."
        },
        {
            title: "Payment Safety",
            content: "Our system is PCI-DSS compliant through Bank of Georgia. We never store cardholder data; transactions happen in a specialized, bank-grade secure environment."
        },
        {
            title: "Access Control",
            content: "User passwords are never stored in plain text. We utilize Bcrypt one-way hashing algorithms, making it mathematically impossible to recover original passwords."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
            <section className="pt-32 pb-16 px-6 relative" style={{ backgroundColor: darkBg }}>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">System Protection</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Security Standards</h1>
                        <p className="text-white/60 text-base leading-relaxed max-w-2xl font-normal">
                            We employ banking-level security measures to protect our clients' data and financial transactions.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto space-y-20">
                    {securityMeasures.map((measure, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16">
                            <div className="md:w-1/3">
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{measure.title}</h2>
                            </div>
                            <div className="md:w-2/3">
                                <p className="text-gray-600 leading-relaxed text-base">{measure.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Security;