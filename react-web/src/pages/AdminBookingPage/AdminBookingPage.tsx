import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reservations from '@assets/data/reservations.json';
import conflicts from '@assets/data/conflicts.json';
import { useUser } from '@hooks';
import { AdminBookingLayout } from '@components/templates/AdminBookingLayout';
import { getConflictsaAndReservations } from '@services/AdminServices';

export const AdminBookingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [reservationsData, setReservationsData] = useState(reservations);
  const [conflictsData, setConflictsData] = useState(conflicts);

    const fetchUserData = async () => {
      try {
        const res = await getConflictsaAndReservations(); // SERVICES
        if (res) {
          setConflictsData(res.conflicts); 
          setReservationsData(res.reservations); 
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données utilisateurs:', error);
      }
    };
  
    useEffect(() => {
      fetchUserData();
    }, []);

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminBookingLayout
        user={user}
        part={t('navbar.admin.reservation')}
        reservationsData={reservationsData}
        conflictsData={conflictsData}
      />
    </div>
  );
};
