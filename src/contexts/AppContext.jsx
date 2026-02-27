import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [fuelData, setFuelData] = useState(() => {
    const saved = localStorage.getItem('fuelData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fuelData', JSON.stringify(fuelData));
  }, [fuelData]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const addFuelEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now(),
      date: new Date().toISOString(),
      co2: entry.fuelType === 'Diesel' 
        ? entry.liters * 2.68 
        : entry.liters * 2.31
    };
    setFuelData(prev => [...prev, newEntry]);
  };

  const deleteFuelEntry = (id) => {
    setFuelData(prev => prev.filter(entry => entry.id !== id));
  };

  const value = {
    language,
    theme,
    fuelData,
    toggleLanguage,
    toggleTheme,
    addFuelEntry,
    deleteFuelEntry,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
