import { createPortal } from "react-dom";
import { useCars } from "../contexts/CarsContext";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
    IconX, IconSettings, IconUpload, IconCheck, IconLoader2
} from "@tabler/icons-react";

const AddCarForm = ({ onClose }) => {
    const { t } = useTranslation();
    const { addCar } = useCars();
    const [loading, setLoading] = useState(false);
    
    const accentColor = "#000000"; 
    const lightGray = "#F3F4F6"; 

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    const [features, setFeatures] = useState({
        airCondition: false, musicSystem: false, toolkit: false,
        absSystem: false, bluetooth: false, fullBootSpace: false,
        usbCharger: false, auxInput: false, spareTyre: false,
        powerSteering: false, powerWindows: false
    });

    const handleFeatureChange = (e) => {
        const { name, checked } = e.target;
        setFeatures(prev => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        formData.append("features", JSON.stringify(features));

        try {
            await addCar(formData);
            if (onClose) onClose();
        } catch (error) {
            console.error("Error adding car:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = `w-full bg-gray-50 border border-gray-200 p-4 rounded-2xl text-sm text-black focus:outline-none focus:border-black/20 focus:bg-white transition-all placeholder:text-gray-400`;
    const labelStyle = "text-xs font-semibold text-gray-500 ml-1 mb-2 block group-focus-within:text-black transition-colors";

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-md" onClick={onClose} />

            <div 
                style={{ backgroundColor: "#FFFFFF" }}
                className="p-8 md:p-10 rounded-[40px] relative overflow-hidden border border-gray-100 shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar"
            >
                <div 
                    style={{ backgroundColor: lightGray }}
                    className="absolute -top-24 -right-24 w-64 h-64 opacity-50 blur-[100px] rounded-full" 
                />

                <button onClick={onClose} className="absolute top-6 right-6 p-2.5 bg-gray-100 hover:bg-black hover:text-white rounded-xl transition-all text-gray-500 active:scale-90 z-10">
                    <IconX size={20} />
                </button>

                <div className="mb-10 relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-1.5 h-6 bg-black rounded-full" />
                        <h2 className="text-2xl font-bold tracking-tight text-black leading-none">
                            {t('Register New')} <span style={{ color: "#6B7280" }}>{t('Vehicle')}</span>
                        </h2>
                    </div>
                    <p className="text-xs text-gray-400 font-medium tracking-wide ml-4 uppercase">{t('Fleet Expansion Terminal')}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Brand')}</label>
                                    <input type="text" name="brand" placeholder="e.g. BMW" required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Model')}</label>
                                    <input type="text" name="model" placeholder="e.g. M4" required className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Release Year')}</label>
                                    <input type="number" name="year" placeholder="2024" required className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Price / Day ($)')}</label>
                                    <input type="number" name="pricePerDay" placeholder="250" required className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t('Media Gallery')}</label>
                                <div className="relative group/upload">
                                    <input type="file" name="images" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                    <div className="border-2 border-dashed border-gray-200 rounded-2xl py-8 flex flex-col items-center justify-center group-hover/upload:border-gray-400 group-hover/upload:bg-gray-50 transition-all">
                                        <IconUpload className="text-gray-400 mb-2 group-hover/upload:text-black" size={24} />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('Drop images here')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Car Type')}</label>
                                    <input type="text" name="carType" placeholder="Sport / Sedan" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Engine')}</label>
                                    <input type="text" name="engine" placeholder="3.0L V6" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Transmission')}</label>
                                    <input type="text" name="transmission" placeholder="Automatic" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Condition')}</label>
                                    <input type="text" name="condition" placeholder="New / Used" className={inputStyle} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Mileage (km)')}</label>
                                    <input type="number" name="mileage" placeholder="0" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Fuel Type')}</label>
                                    <input type="text" name="fueltype" placeholder="Petrol / Electric" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="group">
                                    <label className={labelStyle}>{t('Country of Origin')}</label>
                                    <input type="text" name="countryoforigin" placeholder="Germany" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Location')}</label>
                                    <input type="text" name="location" placeholder="Tbilisi, Georgia" className={inputStyle} />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div className="group">
                                    <label className={labelStyle}>{t('Doors')}</label>
                                    <input type="number" name="doors" placeholder="2" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Seats')}</label>
                                    <input type="number" name="seats" placeholder="4" className={inputStyle} />
                                </div>
                                <div className="group">
                                    <label className={labelStyle}>{t('Passenger')}</label>
                                    <input type="number" name="pasenger" placeholder="4" className={inputStyle} />
                                </div>
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t('Contact Phone')}</label>
                                <input type="text" name="phone" placeholder="+995 ..." className={inputStyle} />
                            </div>

                            <div className="group">
                                <label className={labelStyle}>{t('Vehicle Description')}</label>
                                <textarea name="description" placeholder="Full history and specs..." className={`${inputStyle} h-[116px] resize-none`} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2 mb-6">
                            <IconSettings size={18} className="text-gray-400" />
                            <h3 className="text-[11px] font-bold text-black uppercase tracking-[0.2em]">{t('Equipment & Systems')}</h3>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.keys(features).map(key => (
                                <label key={key} className="flex items-center gap-3 cursor-pointer group/feat">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            name={key}
                                            checked={features[key]}
                                            onChange={handleFeatureChange}
                                            className="peer hidden"
                                        />
                                        <div 
                                            className="w-5 h-5 border border-gray-300 rounded-lg peer-checked:bg-black peer-checked:border-black transition-all flex items-center justify-center"
                                        >
                                            <IconCheck className="text-white hidden peer-checked:block" size={14} stroke={4} />
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 group-hover/feat:text-black uppercase tracking-tight transition-colors">
                                
                                        {t(key)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="flex-1 px-8 py-5 rounded-2xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {t('Cancel')}
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-black text-white py-5 rounded-2xl font-bold tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-300 disabled:text-gray-500"
                        >
                            {loading ? (
                                <>
                                    <IconLoader2 className="animate-spin" size={20} />
                                    {t('Processing...')}
                                </>
                            ) : (
                                t('Add car to Fleet')
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

export default AddCarForm;