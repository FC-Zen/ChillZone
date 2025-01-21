import { AdminSideBar, BookingDataTable, ConflictDataTable, Header } from '@components/organisms';
import "./style.css" ;
import { HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';

type AdminBookingLayoutProps = {
  user : User | null;
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
  user,
  part,
  reservationsData,
  conflictsData,
}: AdminBookingLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerBooking">
          <div className="table-layout">
          <HeaderIcon title={t('tables.titles.reservations')} icon={'Calendar'}/>
          <BookingDataTable
            data={reservationsData}
          />
          </div>
          <div className="table-layout">
          <HeaderIcon title={t('tables.titles.conflicts')} icon={'ExclamationFilled'}/>
          <ConflictDataTable
            data={conflictsData}
          />
          </div>
        </main>
      </div>
    </div>
  );
};
