import { AdminUsersDataTable, Header, OwnersRegisterDataTable } from '@components/organisms';
import "./style.css" ;
import { HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';

type SuperAdminLayoutProps = {
  user : User | null;
  part: string;
  ownersRegisterData: {
    id : number;
    first_name: string;
    last_name: string;
    restauration_place_name: string;
    restauration_place_address: string;
    restauration_place_mail: string;
  }[];
  usersData: {
    id : number;
    first_name: string;
    last_name: string;
    type: string;
    role: string;
    establishment: string;
    is_verified : boolean;
  }[];
  handleClickAcceptOwner: (id: number) => void;
  handleClickRefuseOwner: (id: number) => void;
  handleClickAcceptAdmin: (id: number) => void;
  handleClickRefuseAdmin: (id: number) => void;
  handleClickDeleteAdmin: (id: number) => void;
};

export const SuperAdminLayout = ({
  user,
  part,
  ownersRegisterData,
  usersData,
  handleClickAcceptOwner,
  handleClickRefuseOwner,
  handleClickAcceptAdmin,
  handleClickRefuseAdmin,
  handleClickDeleteAdmin
}: SuperAdminLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">

      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerRestaurants">
          <div className="table-layout-restaurant">
          <HeaderIcon title={t('tables.titles.superadminOwners')} icon={'Calendar'}/>
          <OwnersRegisterDataTable
              data={ownersRegisterData} 
              handleClickAccept={handleClickAcceptOwner} 
              handleClickRefuse={handleClickRefuseOwner}              
          />
          </div>
          <div className="table-layout-restaurant">
          <HeaderIcon title={t('tables.titles.superadminAdmins')} icon={'Calendar'}/>
          <AdminUsersDataTable
              data={usersData} 
              handleClickAccept={handleClickAcceptAdmin} 
              handleClickRefuse={handleClickRefuseAdmin}    
              handleClickDelete={handleClickDeleteAdmin}      
              />
          </div>
        </main>
      </div>
    </div>
  );
};
