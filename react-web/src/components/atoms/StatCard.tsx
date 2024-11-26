import React from 'react';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

const StatCard = ({ icon, title, value, trend }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;