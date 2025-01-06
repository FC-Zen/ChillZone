import React from 'react';
import { OwnerSidebar, Header, OrdersDataTable } from '@components/organisms';
import { StatCard } from '@components/molecules';
import { User } from '@components/atoms/Icons';
import { colors } from '@theme';

type OwnerHomeLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  statsSection: {
    commandsNow: { 
      name: string;
      value: string | number; };
    commandsToday: { 
      name: string;
      value: string | number; };
    commandsTodo: { 
      name: string;
      value: string | number; };
  };
  data : any;
};

export const OwnerOrdersTemplate: React.FC<OwnerHomeLayoutProps> = ({
  username,
  userEmail,
  organization,
  part,
  statsSection,
  data,
}) => (
  <div className="flex min-h-screen bg-gray-100">
    <OwnerSidebar />

    <div className="flex-1">
      <Header
        userName={username}
        userEmail={userEmail}
        organization={organization}
        part={part}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">

        <div className="lg:col-span-2 space-y-6">
        <OrdersDataTable   
          data={data}
        />
        </div>

        <div className="space-y-6">
          <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsNow.name}
            value={statsSection.commandsNow.value}
          />
            <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsToday.name}
            value={statsSection.commandsToday.value}
          />
            <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsTodo.name}
            value={statsSection.commandsTodo.value}
          />
        </div>

      </div>
    </div>
  </div>
);
