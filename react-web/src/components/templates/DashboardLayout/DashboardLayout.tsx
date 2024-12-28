import { AdminSideBar, Header } from '@components/organisms';
import React from 'react';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />
      <div className="flex-1">
        <Header
          userName="Kellian BREDEAU"
          userEmail="kellian.bre@outlook.fr"
          organization="Université Gustave Eiffel"
          part="Acceuil"
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};
