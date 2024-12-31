import { AdminSideBar, Header } from '@components/organisms';

type AdminHomeLayoutProps = {
  username: string;
  userEmail: string;
  icon: React.ReactNode; // Accepte une icône React
  organization: string;
  part: string;
  statsSection: React.ReactNode;
  mainContent: React.ReactNode;
};

export const AdminHomeLayout: React.FC<AdminHomeLayoutProps> = ({
  username,
  userEmail,
  icon,
  organization,
  part,
  statsSection,
  mainContent,
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
          icon={icon}
          organization={organization}
          part={part}
        />
        {/* Conteneur principal */}
        <div className="flex p-6 gap-6">
          {/* Contenu principal (graphiques, etc.) */}
          <div className="flex-1 space-y-6">{mainContent}</div>

          {/* Section des statistiques */}
          <div className="flex flex-col gap-6">{statsSection}</div>
        </div>
      </div>
    </div>
  );
};
