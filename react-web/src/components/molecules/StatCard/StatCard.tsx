import React from 'react';
import { colors } from '@theme/colors';
import { ArrowUp, ArrowDown } from '@components/atoms/Icons';

type StatCardProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  trend?: { value: number; isPositive: boolean; duration: string }; // Inclure la durée
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  trend,
}) => (
  <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4 relative">
    {/* Icône avec fond bleu */}
    <div
      className="p-3 rounded-full"
      style={{
        backgroundColor: colors.resolutionBlue, // Couleur bleu foncé du fichier colors.ts
        color: colors.white, // Icône en blanc
      }}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-lg font-semibold">{value}</h3>
      {trend && (
        <div className="flex items-center space-x-1">
          {trend.isPositive ? (
            <ArrowUp color={colors.green} height={12} width={12} />
          ) : (
            <ArrowDown color={colors.red} height={12} width={12} />
          )}
          <p
            className={`text-sm ${
              trend.isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend.isPositive ? '+' : '-'}
            {trend.value}%
          </p>
          <span className="text-xs text-gray-400">({trend.duration})</span>
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
