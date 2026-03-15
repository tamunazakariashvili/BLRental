import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const TermsOfUse = () => {
    const brandAccent = 'rgb(171,171,171)';
    const darkBg = 'rgb(34, 40, 52)';

    const sections = [
        {
            title: "Driver Eligibility",
            content: "The renter must be at least 21 years of age and possess a valid driver's license held for a minimum of 2 years. International clients must provide a valid passport and, if necessary, an International Driving Permit (IDP)."
        },
        {
            title: "Vehicle Usage & Restrictions",
            content: "The vehicle must be driven only by the person(s) listed in the rental agreement. Off-road driving, racing, or transporting illegal substances is strictly prohibited. Smoking inside the vehicle is not allowed and will result in a professional cleaning fee."
        },
        {
            title: "Insurance & Liability",
            content: "Our vehicles come with standard insurance coverage. However, the insurance becomes void if the driver is found to be under the influence of alcohol or drugs, or if the damage is caused by gross negligence or violation of traffic laws."
        },
        {
            title: "Fuel & Late Returns",
            content: "Vehicles are provided with a full tank of fuel and must be returned full. A refueling service charge will apply if the vehicle is returned with less fuel. Late returns exceeding 2 hours will result in an additional day's rental charge."
        },
        {
            title: "Fines & Penalties",
            content: "The renter is fully responsible for all traffic violations, parking fines, and tolls incurred during the rental period. An administrative fee may apply for processing these penalties."
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans text-[#1a1a1a]">
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 relative border-b border-white/5" style={{ backgroundColor: darkBg }}>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-3">Service Terms</p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Terms of Use</h1>
                        <p className="text-white/60 text-base leading-relaxed max-w-2xl font-normal">
                            Please read these terms carefully before booking. By using our services, you agree to comply with our rental standards and Georgian traffic regulations.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-20">
                        {sections.map((section, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                                    <div className="md:w-1/3">
                                        <span className="text-[10px] font-bold text-gray-300 tracking-[0.3em] uppercase block mb-4">Article 0{index + 1}</span>
                                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{section.title}</h2>
                                    </div>
                                    <div className="md:w-2/3">
                                        <p className="text-gray-600 leading-relaxed text-base font-normal">{section.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default TermsOfUse;