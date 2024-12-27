import React, { useState, useEffect } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminRoomLayout } from '@components/templates'; 
import { useTranslation } from 'react-i18next';
import rooms from '@assets/data/rooms.json'; // Données des salles

export const AdminRoomsPage: React.FC = () => {
  const { t } = useTranslation();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomsData, setRoomsData] = useState(rooms);
  const [selectedRoom, setSelectedRoom] = useState<null | 
  {
    id: number;
    name: string;
    description: string;
    capacity: number;
    floor: string;
    establishment: string;
    status: boolean;
  }>(null);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null); // Réinitialisation de la salle sélectionnée lors de la fermeture de la modale
  };

  const handleEditRoom = (id: number) => {
    const roomToEdit = roomsData.find((room) => room.id === id);
    if (roomToEdit) {
      setSelectedRoom(roomToEdit); // Pré-sélection de la salle à modifier
      handleOpenModal();
    }
  };

  const handleToggleRoomStatus = (id: number, status: boolean) => {
    // Mise à jour du statut de la salle
    setRoomsData((prevData) =>
      prevData.map((room) =>
        room.id === id ? { ...room, status: status } : room
      )
    );
    console.log(`Salle avec ID ${id} mise à jour : ${status}.`);
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
      floor: formData.get('floor') as string,
      establishment: formData.get('establishment') as string,
      status: selectedRoom.status,
    };

    // Mise à jour des données de la salle
    setRoomsData((prevData) =>
      prevData.map((room) =>
        room.id === selectedRoom.id ? updatedRoom : room
      )
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
      floor: formData.get('floor') as string,
      establishment: formData.get('establishment') as string,
      status: true, // Statut par défaut 'Disponible'
    };
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
        userEmail="kellianbre@outlook.fr"
        username="Kellian Bredeau"
        organization="Université Gustave Eiffel"
        part="Salles"
        addBtn={handleOpenModal}
        deleteBtn={handleEditRoom}
        toggleBtn={handleToggleRoomStatus}
        data={roomsData}
      />

      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedRoom ? "Modification d’une salle" : "Création d’une salle"}
      >
        <form
          className="flex flex-col space-y-4"
          onSubmit={selectedRoom ? handleUpdateRoom : handleAddRoom}
        >
          <input
            className="p-2 border rounded"
            type="text"
            name="name"
            placeholder="Nom de la salle"
            defaultValue={selectedRoom?.name || ''}
            required
          />
          <textarea
            className="p-2 border rounded"
            name="description"
            placeholder="Description"
            defaultValue={selectedRoom?.description || ''}
            required
          />
          <input
            className="p-2 border rounded"
            type="number"
            name="capacity"
            placeholder="Capacité"
            defaultValue={selectedRoom?.capacity || ''}
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            name="floor"
            placeholder="Étage"
            defaultValue={selectedRoom?.floor || ''}
            required
          />
          <select
            className="p-2 border rounded"
            name="establishment"
            defaultValue={selectedRoom?.establishment || ''}
            required
          >
            <option value="">Établissement</option>
            <option value="Établissement Alpha">Établissement Alpha</option>
            <option value="Établissement Beta">Établissement Beta</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {selectedRoom ? t('buttons.actions.save') : t('buttons.add.room')}
          </button>
        </form>
      </AccountModal>
    </div>
  );
};
