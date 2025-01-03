import { AdminSideBar, BookingDataTable, Header } from '@components/organisms';

type AdminBookingLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
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

export const AdminBookingLayout = ({
  username,
  userEmail,
  organization,
  part,
  data,
}: AdminBookingLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          userName={username}
          userEmail={userEmail}
          organization={organization}
          part={part} 
          icon={undefined}        
          />

        <main className="p-6">
          <BookingDataTable
            data={data}
          />
        </main>
      </div>
    </div>
  );
};
