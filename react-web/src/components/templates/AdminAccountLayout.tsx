import React from 'react';
import Sidebar from '../organisms/Sidebar';
import Header from '../organisms/Header';

type AdminAccountLayoutProps = {
  children: React.ReactNode;
};

const AdminAccountLayout = ({ children }: AdminAccountLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barre latérale */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1">
        {/* Header */}
        <Header
          userName="Kellian BREDEAU"
          userEmail="kellian.bre@outlook.fr"
          organization="Université Gustave Eiffel"
          part="Comptes"
        />

        {/* Contenu de la page */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminAccountLayout;
