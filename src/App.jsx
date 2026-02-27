import React, { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import DataEntryForm from './components/DataEntryForm';
import Reports from './components/Reports';
import { translations } from './utils/translations';
import { LayoutDashboard, FileText, PlusCircle } from 'lucide-react';

const AppContent = () => {
  const { language } = useApp();
  const t = translations[language];
  const isRTL = language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'entry', label: t.addEntry, icon: PlusCircle },
    { id: 'reports', label: t.reports, icon: FileText },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-6 p-2">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-hse-orange text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fadeIn">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'entry' && (
            <div className="max-w-2xl mx-auto">
              <DataEntryForm />
            </div>
          )}
          {activeTab === 'reports' && <Reports />}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'en' 
              ? '© 2024 HSE Simon Dashboard - Construction Safety & Efficiency Monitoring'
              : '© 2024 لوحة تحكم سايمون للسلامة - مراقبة السلامة والكفاءة في البناء'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
