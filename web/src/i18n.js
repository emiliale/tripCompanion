import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import shared_pl from "./translations/pl/shared.json";
import shared_en from "./translations/en/shared.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  debug: true,
  interpolation: {
    escapeValue: false, // react already handles escaping
  },
  resources: {
    en: {
      shared: shared_en,
    },
    pl: {
      shared: shared_pl,
    },
  },
});

export default i18n;
