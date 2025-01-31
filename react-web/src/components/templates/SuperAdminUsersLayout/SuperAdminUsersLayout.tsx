import { AdminUsersDataTable, Header, SuperAdminSideBar } from '@components/organisms';
import "./style.css" ;
import { HeaderIcon } from '@components/atoms';
import { useTranslation } from 'react-i18next';
import { User } from '@hooks';
import { UserAdmin } from '@pages/SuperUsersAdminPage/SuperUsersAdminPage';

type SuperAdminUsersLayoutProps = {
  user : User | null;
  part: string;
  usersData: UserAdmin[];
  toggleBtn: (id: number, isActive: boolean) => void;
};

export const SuperAdminUsersLayout = ({
  user,
  part,
  usersData,
  toggleBtn
}: SuperAdminUsersLayoutProps) => {
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
          <div className="table-layout-restaurant">
          <HeaderIcon title={t('tables.titles.superadminUsers')} icon={'Calendar'}/>
          <AdminUsersDataTable
              data={usersData} 
              toggleBtn={toggleBtn}
              />
          </div>
        </main>
      </div>
    </div>
  );
};
