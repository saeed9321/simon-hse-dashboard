import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Droplets, AlertCircle, Lightbulb } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations, getSimonTips } from '../utils/translations';

const Dashboard = () => {
  const { language, fuelData } = useApp();
  const t = translations[language];
  const isRTL = language === 'ar';

  // Calculate statistics
  const totalCO2 = fuelData.reduce((sum, entry) => sum + entry.co2, 0);
  const totalFuel = fuelData.reduce((sum, entry) => sum + entry.liters, 0);
  const avgCO2PerDay = fuelData.length > 0 ? (totalCO2 / fuelData.length).toFixed(2) : 0;

  // Prepare chart data
  const emissionsData = fuelData.slice(-10).map((entry, index) => ({
    name: new Date(entry.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', { month: 'short', day: 'numeric' }),
    co2: entry.co2.toFixed(2),
    fuel: entry.liters
  }));

  const fuelTypeData = [
    {
      name: t.diesel,
      value: fuelData.filter(e => e.fuelType === 'Diesel').reduce((sum, e) => sum + e.co2, 0)
    },
    {
      name: t.petrol,
      value: fuelData.filter(e => e.fuelType === 'Petrol').reduce((sum, e) => sum + e.co2, 0)
    }
  ].filter(item => item.value > 0);

  const COLORS = ['#FF6B35', '#004E89', '#52B788', '#FFC845'];

  const simonTips = getSimonTips(language, fuelData);

  const StatCard = ({ title, value, unit, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">{title}</p>
          <p className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            {value} <span className="text-lg text-gray-500">{unit}</span>
          </p>
        </div>
        <div className={`p-4 rounded-full ${color}`}>
          <Icon size={32} className="text-white" />
        </div>
      </div>
    </div>
  );

  if (fuelData.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title={t.totalCO2}
          value={totalCO2.toFixed(2)}
          unit="kg"
          icon={TrendingUp}
          color="bg-hse-orange"
        />
        <StatCard
          title={t.totalFuel}
          value={totalFuel.toFixed(2)}
          unit={t.liters}
          icon={Droplets}
          color="bg-hse-blue"
        />
        <StatCard
          title={t.avgPerDay}
          value={avgCO2PerDay}
          unit="kg CO₂"
          icon={TrendingUp}
          color="bg-hse-green"
        />
      </div>

      {/* Simon Says Section */}
      <div className="bg-gradient-to-r from-hse-yellow to-hse-orange rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <Lightbulb className="mr-3" size={32} />
          {t.simonSays}
        </h3>
        <div className="space-y-3">
          {simonTips.map((tip, index) => (
            <div key={index} className="bg-white/90 rounded-lg p-4">
              <p className="text-gray-800 font-medium text-lg">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CO2 Emissions Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t.emissionsTrend}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="co2" stroke="#FF6B35" strokeWidth={3} name={`CO₂ (kg)`} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fuel Consumption Trend */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t.fuelTrend}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={emissionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fuel" fill="#004E89" name={`${t.liters}`} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Emissions by Fuel Type */}
      {fuelTypeData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {t.emissionsByType}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fuelTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {fuelTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
