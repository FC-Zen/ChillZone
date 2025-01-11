import React, { useState, useEffect } from 'react';
import { AdminRoomLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
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

  const listInputs = [
    {
      name: "name",
      label: t("fields.common.room"),
      type: "text",
      icon: "User", 
      placeholder: "Nom de la salle",
      value: selectedRoom?.name,
      required: true,
    },
    {
      name: "description",
      label: t("fields.common.description"), 
      type: "textarea",
      icon: "Browser", 
      placeholder: "Description",
      value: selectedRoom?.description,
      required: true,
    },
/*     {
      name: "type_room",
      label: t("fields.common.roomtype"), 
      type: "select",
      icon: "Browser", 
      placeholder: "Description",
      options: [
        { tag: "Box Acoustique" },
        { tag: "Salle de classe" },
      ], //TODO: Service pour prendre les tag categorie de room
      value: selectedRoom?.type_room,
      required: true,
    }, */
    {
      name: "capacity",
      label: t("fields.common.capacity"),
      type: "number",
      icon: "Users", 
      placeholder: "Capacité",
      value: selectedRoom?.capacity,
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
      value: selectedRoom?.floor_name,
      placeholder: "Étage",
      required: true,
    },
    {
      name: "RoomPicture",
      label: t("fields.common.establishment"), 
      type: "file",
      icon: "User",
      value: selectedRoom?.establishment,
      required: true,
    },
  ] as InputField[];

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
      establishment: "Établissement Alpha",
      //type_room: formData.get('type_room') as string,
      floor_name: formData.get('floor') as string,
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
      //type_room: formData.get('type_room') as string,
      establishment: "Établissement Alpha", //On prend l'établissement pris en charge par l'administrateur
      floor_name: formData.get('floor') as string,
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
