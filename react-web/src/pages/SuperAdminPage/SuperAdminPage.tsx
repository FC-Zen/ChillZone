import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import owners_registration from '@assets/data/owners_registration.json';
import admins from '@assets/data/admins.json';
import { SuperAdminLayout } from '@components/templates/SuperAdminLayout';

export const SuperAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [ownersRegisterData, setOwnersRegisterData] = useState(owners_registration);
  const [usersData, setUsersData] = useState(admins);

  // Demandes d'affiliation des lieux de restauration à l’établissement
  // Si on accepte => on ajoute au dessus
  const handleClickAcceptOwner = (id: number) => {
    const ownerToAccept = ownersRegisterData.find((owner) => owner.id === id);
    if (ownerToAccept) {
      setOwnersRegisterData((prevData) => prevData.filter((owner) => owner.id !== id));
    }
  };

  // Si on refuse => on delete al ligne
  const handleClickRefuseOwner = (id: number) => {
    setOwnersRegisterData((prevData) =>
      prevData.filter((place) => place.id !== id)
    );
  };

  const handleClickAcceptAdmin = (id: number) => {
    setUsersData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, is_verified: true } : user
      )
    );
  };

  // Si on refuse => on delete al ligne
  const handleClickRefuseAdmin = (id: number) => {
    setUsersData((prevData) =>
      prevData.filter((place) => place.id !== id)
    );
  };

  // Si on refuse => on delete al ligne
  const handleClickDeleteAdmin = (id: number) => {
    setUsersData((prevData) =>
      prevData.filter((place) => place.id !== id)
    );
  };

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <SuperAdminLayout
        user={user}
        part={t('headers.home')}
        ownersRegisterData={ownersRegisterData}
        usersData={usersData}
        handleClickAcceptOwner={handleClickAcceptOwner}
        handleClickRefuseOwner={handleClickRefuseOwner}
        handleClickAcceptAdmin={handleClickAcceptAdmin}
        handleClickRefuseAdmin={handleClickRefuseAdmin}
        handleClickDeleteAdmin={handleClickDeleteAdmin}
      />
    </div>
  );
};
