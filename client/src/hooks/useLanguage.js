import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
    const { i18n, t } = useTranslation();

    // ვამატებთ მიმდინარე ენის ცვლადს
    const currentLanguage = i18n.language;

    // აბრუნებს true-ს თუ ენა ქართულია
    const isKA = currentLanguage === 'ka';

    return {
        isKA,
        currentLanguage, 
        t,
        i18n
    };
};