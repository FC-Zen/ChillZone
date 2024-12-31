import React from 'react';
import { OwnerSidebar, Header } from '@components/organisms';

type OwnerHomeLayoutProps = {
  username: string;
  userEmail: string;
  icon: React.ReactNode; // Ajout pour inclure une icône
  organization: string;
  part: string;
  statsSection: React.ReactNode;
  mainContent: React.ReactNode;
};

export const OwnerHomeLayout: React.FC<OwnerHomeLayoutProps> = ({
  username,
  userEmail,
  icon,
  organization,
  part,
  statsSection,
  mainContent,
}) => (
  <div className="flex min-h-screen bg-gray-100">
    {/* Sidebar du propriétaire */}
    <OwnerSidebar />
    <div className="flex-1">
      {/* En-tête */}
      <Header
        userName={username}
        userEmail={userEmail}
        icon={icon} // Inclure l'icône
        organization={organization}
        part={part}
      />
      {/* Contenu principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Section principale */}
        <div className="lg:col-span-2 space-y-6">{mainContent}</div>

        {/* Section des statistiques */}
        <div className="space-y-6">{statsSection}</div>
      </div>
    </div>
  </div>
);
