import { AccountDataTable } from '@components/organisms/DataTables';
import React from 'react';
import { AdminSideBar, Header } from '@components/organisms'; // Sidebar et Header

type AdminAccountLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  addAccountBtn: () => void;
  deleteBtn: (id: number) => void;
  toggleBtn: (id: number, isActive: string) => void;
  data: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    establishment: string;
    reservation_count: number;
    status: string;
  }[];
};

export const AdminAccountLayout: React.FC<AdminAccountLayoutProps> = ({
  username,
  userEmail,
  organization,
  part,
  addAccountBtn,
  deleteBtn,
  toggleBtn,
  data,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barre latérale */}
      <AdminSideBar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part}
        />

        <AccountDataTable
          addAccountBtn={addAccountBtn}
          deleteBtn={deleteBtn}
          toggleBtn={toggleBtn}
          data={data}
        />
      </div>
    </div>
  );
};
