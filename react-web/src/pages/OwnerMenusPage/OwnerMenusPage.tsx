import React, { useState } from 'react';
import { OwnerMenusTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import menus from '@assets/data/menus.json';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export const OwnerMenusPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menusData, setMenusData] = useState(menus);
  const [openModal, setOpenModal] = useState<string | null>(null);

  const listInputs = [
      {
        name: "menu_name",
        label: t('fields.common.last_name'),
        type: "text",
        icon: "Browser",
        required: true,
      },
      {
        name: "menu_description",
        label: t('fields.common.description'),
        type: "text",
        icon: "Browser",
        required: true,
      },
      {
        name: "menu_price",
        label: t('fields.common.price'),
        type: "text", // SELECT 
        icon: "Box",
        required: true,
      },
      {
        name: "meal_photo",
        label: t('fields.common.file'),
        type: "file",
        icon: "Box",
        required: true,
      },
  ] as InputField[];


  const mealTags = [
    { tag_id: 1, tag_label: "Vegan" },
    { tag_id: 2, tag_label: "Vegetarian" },
    { tag_id: 3, tag_label: "Gluten-Free" },
    { tag_id: 4, tag_label: "Dairy-Free" },
    { tag_id: 5, tag_label: "Spicy" },
    { tag_id: 6, tag_label: "Low-Carb" },
    { tag_id: 7, tag_label: "High-Protein" },
    { tag_id: 8, tag_label: "Organic" },
    { tag_id: 9, tag_label: "Halal" },
    { tag_id: 10, tag_label: "Kosher" },
    { tag_id: 11, tag_label: "Seafood" }
  ];  


  const listInputs2 = [
    {
      name: "Starters",
      label: t('categories.Starter'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "Main",
      label: t('categories.Main'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "Drink",
      label: t('categories.Drink'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "Dessert",
      label: t('categories.Dessert'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "Side",
      label: t('categories.Side'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "Other",
      label: t('categories.Other'),
      type: "autocomplete",
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
] as InputField[];

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleNextAddModal = () => {
    setOpenModal('createMenuPart2');
  };

  const handleNextUpdateModal = () => {
    setOpenModal('editMenuPart2');
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedMenu(null);
  };

  const handleUpdateMeal = (id: number) => {
    console.log(`Updating meal with ID: ${id}`);
    setOpenModal('editMenu');
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
        handleForm={handleNextAddModal}
        listInputs={listInputs}
        listInputs2={listInputs2}
      />
    </>
  );
};