import React from 'react';
import fr from '@assets/fr.json'; // Ajuste le chemin selon ta structure

export const OwnerDashboardGraphs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {fr.dashboard.graph.commands}
        </h2>
        {/* Placez ici votre graphique */}
        <div className="text-gray-400 text-center">
          [Placeholder pour le graphique "{fr.dashboard.graph.commands}"]
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboardGraphs;
