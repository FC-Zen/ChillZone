import { AdminSideBar, Header } from '@components/organisms';
import { RoomDataTable } from '@components/organisms/DataTables';
import { User } from '@hooks';

type AdminRoomLayoutProps = {
  user : User | null;
  part: string;
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
    photo_link : string;
    id_type : number;
  }[];
};

export const AdminRoomLayout = ({
  user,
  part,
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
          user={user}
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
