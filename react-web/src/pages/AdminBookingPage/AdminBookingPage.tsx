import React, { useState, useEffect } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminRoomLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import rooms from '@assets/data/rooms.json'; // Données des salles
import { useUser } from '@hooks';

export const AdminBookingPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [roomsData, setRoomsData] = useState(rooms);

  useEffect(() => {
    console.log('Les données des salles ont été mises à jour :', roomsData);
  }, [roomsData]);

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminRoomLayout
        userEmail={user?.userEmail ?? ""}
        username={user?.username ?? ""}
        organization={user?.organization ?? ""}
        part={t('navbar.admin.rooms')}
        addBtn={handleOpenModal}
        deleteBtn={handleEditRoom}
        toggleBtn={handleToggleRoomStatus}
        data={roomsData}
      />
    </div>
  );
};
