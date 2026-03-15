import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCars } from "../contexts/CarsContext";
import { useLanguage } from "../hooks/useLanguage";

const SliderData = () => {
    const { cars } = useCars();
    const navigate = useNavigate();
    const { isKA, t } = useLanguage();

    const [selection, setSelection] = useState({
        brand: "",
        model: "",
        maxPrice: ""
    });

    const availablePrices = [...new Set(cars.map(car => car.pricePerDay))]
        .sort((a, b) => a - b);

    const brands = [...new Set(cars.map(car => car.brand))];
    const models = selection.brand
        ? [...new Set(cars.filter(c => c.brand === selection.brand).map(c => c.model))]
        : [];

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (selection.brand) params.append("brand", selection.brand);
        if (selection.model) params.append("model", selection.model);
        if (selection.maxPrice) params.append("maxPrice", selection.maxPrice);
        navigate(`/cars?${params.toString()}`);
    };

    return (
        /* pt-40 მობილურისთვის — კიდევ ცოტათი ქვემოთ ჩამოწეული */
        <section className="relative w-full min-h-screen flex flex-col items-center justify-start md:justify-center text-white overflow-hidden pt-40 md:pt-0 md:py-20">
            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/637899879_1906730589969515_5149657727831417922_n.jpg')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 w-full max-w-5xl px-4 text-center">
                <h1 className={`font-bold mb-6 md:mb-10 leading-tight transition-all duration-300 ${
                    isKA ? "text-2xl md:text-5xl lg:text-6xl" : "text-3xl md:text-7xl"
                }`}>
                    {t('Find Your Perfect Car')}
                </h1>

                {/* მთავარი კონტეინერი */}
                <div className="bg-white rounded-2xl md:rounded-full p-1.5 md:p-2 flex flex-col md:flex-row items-stretch shadow-2xl gap-1 md:gap-2">
                    
                    <div className="flex-1 px-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-100">
                        <select
                            value={selection.brand}
                            onChange={(e) => setSelection({ ...selection, brand: e.target.value, model: "" })}
                            className={`w-full bg-transparent text-gray-700 outline-none py-2.5 md:py-4 cursor-pointer transition-all ${
                                isKA ? "text-[12px] md:text-[13px]" : "text-sm md:text-base"
                            }`}
                        >
                            <option value="">{t('Any Makes')}</option>
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    <div className="flex-1 px-3 md:px-4 border-b md:border-b-0 md:border-r border-gray-100">
                        <select
                            value={selection.model}
                            onChange={(e) => setSelection({ ...selection, model: e.target.value })}
                            className={`w-full bg-transparent text-gray-700 outline-none py-2.5 md:py-4 cursor-pointer transition-all ${
                                isKA ? "text-[12px] md:text-[13px]" : "text-sm md:text-base"
                            }`}
                            disabled={!selection.brand}
                        >
                            <option value="">{t('Any Models')}</option>
                            {models.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div className="flex-1 px-3 md:px-4">
                        <select
                            value={selection.maxPrice}
                            onChange={(e) => setSelection({ ...selection, maxPrice: e.target.value })}
                            className={`w-full bg-transparent text-gray-700 outline-none py-2.5 md:py-4 cursor-pointer transition-all ${
                                isKA ? "text-[12px] md:text-[13px]" : "text-sm md:text-base"
                            }`}
                        >
                            <option value="">{t('Any Price')}</option>
                            {availablePrices.map(price => (
                                <option key={price} value={price}>
                                    {t('Up to')} ${price}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSearch}
                        className={`bg-[rgb(124,104,67)] hover:bg-[rgb(95,81,56)] text-white rounded-xl md:rounded-full flex items-center justify-center gap-2 transition-all font-bold active:scale-95 whitespace-nowrap ${
                            isKA ? "text-[12px] md:text-[13px] px-5 py-3 md:px-6 md:py-4" : "text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
                        }`}
                    >
                        <span>{t('Search Cars')}</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default SliderData;