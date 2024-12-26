import React from 'react';

export const DashboardGraphs: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">
        Nombre de réservations par mois
      </h2>
      {/* Placez ici votre graphique */}
    </div>
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">
        Nombre de connexions par mois
      </h2>
      {/* Placez ici votre graphique */}
    </div>
  </div>
);
