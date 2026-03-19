import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const RefundPolicy = () => {
    const brandAccent = 'rgb(171,171,171)';
    const darkBg = 'rgb(34, 40, 52)';

    const sections = [
        {
            title: "Cancellation Process",
            content: "To cancel a reservation, customers must contact our support team directly via email at info@blrental.ge or through our official contact numbers. Please include your booking reference number in your request. Cancellations are processed manually by our staff during working hours."
        },
        {
            title: "Refund Eligibility",
            content: "A full refund is issued if the cancellation request is received at least 48 hours prior to the scheduled pick-up time. Requests made within 48 hours of the pick-up time may be subject to a cancellation fee equivalent to one day's rental."
        },
        {
            title: "Documentation & No-Show",
            content: "If a rental is refused because the driver fails to present a valid license/passport, or if the customer does not show up within 3 hours of the scheduled time without notice, the booking will be marked as non-refundable."
        },
    ];
    return (
        <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
            <section className="pt-32 pb-16 px-6 relative border-b border-white/5" style={{ backgroundColor: darkBg }}>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Service Agreements</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Refund Policy</h1>
                        <p className="text-white/60 text-base leading-relaxed max-w-2xl font-normal">
                            Our goal is to provide a transparent and fair cancellation process for all our customers.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto space-y-20">
                    {sections.map((section, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-16">
                            <div className="md:w-1/3">
                                <span className="text-[10px] font-bold text-gray-300 tracking-[0.3em] uppercase block mb-4">Policy 0{index + 1}</span>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">{section.title}</h2>
                            </div>
                            <div className="md:w-2/3 text-gray-600 leading-relaxed text-base font-normal">
                                {section.content}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default RefundPolicy;