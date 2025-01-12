import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms'; // Composant de modale
import { AdminEstablishmentLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import maps from '@assets/data/maps.json';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { getListInputsValues } from '@services/AdminServices';

export type Floor = {
    floor_id: number;
    floor_number: number;
    floor_name: string;
    floor_plan: string;
}

export const AdminEstablishmentPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const [listInputsValues, setListInputsValues] = useState<Record<string, string>>({});

  const listInputs = [
    {
      name: "name",
      label: t('fields.common.last_name'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "address",
      label: t('fields.address.address'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "city",
      label: t('fields.address.city'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "postal_code",
      label: t('fields.address.postal_code'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "phone",
      label: t('fields.common.phone'),
      type: "phone",
      icon: "User",
      required: true,
    },
    {
      name: "email",
      label: t('fields.common.mail'),
      type: "text",
      icon: "User",
      required: true,
    },
  ] as InputField[];

  const modalInputs = [
    {
      name: "number",
      label: t('fields.map_floor.number'),
      type: "text",
      icon: "Box",
      required: true,
    },
    {
      name: "name",
      label: t('fields.map_floor.name'),
      type: "text",
      icon: "Box",
      required: true,
    },
    {
      name: "file",
      label: t('fields.common.file'),
      type: "file",
      icon: "User",
      required: true,
    }
  ] as InputField[];

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveForm = (formData: FormData) => {
    console.log(formData);
  };

  const [floors, setFloors] = useState<Floor[]>(maps);
  const [selectedFloor, setSelectedFloor] = useState<Floor>(maps[0]);

  const handleFloorClick = (id: number) => {
    const floor = floors.find(f => f.floor_id === id);
    if (floor) {
      setSelectedFloor(floor);
      console.log('Floor selected:', floor);
    }
  };

  const handleAddFloorClick = () => {
    console.log("Add");
    handleOpenModal();
  };

  const [selectedCoords, setSelectedCoords] = useState<{ x: number, y: number } | null>(null);

  const handleMapClick = (x: number, y: number) => {
    setSelectedCoords({ x, y });
    console.log(`Coordonnées sélectionnées: X=${x}, Y=${y}`);
  };

  useEffect(() => {
    const fetchListInputsValues = async () => {
        const values = await getListInputsValues();
        setListInputsValues(values);
    };
    fetchListInputsValues();
}, []);

  return (
    <>
      {/* Layout principal contenant le tableau */}
      <AdminEstablishmentLayout
        userEmail={user?.userEmail ?? ""}
        username={user?.username ?? ""}
        organization={user?.organization ?? ""}
        part={t('headers.map')}
        role={user?.role ?? ""}

        form={listInputs}
        addAccount={handleSaveForm}
        formvalues={listInputsValues}

        mapName={selectedFloor?.floor_name}
        mapImageSrc={selectedFloor?.floor_plan}  
        onMapClick={handleMapClick} 

        floors={floors}
        selectedFloor={selectedFloor}
        handleFloorClick={handleFloorClick}
        handleAddFloorClick={handleAddFloorClick}
        />

      {/* Modale pour la création d’un étage */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleForm={handleCloseModal}
        listInputs={modalInputs}
        title={t('modals.create.floor')
        }
      />
    </>
  );
};
