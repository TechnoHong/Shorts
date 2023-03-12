import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en-US';
import ko from './ko-KR';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources: {
        ko,
        en,
      },
      fallbackLng: ['ko', 'en'],
      debug: true,
      interpolation: {
        escapeValue: false,
      },
      saveMissing: true,
    },
    function (err) {
      if (err) console.error(err);
    },
  );

export default i18n;
