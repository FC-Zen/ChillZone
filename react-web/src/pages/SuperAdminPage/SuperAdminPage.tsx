import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { SuperAdminLayout } from '@components/templates/SuperAdminLayout';
import { deleteOwnerRegistration, getRequestsSuperAdmin, manageOwnerRegistration } from '@services/SuperAdminServices';

export type RegisterRequest = {
  id: number;
  first_name: string;
  last_name: string;
  email : string;
  phone : string;
  restaurant_name: string;
  restaurant_location: string;
};

export type AdminsRequest = {
  id: number;
  first_name: string;
  last_name: string;
  email : string;
  role : string;
  establishment: string;
  phone: string;
};

export const SuperAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [ownersRegisterData, setOwnersRegisterData] = useState<RegisterRequest[]>([]);
  const [adminsRegisterData, setAdminsRegisterData] = useState<AdminsRequest[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRequestsSuperAdmin();
      setAdminsRegisterData(res?.data.admin_requests);
      setOwnersRegisterData(res?.data.register_requests);
    };
    fetchData();
  }, []);


  // Demandes d'affiliation des lieux de restauration à l’établissement
  // Si on accepte => on ajoute au dessus
  const handleClickAcceptOwner = async (id: number) => {
    try {
      const res = await manageOwnerRegistration(id);
      setAdminsRegisterData(res?.admin_requests);
      setOwnersRegisterData(res?.register_requests);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compte:', error);
    }
  };

  // Si on refuse => on delete la ligne
  const handleClickRefuseOwner = async (id: number) => {
    try {
      const res = await deleteOwnerRegistration(id);
      setAdminsRegisterData(res?.admin_requests);
      setOwnersRegisterData(res?.register_requests);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du compte:', error);
    }
  };


  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <SuperAdminLayout
        user={user}
        part={t('headers.home')}
        ownersRegisterData={ownersRegisterData}
        adminsRegisterData={adminsRegisterData}
        handleClickAcceptOwner={handleClickAcceptOwner}
        handleClickRefuseOwner={handleClickRefuseOwner}
      />
    </div>
  );
};
