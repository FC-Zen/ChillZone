import { AdminSideBar, BookingDataTable, ConflictDataTable, Header } from '@components/organisms';
import "./style.css" ;

type AdminBookingLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  reservationsData : {
    id: number;
    day_reservation: string; 
    start_time: string; 
    end_time: string;
    location_name: string;
    status: string;
  }[];
  conflictsData : {
    id: number;
    day_reservation: string;
    user_name: string;
    location_name: string;
    comment: string;
  }[];
};

export const AdminBookingLayout = ({
  username,
  userEmail,
  organization,
  part,
  reservationsData,
  conflictsData,
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

        <main className="mainContainerBooking">
          <BookingDataTable
            data={reservationsData}
          />
          <ConflictDataTable
            data={conflictsData}
          />
        </main>
      </div>
    </div>
  );
};
