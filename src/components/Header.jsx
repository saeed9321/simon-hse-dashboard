import React from 'react';
import { Sun, Moon, Languages } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Header = () => {
  const { language, theme, toggleLanguage, toggleTheme } = useApp();
  const t = translations[language];

  return (
    <header className="bg-hse-blue dark:bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-hse-orange rounded-lg flex items-center justify-center font-bold text-2xl">
              S
            </div>
            <h1 className="text-2xl font-bold">{t.appTitle}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center space-x-2"
              aria-label="Toggle language"
            >
              <Languages size={20} />
              <span className="text-sm font-semibold">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
