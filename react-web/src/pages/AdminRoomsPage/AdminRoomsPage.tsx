import React, { useState, useEffect } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminRoomLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { getRooms } from '@services/AdminServices';

type Room = {
  id: number;
  name: string;
  description: string | null;
  capacity: number;
  floor_name: string;
  establishment: string;
  status: boolean;
}

export const AdminRoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomsData, setRoomsData] = useState<Room[]>([]);

    useEffect(() => {
    const fetchData = async () => {
      const data = await getRooms();
      setRoomsData(data);
    };

    fetchData();
  }, []);

  const [selectedRoom, setSelectedRoom] = useState<null | Room>(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null); // Réinitialisation de la salle sélectionnée lors de la fermeture de la modale
  };

  const handleToggleRoomStatus = (id: number, status: boolean) => {
    // Mise à jour du statut de la salle
    const roomToEdit = roomsData.find((room) => room.id === id);
    if (roomToEdit) {
      /*       const updatedRoom = {
        id: roomToEdit.id,
        name: roomToEdit.name,
        description: roomToEdit.description,
        capacity: roomToEdit.capacity,
        floor: roomToEdit.floor,
        establishment: roomToEdit.establishment,
        status: status
      }; */
      // Service à mettre ici
      setRoomsData((prevData) =>
        prevData.map((room) =>
          room.id === id ? { ...room, status: status } : room
        )
      );
      console.log(`Salle avec ID ${id} mise à jour : ${status}.`);
    }
  };

  const handleEditRoom = (id: number) => {
    const roomToEdit = roomsData.find((room) => room.id === id);
    if (roomToEdit) {
      setSelectedRoom(roomToEdit); // Pré-sélection de la salle à modifier
      handleOpenModal();
    }
  };

  const handleUpdateRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRoom) return;

    const formData = new FormData(event.currentTarget);
    const updatedRoom = {
      id: selectedRoom.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      capacity: parseInt(formData.get('capacity') as string, 10),
      floor_name: formData.get('floor') as string,
      establishment: formData.get('establishment') as string,
      status: selectedRoom.status,
    };

    // Mise à jour des données de la salle
    // Service à mettre ici
    // Simulation à la place
    setRoomsData((prevData) =>
      prevData.map((room) => (room.id === selectedRoom.id ? updatedRoom : room))
    );

    handleCloseModal(); // Fermeture de la modale après la mise à jour
    console.log('Salle mise à jour :', updatedRoom);
  };

  const handleAddRoom = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRoom = {
      id: Math.max(...roomsData.map((r) => r.id)) + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      capacity: parseInt(formData.get('capacity') as string, 10),
      floor_name: formData.get('floor') as string,
      establishment: formData.get('establishment') as string,
      status: true, // Statut par défaut 'Disponible'
    };
    // Service à mettre ici
    // Simulation à la place
    setRoomsData((prevData) => [...prevData, newRoom]);
    handleCloseModal();
    console.log('Nouvelle salle ajoutée :', newRoom);
  };

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
        role={user?.role ?? ""}
        addBtn={handleOpenModal}
        deleteBtn={handleEditRoom}
        toggleBtn={handleToggleRoomStatus}
        data={roomsData}
      />

    </div>
  );
};
