import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import reservations from '@assets/data/reservations.json';
import conflicts from '@assets/data/conflicts.json';
import { useUser } from '@hooks';
import { AdminBookingLayout } from '@components/templates/AdminBookingLayout';

export const AdminBookingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [reservationsData, setReservationsData] = useState(reservations);
  const [conflictsData, setConflictsData] = useState(conflicts);

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminBookingLayout
        userEmail={user?.userEmail ?? ""}
        username={user?.username ?? ""}
        organization={user?.organization ?? ""}
        part={t('navbar.admin.reservation')}
        reservationsData={reservationsData}
        conflictsData={conflictsData}
      />
    </div>
  );
};
