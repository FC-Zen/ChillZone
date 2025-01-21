import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms';
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
  const [listInputs, setListInputs] = useState<InputField[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [floors, setFloors] = useState<Floor[]>(maps);
  const [selectedFloor, setSelectedFloor] = useState<Floor>(maps[0]);
  const [selectedCoords, setSelectedCoords] = useState<{ x: number, y: number } | null>(null);

  // Ajoutez un état pour forcer le re-rendu lors du fetch
  const [refreshKey, setRefreshKey] = useState<number>(0);

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

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleSaveForm = (formData: FormData) => {
    console.log(formData);
  };

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

  const handleMapClick = (x: number, y: number) => {
    setSelectedCoords({ x, y });
    console.log(`Coordonnées sélectionnées: X=${x}, Y=${y}`);
  };

  useEffect(() => {
    const fetchListInputsValues = async () => {
        const values = await getListInputsValues();
        setListInputsValues(values.establishment);
        setRefreshKey(prevKey => prevKey + 1);  // Force le re-rendu
    };
    fetchListInputsValues();
  }, []);

  useEffect(() => {
    console.log(listInputsValues);
    setListInputs([
      {
        name: "name",
        label: t('fields.common.last_name'),
        type: "text",
        icon: "User",
        required: true,
        value: listInputsValues?.name,
      },
      {
        name: "address",
        label: t('fields.address.address'),
        type: "text",
        icon: "User",
        required: true,
        value: listInputsValues?.address,
      },
      {
        name: "city",
        label: t('fields.address.city'),
        type: "text",
        icon: "User",
        required: true,
        value: listInputsValues?.city,
      },
      {
        name: "postalCode",
        label: t('fields.address.postal_code'),
        type: "text",
        icon: "User",
        required: true,
        value: listInputsValues?.postalCode,
      },
      {
        name: "phone",
        label: t('fields.common.phone'),
        type: "phone",
        icon: "User",
        required: true,
        value: listInputsValues?.phone,
      },
      {
        name: "mail",
        label: t('fields.common.mail'),
        type: "text",
        icon: "User",
        required: true,
        value: listInputsValues?.mail,
      },
    ]);
  }, [listInputsValues]);

  return (
    <>
      {/* Layout principal contenant le tableau */}
      <AdminEstablishmentLayout
        key={refreshKey}
        user={user}
        part={t('headers.map')}

        form={listInputs}
        addAccount={handleSaveForm}

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
        title={t('modals.create.floor')}
      />
    </>
  );
};
