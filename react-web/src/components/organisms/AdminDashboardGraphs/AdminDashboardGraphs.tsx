import React from 'react';
import fr from '@assets/fr.json';

export const AdminDashboardGraphs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {fr.dashboard.graph.reservation}
        </h2>
        {/* Placez ici votre graphique */}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">
          {fr.dashboard.graph.cnx}
        </h2>
        {/* Placez ici votre graphique */}
      </div>
    </div>
  );
};
