import React, { useState, useEffect } from 'react';
import { AdminRoomLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import rooms from '@assets/data/rooms.json'; // Données des salles
import { useUser } from '@hooks';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export const AdminRoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const listInputs = [
    {
      name: "name",
      label: t("fields.common.room"),
      type: "text",
      icon: "User", 
      placeholder: "Nom de la salle",
      required: true,
    },
    {
      name: "description",
      label: t("fields.common.description"), 
      type: "textarea",
      icon: "Browser", 
      placeholder: "Description",
      required: true,
    },
    {
      name: "type_room",
      label: t("fields.common.roomtype"), 
      type: "select",
      icon: "Browser", 
      placeholder: "Description",
      options: [
        { tag: "Box Acoustique" },
        { tag: "Salle de classe" },
      ], //TODO: Service pour prendre les tag categorie de room
      required: true,
    },
    {
      name: "capacity",
      label: t("fields.common.capacity"),
      type: "number",
      icon: "Users", 
      placeholder: "Capacité",
      required: true,
    },
    {
      name: "floor",
      label: t("fields.common.floor"), 
      type: "select",
      icon: "User", 
      options: [
        { tag: "RDC" },
        { tag: "1er étage" },
        { tag: "2ème étage" },
      ], //TODO: Service pour prendre les étages
      placeholder: "Étage",
      required: true,
    },
    {
      name: "RoomPicture",
      label: t("fields.common.establishment"), 
      type: "file",
      icon: "User",
      required: true,
    },
  ] as InputField[];
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomsData, setRoomsData] = useState(rooms);
  const [selectedRoom, setSelectedRoom] = useState<null | {
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

  const handleUpdateRoom = (formData: FormData) => {
    if (!selectedRoom) return;

    const updatedRoom = {
      id: selectedRoom.id,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      capacity: parseInt(formData.get('capacity') as string, 10),
      floor: formData.get('floor')?.slice(0,1).toString() as string,
      establishment: "Établissement Alpha",
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

  const handleAddRoom = (formData: FormData) => {
    const newRoom = {
      id: Math.max(...roomsData.map((r) => r.id)) + 1,
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      capacity: parseInt(formData.get('capacity') as string, 10),
      floor: formData.get('floor') as string,
      establishment: "Établissement Alpha", //On prend l'établissement pris en charge par l'administrateur
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

      <Modal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleForm={selectedRoom ? handleUpdateRoom : handleAddRoom}
        listInputs={listInputs}
        title={selectedRoom ?  t("modals.edit.room") : t("modals.create.room")}
      />
    </div>
  );
};
