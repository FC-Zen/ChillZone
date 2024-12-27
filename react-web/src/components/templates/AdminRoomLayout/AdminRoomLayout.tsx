import { Sidebar, Header } from '@components/organisms';
import { RoomDataTable } from '@components/organisms/DataTables';

type AdminRoomLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  addBtn : () => void; 
  deleteBtn: (id: number) => void; 
  toggleBtn: (id: number, isActive: boolean) => void; 
  data: {
    id: number;
    name: string;
    description: string;
    capacity: number;
    floor: string;
    establishment: string;
    status: boolean;
  }[];
};

export const AdminRoomLayout = ({
  username,
  userEmail,
  organization,
  part,
  addBtn,
  deleteBtn,
  toggleBtn,
  data
}: AdminRoomLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part}
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
