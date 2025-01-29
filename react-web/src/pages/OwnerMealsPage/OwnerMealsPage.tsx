import React, { useEffect, useState } from 'react';
import { OwnerMealsTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { addMeal, fetchMeals, updateMeal } from '@services/OwnerServices';


export type Meal = {
  id: number;
  name: string;
  description: string;
  category: string;
  photo_link: string;
  price: number;
  stock: number;
  tags: { id: number; label: string }[];
};

export const OwnerMealsPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const [mealsData, setMealsData] = useState<Meal[]>([]);
  const [mealTags, setMealTags] = useState<null | { id: number; label: string }[]>(null);
  const [mealCategories, setMealCategories] = useState<null | { id: number; label: string }[]>(null);
  const [selectedMeal, setSelectedMeal] = useState<null | Meal>(null);

  const listInputs = [
    {
      name: "name",
      label: t('fields.common.last_name'),
      type: "text",
      value : selectedMeal?.name,
      icon: "Browser",
      required: true,
    },
    {
      name: "description",
      label: t('fields.common.description'),
      type: "text",
      value : selectedMeal?.description,
      icon: "Browser",
      required: true,
    },
    {
      name: "category",
      label: t('fields.common.category'),
      type: "select", // SELECT 
      value : selectedMeal?.category,
      options : mealCategories,
      icon: "Box",
      required: true,
    },
    {
      name: "price",
      label: t('fields.common.price'),
      type: "number",
      value : selectedMeal?.price,
      step: "0.01",
      icon: "Box",
      required: true,
    },
    {
      name: "stock",
      label: t('fields.common.quantity'),
      type: "number",
      value : selectedMeal?.stock,
      icon: "Box",
      required: true,
    },
    {
      name: "tags",
      label: t('fields.common.tag'),
      type: "autocomplete",
      value : selectedMeal?.tags,
      icon: "Box",
      optionsTags: mealTags,
      required: true,
    },
    {
      name: "photo_link",
      label: t('fields.common.file'),
      type: "file",
      value : selectedMeal?.photo_link,
      icon: "Box",
      required: true,
    },
  ] as InputField[];

  const listInputsStock = [
    {
      name: "stock",
      label: t('fields.common.quantity'),
      type: "number",
      icon: "User",
      value : selectedMeal?.stock,
      required: true,
    }
  ] as InputField[];
  
  const fetchUserData = async () => {
    try {
      const res = await fetchMeals(); // SERVICES
      if (res) {
        setMealsData(res.meals); 
        setMealTags(res.available_tags); 
        setMealCategories(res.available_categories);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


 //  --------------------------------- MODALES ---------------------------------------------
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedMeal(null);
  };

  const addMealBtn = () => {
    handleOpenModal('createProduct');
  };

  const handleUpdateMeal = (id: number) => {
    if (mealsData) {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      setSelectedMeal(mealToView);
      handleOpenModal("editProduct");
    }
    }
  };

  const handleUpdateMealQuantity = (id: number) => {
    if (mealsData) {
      const mealToView = mealsData.find((command) => command.id === id);
      if (mealToView) {
        setSelectedMeal(mealToView);
        handleOpenModal('editStock');
      }
    }
  };

  //  --------------------------------- FIN MODALES  ---------------------------------------------

    
  //  --------------------------------- BTN CRUD  ---------------------------------------------

  const handleUpdateMealbyForm = async (formData: FormData) => {
    if (!selectedMeal) return;
    try {
      formData.append("id", String(selectedMeal.id));    
      const res = await updateMeal(formData);
      setMealsData(res.meals);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const handleUpdateMealQuantityByForm = async (formData: FormData) => {
    if (!selectedMeal) return;
    try {
      formData.append("id", String(selectedMeal.id));        
      const res = await updateMeal(formData);
      setMealsData(res.meals);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  const handleAddMealBtn = async (formData: FormData) => {
    try {
      const res = await addMeal(formData);
      setMealsData(res.meals);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };

  //  --------------------------------- FIN BTN CRUDS  ---------------------------------------------

  return (
  <>
    <OwnerMealsTemplate
      user={user}
      part={t('headers.products')}
      data={mealsData}
      handleClickMeal={handleUpdateMeal}
      handleClickQuantity={handleUpdateMealQuantity}
      addMealBtn={addMealBtn}
    />
  
    {/* Modale de création de produit */}
    <Modal
      isOpen={openModal === 'createProduct'}
      onClose={handleCloseModal}
      title={t('modals.create.product')}
      handleForm={handleAddMealBtn}
      listInputs={listInputs}
    />

    {/* Modale d'édition du produit */}
    <Modal
      isOpen={openModal === 'editProduct'}
      onClose={handleCloseModal}
      title={t('modals.edit.stock')}
      handleForm={handleUpdateMealbyForm}
      listInputs={listInputs}
    /> 

    {/* Modale d'édition du stock */}
    <Modal
      isOpen={openModal === 'editStock'}
      onClose={handleCloseModal}
      title={t('modals.edit.stock')}
      handleForm={handleUpdateMealQuantityByForm}
      listInputs={listInputsStock}
    />
  </>
  );
};
