import React from 'react';
import { Sidebar, Header, DataTable } from '@components/organisms';

type AdminAccountLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
};

export const AdminAccountLayout = ({
  username,
  userEmail,
  organization,
  part,
}: AdminAccountLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barre latérale */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1">
        {/* Header */}
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part}
        />

        {/* Contenu de la page */}
        <main className="p-6">
          <DataTable />
        </main>
      </div>
    </div>
  );
};
