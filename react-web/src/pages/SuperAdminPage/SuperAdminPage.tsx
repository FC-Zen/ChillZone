import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { AdminOwnerLayout } from '@components';

import restauration_places_accepted from '@assets/data/restauration_places_accepted.json';
import restauration_places_pending from '@assets/data/restauration_places_pending.json';
import { getAffiliations } from '@services/AdminServices';

export const SuperAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [restaurationPlacesAcceptedData, setRestaurationPlacesAcceptedData] = useState(restauration_places_accepted);
  const [restaurationPlacespendingData, setRestaurationPlacespendingData] = useState(restauration_places_pending);
  
  // Delete sur lieux de restauration affiliés à l’établissement
  const handleClickDelete = (id: number) => {
    setRestaurationPlacesAcceptedData((prevData) =>
      prevData.filter((place) => place.id !== id)
    );
  };

  // Demandes d'affiliation des lieux de restauration à l’établissement
  // Si on accepte => on ajoute au dessus
  const handleClickAccept = (id: number) => {
    const placeToAccept = restaurationPlacespendingData.find((place) => place.id === id);
    if (placeToAccept) {
      setRestaurationPlacesAcceptedData((prevData) => [
        ...prevData,
        { ...placeToAccept, status: true } // Ajout du statut
      ]);
      setRestaurationPlacespendingData((prevData) => prevData.filter((place) => place.id !== id));
    }
  };

  // Si on refuse => on delete al ligne
  const handleClickRefuse = (id: number) => {
    setRestaurationPlacespendingData((prevData) =>
      prevData.filter((place) => place.id !== id)
    );
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
        handleClickDelete={handleClickDelete}
        handleClickAccept={handleClickAccept}
        handleClickRefuse={handleClickRefuse}
      />
    </div>
  );
};
