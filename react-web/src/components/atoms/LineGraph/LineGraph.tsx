import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTranslation } from 'react-i18next';

interface LineGraphProps {
  data: Array<number>; // Données pour l'année en cours (ex: valeurs mensuelles)
  previousData: Array<number>; // Données pour l'année précédente (ex: valeurs mensuelles)
  xLabels: Array<string>; // Les mois ou les étiquettes de l'axe X
  yAxisLabel: string; // Label de l'axe Y (ex: 'Nombre de réservations', etc.)
}

export const LineGraph: React.FC<LineGraphProps> = ({ data, previousData, xLabels, yAxisLabel }) => {

  const containerHeight = window.innerHeight * 0.27; // 30% de la hauteur de l'écran
  const { t } = useTranslation();
  
  return (
    <div className="w-full h-[20%]">
      <LineChart
        height={containerHeight}
        series={[
          { data: previousData, label: `${yAxisLabel} (${t('dashboard.info.previousYear')})` },
          { data: data, label: `${yAxisLabel} (${t('dashboard.info.currentYear')})` },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ label: yAxisLabel }]}
      />
    </div>
  );
};
