import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms';
import { AdminEstablishmentLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { getAdminInfo, getAdminMap, updateAdminInfo } from '@services/AdminServices';


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
  const [floors, setFloors] = useState<Floor[]>([]);
  const [selectedFloor, setSelectedFloor] = useState<Floor | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<{ x: number, y: number } | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);

  // Ajoutez un état pour forcer le re-rendu lors du fetch
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const modalInputs = [
    {
      name: "number",
      label: t('fields.map_floor.number'),
      type: "number",
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

  const modalInputsWithValues = [
    {
      name: "number",
      label: t('fields.map_floor.number'),
      type: "number",
      icon: "Box",
      value: selectedFloor?.number ?? 4,
      required: true,
    },
    {
      name: "name",
      label: t('fields.map_floor.name'),
      type: "text",
      icon: "Box",
      value: selectedFloor?.name,
      required: true,
    },
    {
      name: "file",
      label: t('fields.common.file'),
      type: "file",
      icon: "User",
      value: selectedFloor?.photo_link,
      required: true,
    }
  ] as InputField[];

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleSaveForm = async (formData: FormData) => {
    console.log(formData);
    const postalCode = formData.get("postalcode");
    try {
      if (postalCode !== null) {
        formData.append("postalCode", postalCode);
        formData.delete("postalcode");
      }
      const res = await updateAdminInfo(formData);
      setListInputsValues(res.establishment);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations d'établissement :", error);
    }
  };

  const handleFloorClick = (id: number) => {
    const floor = floors.find(f => f.id === id);
    if (floor) {
      setSelectedFloor(floor);
      console.log('Floor selected:', floor);
    }
  };

  const handleAddFloorClick = () => {
    handleOpenModal("createFloor");
  };

  const handleChangeFloorClick = () => {
    handleOpenModal("updateFloor");
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
        onSubmit={handleSaveForm}

        mapName={selectedFloor?.name ?? "undefined"}
        onMapClick={handleMapClick} 

        floors={floors}
        selectedFloor={selectedFloor}
        handleFloorClick={handleFloorClick}
        handleAddFloorClick={handleAddFloorClick}
        handleChangeFloorClick={handleChangeFloorClick}
      />

      {/* Modale pour la création d’un étage */}
      <Modal
        isOpen={openModal === 'createFloor'}
        onClose={handleCloseModal}
        handleForm={handleCloseModal}
        listInputs={modalInputs}
        title={t('modals.create.floor')}
      />

      <Modal
        isOpen={openModal === 'updateFloor'}
        onClose={handleCloseModal}
        handleForm={handleCloseModal}
        listInputs={modalInputsWithValues}
        title={t('modals.create.floor')}
      />
    </>
  );
};
