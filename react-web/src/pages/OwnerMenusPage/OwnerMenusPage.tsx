import React, { useEffect, useState } from 'react';
import { OwnerMenusTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { addMenu, fetchMenus, updateMenu } from '@services/OwnerServices';

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  photo_link: string;
  price: number;
  types: {
    main: { id: number; label: string }[];
    drink: { id: number; label: string }[];
    side: { id: number; label: string }[];
    other: { id: number; label: string }[];
    starter: { id: number; label: string }[];
    dessert: { id: number; label: string }[];
  };
};


export const OwnerMenusPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [menusData, setMenusData] = useState<MenuItem[]>([]);
  const [availableOptions, setAvailableOptions] = useState<{id : number , label : string}[] | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (menusData.length === 0) {
        const res = await fetchMenus();
        setMenusData(res?.data.menus);
        setAvailableOptions(res?.data.available_options);
      }
    };
    fetchData();
  }, [menusData]);

  const listInputs = [
      {
        name: "name",
        label: t('fields.common.last_name'),
        type: "text",
        icon: "Browser",
        value: selectedMenu?.name,
        required: true,
      },
      {
        name: "description",
        label: t('fields.common.description'),
        type: "text",
        icon: "Browser",
        value: selectedMenu?.description,
        required: true,
      },
      {
        name: "price",
        label: t('fields.common.price'),
        type: "number",
        icon: "Box",
        required: true,
        value: selectedMenu?.price,
        disabled: false,
      },
      {
        name: "photo_link",
        label: t('fields.common.file'),
        type: "file",
        icon: "Box",
        value: selectedMenu?.photo_link,
        required: true,
      },
  ] as InputField[];

  const listInputs2 = [
    {
      name: "Starter",
      label: t('categories.Starter'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.starter,
      required: true,
      disabled: false,
    },
    {
      name: "Main",
      label: t('categories.Main'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.main,
      required: true,
    },
    {
      name: "Drink",
      label: t('categories.Drink'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.drink,
      required: true,
    },
    {
      name: "Dessert",
      label: t('categories.Dessert'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.dessert,
      required: true,
    },
    {
      name: "Side",
      label: t('categories.Side'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.side,
      required: true,
    },
    {
      name: "Other",
      label: t('categories.Other'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: availableOptions ?? [],
      value: selectedMenu?.types.other,
      required: true,
    },
] as InputField[];

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleNextAddModal = async (formData: FormData) => {
    try {
      const res = await addMenu(formData);
      setMenusData(res.menus);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const handleNextUpdateModal = async (formData: FormData) => {
    if (!selectedMenu) return;
    try {
      formData.append("id", String(selectedMenu.id));    
      const res = await updateMenu(formData);
      setMenusData(res.menus);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedMenu(null);
    setOpenModal(null);

  };

  const handleUpdateMeal = (id: number) => {
    const menuToView = menusData.find((x) => x.id === id);
    if (menuToView) {
      console.log(menuToView);
      setSelectedMenu(menuToView);
      handleOpenModal('editMenu');
    }
  };

  return (
    <>
      <OwnerMenusTemplate
        user={user}
        part={t('headers.menus')}
        data={menusData}
        handleClickMenu={handleUpdateMeal}
        addMenuBtn={() => handleOpenModal('createMenu')}      
      />

      {/* Modale de création de menu */}
      <Modal
        isOpen={openModal === 'createMenu'}
        onClose={handleCloseModal}
        title={t('modals.create.menu')}
        handleForm={handleNextAddModal}
        listInputs={listInputs}
        listInputs2={listInputs2}
      />

      {/* Modale de modif de menu */}
      <Modal
        isOpen={openModal === 'editMenu'}
        onClose={handleCloseModal}
        title={t('modals.edit.menu')}
        handleForm={handleNextUpdateModal}
        listInputs={listInputs}
        listInputs2={listInputs2}
      />
    </>
  );
};