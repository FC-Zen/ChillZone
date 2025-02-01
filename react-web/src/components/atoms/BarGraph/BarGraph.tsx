import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart'; // Assurez-vous d'importer BarChart

interface BarGraphProps {
  data: Array<number>; // Données pour l'année en cours (ex: valeurs mensuelles)
  previousData: Array<number>; // Données pour l'année précédente (ex: valeurs mensuelles)
  xLabels: Array<string>; // Les mois ou les étiquettes de l'axe X
  yAxisLabel: string; // Label de l'axe Y (ex: 'Nombre de réservations', etc.)
}

export const BarGraph: React.FC<BarGraphProps> = ({ data, previousData, xLabels, yAxisLabel }) => {

  const containerHeight = window.innerHeight * 0.27; // 30% de la hauteur de l'écran

  return (
    <div className="w-full h-[20%]">
      <BarChart
        height={containerHeight}
        series={[
          { data: previousData, label: `${yAxisLabel} (Previous Year)` },
          { data: data, label: `${yAxisLabel} (Current Year)` },
        ]}
        xAxis={[{ scaleType: 'band', data: xLabels }]} // Utilisation de 'band' pour les graphiques à barres
        yAxis={[{ label: yAxisLabel }]} // Label de l'axe Y
      />
    </div>
  );
};
