import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { AdminOwnerLayout } from '@components';
import { acceptAffiliations, deleteAffiliations, getAffiliations } from '@services/AdminServices';

export type restaurationPlacesPending = {
  id: number;
  name : string; 
  type : string; 
  location: string;
  phone: string;
};

export type restaurationPlacesAccepted = {
  id: number;
  name: string;
  type: string;
  location: string;
  phone: string;
  status: boolean;
};

export const AdminOwnerPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [restaurationPlacesAcceptedData, setRestaurationPlacesAcceptedData] = useState<restaurationPlacesAccepted[]>([]);
  const [restaurationPlacespendingData, setRestaurationPlacespendingData] = useState<restaurationPlacesPending[]>([]);

  // Demandes d'affiliation des lieux de restauration à l’établissement
  // Si on accepte => on ajoute au dessus
  const handleClickAccept = async (id: number) => {
    const res = await acceptAffiliations(id);
    setRestaurationPlacesAcceptedData(res.confirmed_restaurants);
    setRestaurationPlacespendingData(res.pending_restaurants);
  };

  // Si on refuse => on delete la ligne
  const handleClickRefuse = async (id: number) => {
    const res = await deleteAffiliations(id);
    setRestaurationPlacesAcceptedData(res.confirmed_restaurants);
    setRestaurationPlacespendingData(res.pending_restaurants);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
        const res = await getAffiliations();
        setRestaurationPlacesAcceptedData(res.confirmed_restaurants);
        setRestaurationPlacespendingData(res.pending_restaurants);
    };
    fetchRestaurants();
  }, []);

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminOwnerLayout
        user={user}
        part={t('headers.affiliates')}
        restaurationPlacesAcceptedData={restaurationPlacesAcceptedData}
        restaurationPlacespendingData={restaurationPlacespendingData}
        handleClickDelete={handleClickRefuse}
        handleClickAccept={handleClickAccept}
        handleClickRefuse={handleClickRefuse}
      />
    </div>
  );
};
