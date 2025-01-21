import React from 'react';
import { OwnerSidebar, Header } from '@components/organisms';
import { User } from '@hooks';

type OwnerHomeLayoutProps = {
  user : User | null;
  part: string;
  statsSection: React.ReactNode;
  mainContent: React.ReactNode;
};

export const OwnerHomeLayout: React.FC<OwnerHomeLayoutProps> = ({
  user,
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
        user={user}
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
