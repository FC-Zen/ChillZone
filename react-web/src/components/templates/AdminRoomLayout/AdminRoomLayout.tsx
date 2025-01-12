import { AdminSideBar, Header } from '@components/organisms';
import { RoomDataTable } from '@components/organisms/DataTables';

type AdminRoomLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  role: string;
  addBtn: () => void;
  deleteBtn: (id: number) => void;
  toggleBtn: (id: number, isActive: boolean) => void;
  data: {
    id: number;
    name: string;
    description:  string | null;
    capacity: number;
    floor_name: string;
    establishment: string;
    status: boolean;
  }[];
};

export const AdminRoomLayout = ({
  username,
  userEmail,
  organization,
  part,
  role,
  addBtn,
  deleteBtn,
  toggleBtn,
  data,
}: AdminRoomLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part} 
          role={role}
          />

        <main className="p-6">
          <RoomDataTable
            addRoomBtn={addBtn}
            editRoomBtn={deleteBtn}
            toggleBtn={toggleBtn}
            data={data}
          />
        </main>
      </div>
    </div>
  );
};
