import React from 'react';
import { colors } from '@theme/colors';
import { ArrowUp, ArrowDown, Icon, IconList } from '@components/atoms/Icons';

type StatCardProps = {
  icon: keyof typeof IconList ;
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
  <div className="pl-6 bg-white rounded-lg shadow-md flex items-center space-x-4 relative flex-1">
    {/* Icône avec fond bleu */}
    <div
      className="px-4 py-3 rounded-full"
      style={{
        backgroundColor: colors.resolutionBlue, // Couleur bleu foncé du fichier colors.ts
        color: colors.white, // Icône en blanc
      }}
    >
      <Icon name={icon} color={colors.white} />
    </div>
    <div>
      <p className="text-lg text-gray-500">{title}</p>
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
