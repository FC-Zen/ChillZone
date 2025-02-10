import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms';
import { AdminEstablishmentLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { getAdminInfo, getAdminMap } from '@services/AdminServices';


export type Floor = {
    id: number;
    number: number;
    name: string;
    photo_link: string;
    locations : MapLocation[];
}

export type MapLocation = {
  id: number;
  name: string;
  description: string;
  capacity: number;
  status: boolean;
  photo_link: string | null;
  position_x: number;
  position_y: number;
};


export const AdminEstablishmentPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const [listInputsValues, setListInputsValues] = useState<Record<string, string>>({});
  const [listInputs, setListInputs] = useState<InputField[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [floors, setFloors] = useState<Floor[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
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
    const floor = floors.find(f => f.id === id);
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
    const fetchEstablishmentInfo = async () => {
      try {
        const establishment = await getAdminInfo();
        setListInputsValues(establishment.establishment);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations d'établissement :", error);
      }
    };
  
    const fetchMapInfo = async () => {
      try {
        const map = await getAdminMap();
        setFloors(map.floors);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations de la carte :", error);
      }
    };
  
    const fetchData = async () => {
      await fetchEstablishmentInfo();
      await fetchMapInfo();
      setSelectedFloor(floors[0]);
      setRefreshKey((prevKey) => prevKey + 1); // Force le re-rendu
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    console.log(floors);
    if (floors.length > 0) {
        setSelectedFloor(floors[0]); // Sélectionne le premier étage lorsque les données sont disponibles
        console.log(floors, floors[0]);
      }
  }, [floors]);
  

  useEffect(() => {
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
        type: "text",
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

        mapName={selectedFloor?.name ?? "undefined"}
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
