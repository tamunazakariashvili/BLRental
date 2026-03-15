import { useState } from "react";
import { useCars } from "../contexts/CarsContext";
import { useLanguage } from "../hooks/useLanguage"; // დავამატეთ ენის ჰუკი
import AddCarForm from "./AddCarForm";
import UpdateCarForm from "./UpdateCarForm";
import { motion, AnimatePresence } from "framer-motion";
import { IconPlus, IconEdit, IconTrash, IconSteeringWheel, IconEngine } from "@tabler/icons-react";

const CarControl = () => {
    const { cars, loading, deletedCar } = useCars();
    const { t } = useLanguage(); // i18n ტრანსლაციის ფუნქცია
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingCar, setEditingCar] = useState(null);

    const accentColor = "rgb(34,40,52)";

    return (
        <div className="w-full space-y-6">
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 md:rounded-[24px] border-b md:border border-gray-100 shadow-sm">
                <div>
                    <h3 className="font-bold text-xl text-gray-900 tracking-tight">
                        {t("Fleet")} <span style={{ color: accentColor }}>{t("Inventory")}</span>
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-1">
                        {t("Total Vehicles")}: <span className="text-gray-600">{cars?.length || 0}</span>
                    </p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    style={{ backgroundColor: accentColor }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 text-white px-6 py-3 rounded-xl text-xs font-bold hover:opacity-90 transition-all transform active:scale-95"
                >
                    <IconPlus size={16} stroke={3} />
                    {t("Add New Vehicle")}
                </button>
            </div>

            {/* --- MOBILE VIEW (Cards) --- */}
            <div className="grid grid-cols-1 gap-4 px-4 md:hidden">
                {loading ? (
                    <div className="py-20 text-center col-span-full">
                        <div className="w-6 h-6 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-xs text-gray-400">{t("Syncing Fleet Data")}...</p>
                    </div>
                ) : (
                    cars?.map((car) => (
                        <div key={car._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="w-24 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                    <img 
                                        src={car.images?.[0] || 'https://via.placeholder.com/300x200'} 
                                        className="w-full h-full object-cover" 
                                        alt={car.model} 
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 truncate">{car.brand}</h4>
                                    <p className="text-xs text-gray-500 mb-2">{car.model}</p>
                                    <div className="flex items-center gap-1">
                                        <span className="text-lg font-black text-gray-900">${car.pricePerDay}</span>
                                        <span className="text-[10px] text-gray-400 uppercase font-bold">/ {t("Day")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                                        <IconEngine size={14} className="text-gray-400" />
                                        {car.engine}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase">
                                        <IconSteeringWheel size={14} className="text-gray-400" />
                                        {car.transmission}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setEditingCar(car)}
                                        className="p-2 bg-gray-50 rounded-lg text-gray-600 active:bg-gray-900 active:text-white transition-colors"
                                    >
                                        <IconEdit size={18} />
                                    </button>
                                    <button 
                                        onClick={() => deletedCar(car._id)}
                                        className="p-2 bg-gray-50 rounded-lg text-red-500 active:bg-red-50 transition-colors"
                                    >
                                        <IconTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* --- DESKTOP VIEW (Table) --- */}
            <div className="hidden md:block bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("Vehicle Details")}</th>
                                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("Specifications")}</th>
                                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t("Daily Rate")}</th>
                                <th className="p-5 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">{t("Actions")}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="p-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-5 h-5 border-2 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
                                            <p className="text-xs font-medium text-gray-400">{t("Syncing Fleet Data")}...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : cars?.map((car) => (
                                <tr key={car._id} className="hover:bg-gray-50/30 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                                <img
                                                    src={car.images?.[0] || 'https://via.placeholder.com/300x200'}
                                                    alt={car.model}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                                                    {car.brand}
                                                </p>
                                                <p className="text-xs text-gray-500">{car.model}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
                                                <IconEngine size={14} className="text-gray-300" />
                                                {car.engine}
                                            </div>
                                            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-bold uppercase">
                                                <IconSteeringWheel size={14} className="text-gray-300" />
                                                {car.transmission}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-gray-900">${car.pricePerDay}</span>
                                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">/ {t("Day")}</span>
                                        </div>
                                    </td>
                                    <td className="p-5 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditingCar(car)} className="p-2.5 bg-gray-50 hover:bg-gray-900 hover:text-white rounded-lg transition-all border border-gray-100 active:scale-95 text-gray-600">
                                                <IconEdit size={16} />
                                            </button>
                                            <button onClick={() => deletedCar(car._id)} className="p-2.5 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all border border-gray-100 active:scale-95 text-gray-600">
                                                <IconTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* --- MODALS --- */}
            <AnimatePresence>
                {(isAddModalOpen || editingCar) && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                setEditingCar(null);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: "100%" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: "100%" }}
                            className="relative z-10 w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto no-scrollbar rounded-t-[24px] md:rounded-[24px] bg-white shadow-2xl"
                        >
                            {isAddModalOpen ? (
                                <AddCarForm onClose={() => setIsAddModalOpen(false)} />
                            ) : (
                                <UpdateCarForm
                                    car={editingCar}
                                    onClose={() => setEditingCar(null)}
                                />
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarControl;