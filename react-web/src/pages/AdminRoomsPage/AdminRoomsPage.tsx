import React, { useState, useEffect } from 'react';
import { AdminRoomLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { addRoom, getRooms, toggleRoom, updateRoom } from '@services/AdminServices';
import { Floor } from '@pages/AdminEstablishmentPage/AdminEstablishmentPage';

type Room = {
  id: number;
  name: string;
  description: string | null;
  capacity: number;
  floor_name: string;
  room_type: string;
  status: boolean;
  photo_link: string;
  position_x: number;
  position_y: number;
}

export const AdminRoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [availableFloors, setAvailableFloors] = useState<{ id: number; name: string }[]>([]);
  const [availableFloorsMaps, setAvailableFloorsMaps] = useState<Floor[]>([]);
  const [availableTypes, setAvailableTypes] = useState<{ id: number; label: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (roomsData.length === 0) {
        const data = await getRooms();
        setRoomsData(data.locations);
        setAvailableFloors(data.available_floors);
        setAvailableFloorsMaps(data.floor_with_photo);
        setAvailableTypes(data.available_types);
      }
    };
  
    fetchData();
  }, [roomsData]);

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
    {
      name: "id_type",
      label: t("fields.common.roomtype"), 
      type: "select",
      icon: "Browser", 
      placeholder: "Description",
      options: availableTypes,
      value: selectedRoom?.room_type,
      required: true,
    },
    {
      name: "capacity",
      label: t("fields.common.capacity"),
      type: "number",
      icon: "User", 
      placeholder: "Capacité",
      value: selectedRoom?.capacity,
      required: true,
    },
    {
      name: "id_floor",
      label: t("fields.common.floor"), 
      type: "select",
      icon: "User", 
      options: availableFloors,
      value: selectedRoom?.floor_name,
      placeholder: "Étage",
      required: true,
    },
    {
      name: "photo_link",
      label: t("fields.common.establishment"), 
      type: "file",
      icon: "User",
      value: selectedRoom?.photo_link,
      required: true,
    },
  ] as InputField[];

  const listInputs2 = [
    {
      name: "map",
      label: t("fields.common.map"),
      type: "map",
      icon: "User", 
      floors : availableFloorsMaps,
      value : {position_x : selectedRoom?.position_x , position_y : selectedRoom?.position_y},
      required: true,
    }
  ] as InputField[];

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRoom(null); // Réinitialisation de la salle sélectionnée lors de la fermeture de la modale
  };

  const handleToggleRoomStatus = async (id: number, status: boolean) => {
    const res = toggleRoom(id,status);
    setRoomsData(await res);
  };

  const handleEditRoom = (id: number) => {
    const roomToEdit = roomsData.find((room) => room.id === id);
    if (roomToEdit) {
      setSelectedRoom(roomToEdit); // Pré-sélection de la salle à modifier
      handleOpenModal();
    }
  };

  const handleUpdateRoom = async (formData: FormData) => {
    if (!selectedRoom) return;
    formData.append("id", String(selectedRoom.id));    
    try {
      const res = await updateRoom(formData);
      setRoomsData(res);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRoom = async (formData: FormData) => {
    console.log("FormData avant soumission : ", Array.from(formData.entries()));
    try {
          const res = await addRoom(formData);
          setRoomsData(res);
          handleCloseModal();
      } catch (error) {
          console.error(error);
    }
  };

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminRoomLayout
        user={user}
        part={t('navbar.admin.rooms')}
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
        listInputs2={listInputs2}
        title={selectedRoom ?  t("modals.edit.room") : t("modals.create.room")}
      />
    </div>
  );
};
