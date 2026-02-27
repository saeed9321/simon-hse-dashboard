export const translations = {
  en: {
    appTitle: 'HSE Simon Dashboard',
    dashboard: 'Dashboard',
    reports: 'Reports',
    dataEntry: 'Data Entry',
    addEntry: 'Add Entry',
    fuelType: 'Fuel Type',
    diesel: 'Diesel',
    petrol: 'Petrol',
    liters: 'Liters',
    equipmentHours: 'Equipment Hours',
    activity: 'Activity',
    submit: 'Submit',
    delete: 'Delete',
    co2Emissions: 'CO₂ Emissions',
    fuelConsumption: 'Fuel Consumption',
    totalCO2: 'Total CO₂',
    totalFuel: 'Total Fuel',
    avgPerDay: 'Avg per Day',
    simonSays: 'Simon Says...',
    safetyTips: 'Safety & Efficiency Tips',
    date: 'Date',
    actions: 'Actions',
    noData: 'No data available yet. Add your first entry!',
    recentEntries: 'Recent Entries',
    emissionsTrend: 'CO₂ Emissions Trend',
    fuelTrend: 'Fuel Consumption Trend',
    emissionsByType: 'Emissions by Fuel Type',
    detailedReport: 'Detailed Report',
  },
  ar: {
    appTitle: 'لوحة تحكم سايمون للسلامة',
    dashboard: 'لوحة التحكم',
    reports: 'التقارير',
    dataEntry: 'إدخال البيانات',
    addEntry: 'إضافة بيان',
    fuelType: 'نوع الوقود',
    diesel: 'ديزل',
    petrol: 'بنزين',
    liters: 'لتر',
    equipmentHours: 'ساعات المعدات',
    activity: 'النشاط',
    submit: 'إرسال',
    delete: 'حذف',
    co2Emissions: 'انبعاثات ثاني أكسيد الكربون',
    fuelConsumption: 'استهلاك الوقود',
    totalCO2: 'إجمالي ثاني أكسيد الكربون',
    totalFuel: 'إجمالي الوقود',
    avgPerDay: 'المتوسط ​​في اليوم',
    simonSays: 'سايمون يقول...',
    safetyTips: 'نصائح السلامة والكفاءة',
    date: 'التاريخ',
    actions: 'الإجراءات',
    noData: 'لا توجد بيانات متاحة بعد. أضف الإدخال الأول!',
    recentEntries: 'الإدخالات الأخيرة',
    emissionsTrend: 'اتجاه انبعاثات ثاني أكسيد الكربون',
    fuelTrend: 'اتجاه استهلاك الوقود',
    emissionsByType: 'الانبعاثات حسب نوع الوقود',
    detailedReport: 'تقرير مفصل',
  }
};

export const getSimonTips = (language, fuelData) => {
  const tips = {
    en: [
      '🛡️ Always perform pre-start equipment checks before operation',
      '⛽ Monitor fuel consumption to identify equipment inefficiencies',
      '🌱 Consider using biodiesel blends to reduce CO₂ emissions',
      '📊 Regular maintenance can reduce fuel consumption by up to 15%',
      '🚧 Idle time reduction is the quickest way to cut emissions',
      '💡 Train operators on fuel-efficient driving techniques',
      '📉 High CO₂ levels detected - review equipment usage patterns',
      '✅ Great work! Your emissions are trending downward',
    ],
    ar: [
      '🛡️ قم دائمًا بإجراء فحوصات المعدات قبل بدء التشغيل',
      '⛽ راقب استهلاك الوقود لتحديد أوجه القصور في المعدات',
      '🌱 فكر في استخدام مخاليط الديزل الحيوي لتقليل انبعاثات ثاني أكسيد الكربون',
      '📊 الصيانة الدورية يمكن أن تقلل من استهلاك الوقود بنسبة تصل إلى 15٪',
      '🚧 تقليل وقت الخمول هو أسرع طريقة لخفض الانبعاثات',
      '💡 تدريب المشغلين على تقنيات القيادة الموفرة للوقود',
      '📉 تم اكتشاف مستويات عالية من ثاني أكسيد الكربون - راجع أنماط استخدام المعدات',
      '✅ عمل رائع! انبعاثاتك في انخفاض',
    ]
  };

  const langTips = tips[language];
  
  // Smart tip selection based on data
  if (fuelData.length === 0) {
    return [langTips[0], langTips[5]];
  }
  
  const recentEntries = fuelData.slice(-7);
  const avgCO2 = recentEntries.reduce((sum, entry) => sum + entry.co2, 0) / recentEntries.length;
  
  if (avgCO2 > 50) {
    return [langTips[6], langTips[4], langTips[2]];
  }
  
  return [langTips[7], langTips[3], langTips[1]];
};
