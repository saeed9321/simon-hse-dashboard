import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../utils/translations';

const DataEntryForm = () => {
  const { language, addFuelEntry } = useApp();
  const t = translations[language];
  
  const [formData, setFormData] = useState({
    fuelType: 'Diesel',
    liters: '',
    equipmentHours: '',
    activity: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.liters && formData.equipmentHours && formData.activity) {
      addFuelEntry({
        ...formData,
        liters: parseFloat(formData.liters),
        equipmentHours: parseFloat(formData.equipmentHours)
      });
      setFormData({
        fuelType: 'Diesel',
        liters: '',
        equipmentHours: '',
        activity: ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <Plus className="mr-2 text-hse-orange" size={28} />
        {t.dataEntry}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t.fuelType}
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:border-hse-blue focus:outline-none"
          >
            <option value="Diesel">{t.diesel}</option>
            <option value="Petrol">{t.petrol}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t.liters}
          </label>
          <input
            type="number"
            name="liters"
            value={formData.liters}
            onChange={handleChange}
            step="0.1"
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:border-hse-blue focus:outline-none"
            placeholder="0.0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t.equipmentHours}
          </label>
          <input
            type="number"
            name="equipmentHours"
            value={formData.equipmentHours}
            onChange={handleChange}
            step="0.1"
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:border-hse-blue focus:outline-none"
            placeholder="0.0"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t.activity}
          </label>
          <input
            type="text"
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 
                     dark:bg-gray-700 dark:text-white focus:border-hse-blue focus:outline-none"
            placeholder={language === 'en' ? 'e.g., Excavation, Material Transport' : 'مثل: الحفر، نقل المواد'}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-hse-orange hover:bg-orange-600 text-white font-bold py-3 px-6 
                   rounded-lg transition-colors duration-200 flex items-center justify-center"
        >
          <Plus className="mr-2" size={20} />
          {t.submit}
        </button>
      </form>
    </div>
  );
};

export default DataEntryForm;
