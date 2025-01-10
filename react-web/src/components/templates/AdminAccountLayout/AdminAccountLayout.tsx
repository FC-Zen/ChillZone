import { Header, AdminSideBar } from '@components/organisms';
import { AccountDataTable } from '@components/organisms/DataTables';

type AdminAccountLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  role: string;
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
  role,
  addAccountBtn,
  deleteBtn,
  toggleBtn,
  data,
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
        <AccountDataTable
          addAccountBtn={addAccountBtn}
          deleteBtn={deleteBtn}
          toggleBtn={toggleBtn}
          data={data}
        />
        </main>
      </div>
    </div>
  );
};
