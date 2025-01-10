import { Header, AdminSideBar } from '@components/organisms';
import { AccountDataTable } from '@components/organisms/DataTables';

type AdminEstablishmentLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  role: string;
};

export const AdminEstablishmentLayout: React.FC<AdminEstablishmentLayoutProps> = ({
  username,
  userEmail,
  role,
  organization,
  part,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part}  
          role={role}      
        />

        <main className="p-6">
        </main>
      </div>
    </div>
  );
};
