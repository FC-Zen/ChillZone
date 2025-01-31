import { AdminsRegisterDataTable, AdminUsersDataTable, Header, OwnersRegisterDataTable, SuperAdminSideBar } from '@components/organisms';
import "./style.css" ;
import { Button, HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';
import { AdminsRequest, RegisterRequest } from '@pages/SuperAdminPage/SuperAdminPage';

type SuperAdminLayoutProps = {
  user : User | null;
  part: string;
  ownersRegisterData: RegisterRequest[];
  adminsRegisterData: AdminsRequest[];
  handleClickAcceptOwner: (id: number) => void;
  handleClickRefuseOwner: (id: number) => void;
};

export const SuperAdminLayout = ({
  user,
  part,
  ownersRegisterData,
  adminsRegisterData,
  handleClickAcceptOwner,
  handleClickRefuseOwner
}: SuperAdminLayoutProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSideBar />
      
      <div className="flex-1">
        <Header
          user={user}
          part={part}   
          />
        
        <main className="mainContainerRestaurants">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
              title={t('buttons.admin')}
              onclick={() => {
                window.location.href = 'http://localhost:3000/admin/';
              }}
            />
          </div>
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
          <AdminsRegisterDataTable
              data={adminsRegisterData} 
              handleClickAccept={handleClickAcceptOwner} 
              handleClickRefuse={handleClickRefuseOwner}                   
          />
          </div>
        </main>
      </div>
    </div>
  );
};
