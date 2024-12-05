import { Users, MessageSquare, Package, Percent } from 'lucide-react';
import StatCard from '@atoms/StatCard';
import Chart from '@molecules/Chart';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  
  const monthlyData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
      {
        label: 'Legend 1',
        data: [150, 220, 180, 190, 170, 150, 160, 200, 180, 190, 140, 200],
        color: '#0EA5E9',
      },
      {
        label: 'Legend 2',
        data: [120, 180, 150, 160, 140, 220, 200, 180, 160, 200, 250, 280],
        color: '#4F46E5',
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title={t('type.owner')}
          value="410" 
          trend={{ value: 8.9, isPositive: true }}
        />
        <StatCard
          icon={<MessageSquare className="w-6 h-6" />}
          title="Signalements reçus"
          value="10"
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          icon={<Package className="w-6 h-6" />}
          title="Salles/box disponibles"
          value="41"
        />
        <StatCard
          icon={<Percent className="w-6 h-6" />}
          title="Taux d'occupations des box/salles"
          value="84%"
          trend={{ value: 9.5, isPositive: true }}
        />
      </div>

      <div className="w-full">
        <Chart
          title="Nombre de connexions par mois"
          data={monthlyData}
        />
      </div>
    </div>
  );
};

export default Dashboard;