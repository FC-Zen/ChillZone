import { AdminDashboardGraphs, AdminSideBar, Header, AdminDashboardStatsCards } from '@components/organisms';
import { StatItem } from '@components/organisms/AdminDashboardStatsCards';
import { User } from '@hooks';
import { DashboardData } from '@services/AdminServices';

type AdminHomeLayoutProps = {
  user : User | null;
  part: string;
  data: DashboardData | null;
  stats: StatItem[];
};

export const AdminHomeLayout: React.FC<AdminHomeLayoutProps> = ({
  user,
  part,
  data,
  stats,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          part={part}   
        />
        
        <div className="flex p-6 gap-6">
          <div className="flex-1 space-y-6">
            <div className="space-y-6">
              {data && <AdminDashboardGraphs data={data} />}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AdminDashboardStatsCards stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};
