import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

interface LineGraphProps {
  data: Array<number>; // Données pour l'année en cours (ex: valeurs mensuelles)
  previousData: Array<number>; // Données pour l'année précédente (ex: valeurs mensuelles)
  xLabels: Array<string>; // Les mois ou les étiquettes de l'axe X
  yAxisLabel: string; // Label de l'axe Y (ex: 'Nombre de réservations', etc.)
}

export const LineGraph: React.FC<LineGraphProps> = ({ data, previousData, xLabels, yAxisLabel }) => {
  return (
    <div className="w-full">
      <LineChart
      height={300}
        series={[
          { data: previousData, label: `${yAxisLabel} (Previous Year)` },
          { data: data, label: `${yAxisLabel} (Current Year)` },
        ]}
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        yAxis={[{ label: yAxisLabel }]}
      />
    </div>
  );
};
