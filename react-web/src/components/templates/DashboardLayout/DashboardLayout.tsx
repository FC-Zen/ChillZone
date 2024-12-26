import React from 'react';
import Sidebar from '@organisms/Sidebar';
import Header from '@organisms/Header';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header
          userName="Kellian BREDEAU"
          userEmail="kellian.bre@outlook.fr"
          organization="Université Gustave Eiffel"
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
