import { Header, AdminSideBar } from '@components/organisms';
import { AccountDataTable } from '@components/organisms/DataTables';
import { User } from '@hooks';

type AdminAccountLayoutProps = {
  user : User | null;
  part: string;
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
  user,
  part,
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
          user={user}
          part={part}   
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
