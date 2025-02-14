import { AdminSideBar, BookingDataTable, ConflictDataTable, Header, OwnersAcceptedDataTable, OwnersPendingDataTable } from '@components/organisms';
import "./style.css" ;
import { HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';

type AdminOwnerLayoutProps = {
  user : User | null;
  part: string;
  restaurationPlacespendingData : {
    id: number;
    name : string; 
    type : string; 
    location: string;
    phone: string;
  }[];
  restaurationPlacesAcceptedData : {
    id: number;
    name: string;
    type: string;
    location: string;
    phone: string;
    status: boolean;
  }[];
  handleClickDelete: (id: number) => void;
  handleClickAccept: (id: number) => void;
  handleClickRefuse: (id: number) => void;
};

export const AdminOwnerLayout = ({
  user,
  part,
  restaurationPlacesAcceptedData,
  restaurationPlacespendingData,
  handleClickDelete,
  handleClickAccept,
  handleClickRefuse,
}: AdminOwnerLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar />

      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerRestaurants">
          <div className="table-layout-restaurant">
          <HeaderIcon title={t('tables.titles.table_restauration_place')} icon={'Calendar'}/>
          <OwnersAcceptedDataTable
              data={restaurationPlacesAcceptedData} 
              handleClickDelete={handleClickDelete}          
          />
          </div>
          <div className="table-layout-restaurant">
          <HeaderIcon title={t('tables.titles.affiliationRequests')} icon={'Calendar'}/>
          <OwnersPendingDataTable
              data={restaurationPlacespendingData} 
              handleClickAccept={handleClickAccept} 
              handleClickRefuse={handleClickRefuse}          
              />
          </div>
        </main>
      </div>
    </div>
  );
};
