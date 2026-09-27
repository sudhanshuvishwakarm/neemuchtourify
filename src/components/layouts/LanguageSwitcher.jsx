'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from './TranslationProvider';

export default function LanguageSwitcher() {
  const { currentLanguage, switchLanguage, isTranslating } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: 'EN', fullName: 'English', flag: '🇮🇳' },
    { code: 'hi', name: 'हिं', fullName: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજ', fullName: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'mr', name: 'मरा', fullName: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமி', fullName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', name: 'తెలు', fullName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', name: 'ಕನ್ನ', fullName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയ', fullName: 'മലയാളം', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', fullName: 'বাংলা', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾ', fullName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'or', name: 'ଓଡ଼ି', fullName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
    { code: 'as', name: 'অসমী', fullName: 'অসমীয়া', flag: '🇮🇳' },
    { code: 'ur', name: 'اردو', fullName: 'اردو', flag: '🇮🇳' },
  ];

  const currentLanguageObj = languages.find((lang) => lang.code === currentLanguage);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSwitch = (langCode) => {
    if (langCode !== currentLanguage && !isTranslating) {
      switchLanguage(langCode);
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative z-50 notranslate"> {/* Add notranslate class here */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isTranslating}
        className="flex items-center gap-2 px-2 py-2 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed bg-[#127407] hover:bg-green-900"
      >
        <span className="text-lg">{currentLanguageObj?.flag}</span>
        <span className="text-sm">
          {isTranslating ? 'Translating...' : (currentLanguageObj?.name || 'English')}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 min-w-[160px] max-h-80 overflow-y-auto notranslate"> {/* And here */}
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSwitch(language.code)}
              disabled={isTranslating || currentLanguage === language.code}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 text-sm font-semibold hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed notranslate ${
                currentLanguage === language.code ? 'bg-green-50' : ''
              }`}
            >
              <span className="text-xl">{language.flag}</span>
              <span className="flex-1 text-gray-800">{language.fullName}</span>
              {currentLanguage === language.code && (
                <span className="text-green-600 text-base font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
