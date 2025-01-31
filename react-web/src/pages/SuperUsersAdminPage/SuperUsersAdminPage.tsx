import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { getUsersSuperAdmin, toggleAccountActive } from '@services/SuperAdminServices';
import { SuperAdminUsersLayout } from '@components/templates/SuperAdminUsersLayout';

export type UserAdmin = {
  id: number;
  first_name: string;
  last_name: string;
  type: string; 
  role: string;
  establishment: string | null;
  is_active : boolean;
};

export const SuperUsersAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [usersData, setUsersData] = useState<UserAdmin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getUsersSuperAdmin();
        if (res?.data?.users) {
          setUsersData(res.data.users);
        } else {
          console.error('Aucun utilisateur trouvé');
        }
      } catch (error) {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading && usersData.length === 0) {
      fetchData();
    }
  }, [isLoading, usersData.length]);

  const handleToggleAccount = async (id: number, is_active: boolean) => {
    try {
      const res = await toggleAccountActive(id, !is_active);
      setUsersData(res.users);
      console.log(res.users);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compte:', error);
    }
  };

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <SuperAdminUsersLayout
        user={user}
        part={t('headers.home')}
        usersData={usersData}
        toggleBtn={handleToggleAccount}
      />
    </div>
  );
};
