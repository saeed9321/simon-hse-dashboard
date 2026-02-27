import React from 'react';
import { Trash2, FileText } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const Reports = () => {
  const { language, fuelData, deleteFuelEntry } = useApp();
  const t = translations[language];
  const isRTL = language === 'ar';

  if (fuelData.length === 0) {
    return (
      <div className={`text-center py-12 ${isRTL ? 'rtl' : 'ltr'}`}>
        <FileText size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
          <FileText className="mr-3 text-hse-orange" size={32} />
          {t.detailedReport}
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.date}
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.activity}
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.fuelType}
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.liters}
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.equipmentHours}
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  CO₂ (kg)
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 dark:text-gray-300">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {[...fuelData].reverse().map((entry) => (
                <tr key={entry.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {new Date(entry.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {entry.activity}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      entry.fuelType === 'Diesel' 
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {entry.fuelType === 'Diesel' ? t.diesel : t.petrol}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {entry.liters.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {entry.equipmentHours.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-hse-orange">
                    {entry.co2.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => deleteFuelEntry(entry.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      aria-label={t.delete}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {[...fuelData].reverse().map((entry) => (
            <div key={entry.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(entry.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                  <p className="font-semibold text-gray-800 dark:text-white mt-1">{entry.activity}</p>
                </div>
                <button
                  onClick={() => deleteFuelEntry(entry.id)}
                  className="text-red-600 hover:text-red-800 dark:text-red-400"
                  aria-label={t.delete}
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t.fuelType}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                    entry.fuelType === 'Diesel' 
                      ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {entry.fuelType === 'Diesel' ? t.diesel : t.petrol}
                  </span>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t.liters}</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{entry.liters.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t.equipmentHours}</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{entry.equipmentHours.toFixed(2)}</p>
                </div>
                
                <div>
                  <p className="text-gray-500 dark:text-gray-400">CO₂</p>
                  <p className="font-semibold text-hse-orange">{entry.co2.toFixed(2)} kg</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
