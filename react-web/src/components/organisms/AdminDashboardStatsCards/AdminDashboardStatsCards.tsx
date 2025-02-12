import React from 'react';
import { StatCard } from '@components/molecules';
import { IconList } from '@components/atoms';


export type StatItem = {
  icon: keyof typeof IconList;
  title: string;
  value: number | string;
  trend?: {
    value: number;
    isPositive: boolean;
    duration: string;
  };
};

type AdminDashboardStatsCardsProps = {
  stats: StatItem[];
};

export const AdminDashboardStatsCards: React.FC<AdminDashboardStatsCardsProps> = ({ stats }) => {

  return (
    <div className="flex flex-col gap-6 h-full">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
        />
      ))}
    </div>
  );
};
