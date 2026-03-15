import { useLanguage } from "../hooks/useLanguage";
import { Languages } from "lucide-react"; // თუ გაქვს ეს ბიბლიოთეკა

function LanguageSwitcher() {
  const { i18n } = useLanguage();

  const isActive = (lng) => i18n.language === lng;

  return (
    <div className="flex items-center gap-3 font-medium bg-black/5 px-3 py-1.5 rounded-full">
      {/* საერთო ლოგო - ენების აიქონი */}
      <Languages size={16} className="text-gray-600 mr-1" />
      
      <button
        onClick={() => i18n.changeLanguage("en")}
        className={`transition-all duration-300 text-[12px] uppercase tracking-wider ${
          isActive("en")
            ? "text-[rgb(184,147,87)] font-bold scale-105"
            : "text-black/60 hover:text-black"
        }`}
      >
        EN
      </button>

      <div className="w-[1px] h-3 bg-black/20"></div>

      <button
        onClick={() => i18n.changeLanguage("ka")}
        className={`transition-all duration-300 text-[12px] uppercase tracking-wider ${
          isActive("ka")
            ? "text-[rgb(184,147,87)] font-bold scale-105"
            : "text-black/60 hover:text-black"
        }`}
      >
        KA
      </button>

      <div className="w-[1px] h-3 bg-black/20"></div>

      <button
        onClick={() => i18n.changeLanguage("ru")}
        className={`transition-all duration-300 text-[12px] uppercase tracking-wider ${
          isActive("ru")
            ? "text-[rgb(184,147,87)] font-bold scale-105"
            : "text-black/60 hover:text-black"
        }`}
      >
        RU
      </button>
    </div>
  );
}

export default LanguageSwitcher;