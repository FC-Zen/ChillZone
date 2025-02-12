import React from 'react';
import { BarGraph, LineGraph } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { OwnerDashboardData } from '@services';

type OwnerDashboardGraphsprops = {
  data: OwnerDashboardData;
};

export const OwnerDashboardGraphs: React.FC<OwnerDashboardGraphsprops> = ({ data }) => {

  const { t } = useTranslation();

  const prepareMonthData = (data: Array<{ month: number; count: number }>) => {
    // Mois de l'année selon la traduction
    const months = [
      t('months.january'), 
      t('months.february'),
      t('months.march'),
      t('months.april'), 
      t('months.may'), 
      t('months.june'), 
      t('months.july'), 
      t('months.august'),
      t('months.september'), 
      t('months.october'),  
      t('months.november'), 
      t('months.december'),
    ];
  
    const allMonths = months.map((month, index) => {
      const existingData = data.find((d) => d.month === index + 1); // On cherche si le mois est dans les données
      return {
        month: month,  // Nom du mois
        count: existingData ? existingData.count : 0, // Si le mois existe, on garde le count sinon on met 0
      };
    });
  
    return allMonths;
  };

  const months = prepareMonthData(data.commands_per_month_current_year).map((d) => d.month);

  const currentYearCommandsCounts = prepareMonthData(data.commands_per_month_current_year).map((d) => d.count);
  const previousYearCommandsCounts = prepareMonthData(data.commands_per_month_previous_year).map((d) => d.count);

  const currentYearRevenu = prepareMonthData(data.revenue_per_month_current_year).map((d) => d.count);
  const previousYearRevenu = prepareMonthData(data.revenue_per_month_previous_year).map((d) => d.count);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {t('dashboard.graph.commands')}  
        </h2>
        <BarGraph 
          data={currentYearCommandsCounts}
          previousData={previousYearCommandsCounts} 
          xLabels={months} 
          yAxisLabel={t('dashboard.graph.commands')}        
        />
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
        {t('dashboard.graph.revenu')}    
        </h2>
        <LineGraph 
          data={currentYearRevenu}
          previousData={previousYearRevenu} 
          xLabels={months} 
          yAxisLabel={t('dashboard.graph.revenu')}          
        />
      </div>
    </div>
  );
};
