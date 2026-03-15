import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// ინგლისური (en) აღარ გვჭირდება, რადგან t('Text')-ში პირდაპირ ინგლისურს ვწერთ
import ka from "./locales/ka/translation.json";
import ru from "./locales/ru/translation.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        resources: {
            ka: { translation: ka },
            ru: { translation: ru },
        },
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        keySeparator: false,
        nsSeparator: false,
    });

export default i18n;