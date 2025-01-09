import React, { useEffect, useState } from 'react';
import { OwnerMealsTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import meals from '@assets/data/meals.json';
import { AccountModal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export const OwnerMealsPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const mealTags = [
    { tag: "Vegan" },
    { tag: "Vegetarian" },
    { tag: "Gluten-Free" },
    { tag: "Dairy-Free" },
    { tag: "Spicy" },
    { tag: "Low-Carb" },
    { tag: "High-Protein" },
    { tag: "Organic" },
    { tag: "Halal" },
    { tag: "Kosher" },
    { tag: "Seafood" }
  ]; 

    const listInputs = [
      {
        name: "meal_name",
        label: t('fields.common.last_name'),
        type: "text",
        icon: "User",
        required: true,
      },
      {
        name: "meal_description",
        label: t('fields.common.description'),
        type: "text",
        icon: "User",
        required: true,
      },
      {
        name: "meal_type",
        label: t('fields.common.type'),
        type: "text", // SELECT 
        icon: "Box",
        required: true,
      },
      {
        name: "meal_category",
        label: t('fields.common.category'),
        type: "text", // SELECT 
        icon: "Envelope",
        required: true,
      },
      {
        name: "meal_price",
        label: t('fields.common.price'),
        type: "number",
        icon: "Envelope",
        required: true,
      },
      {
        name: "meal_stock",
        label: t('fields.common.quantity'),
        type: "number",
        icon: "Envelope",
        required: true,
      },
      {
        name: "tags",
        label: t('fields.common.tags'),
        type: "autocomplete",
        icon: "Envelope",
        options: mealTags,
        required: true,
      },
      {
        name: "meal_photo",
        label: t('fields.common.file'),
        type: "file",
        icon: "Envelope",
        required: true,
      },
    ] as InputField[];
  
    const listInputsStock = [
      {
        name: t('fields.common.last_name'),
        type: "text",
        icon: "User",
        disabled: true
      },
      {
        name: t('fields.common.quantity'),
        type: "number",
        icon: "User",
        required: true,
      }
    ] as InputField[];

  const [mealsData, setMealsData] = useState(meals);

  useEffect(() => {
    const updatedMeals = mealsData.map((meal) => {
      let translatedMealType;

      switch (meal.meal_type) {
        case 'Starter':
          translatedMealType = t('categories.Starter');
          break;
        case 'Main':
          translatedMealType = t('categories.Main');
          break;
        case 'Drink':
          translatedMealType = t('categories.Drink');
          break;
        case 'Dessert':
          translatedMealType = t('categories.Dessert');
          break;
        case 'Side':
          translatedMealType = t('categories.Side');
          break;
        case 'Other':
          translatedMealType = t('categories.Other');
          break;
        default:
          translatedMealType = meal.meal_type;
          break;
      }

      return {
        ...meal,
        meal_type: translatedMealType,
      };
    });

    if (JSON.stringify(updatedMeals) !== JSON.stringify(mealsData)) {
      setMealsData(updatedMeals); // Mise à jour des données avec les types traduits
    }
  }, [mealsData, t]);

  const [openModal, setOpenModal] = useState<string | null>(null);

  const [selectedMeal, setSelectedMeal] = useState<null | {
    id : number;
    meal_name: string;
    meal_description: string;
    meal_type: string;
    meal_photo: string;
    meal_price: number;
    meal_stock: number;
    tags: { tag_id: number; tag_label: string }[];
  }>(null);

  const handleOpenModal = (modalType: string) => {
    setOpenModal(modalType);
  };

  // Fonction pour fermer la modale
  const handleCloseModal = () => {
    setOpenModal(null);
    setSelectedMeal(null);
  };

  const handleUpdateMeal = (id: number) => {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      handleOpenModal("editProduct");
    }
  };

  const handleUpdateMealQuantity = (id: number) => {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      handleOpenModal('editStock');
    }
  };

  const addMealBtn = () => {
    handleOpenModal('createProduct');
  };

  const handleAddMealBtn = (formData: FormData) => {
    console.log(Array.from(formData.entries()));

    const tagsString = formData.get("tags") as string; 
    const tagsArray = tagsString ? tagsString.split(",") : []; 
    const selectedTags = tagsArray.map((tag: string) => {
    const matchedTag = mealTags.find((mealTag) => mealTag.tag === tag);
      return {
        tag_id: matchedTag ? mealTags.indexOf(matchedTag) + 1 : 0,
        tag_label: tag,
      };
    });

    // Création d'un nouveau repas
    const newMeal = {
      id: Math.max(...mealsData.map((m) => m.id), 0) + 1, // Assure un nouvel ID unique
      meal_name: formData.get('meal_name') as string,
      meal_description: formData.get('meal_description') as string,
      meal_type: formData.get('meal_type') as string,
      meal_photo: formData.get('meal_photo') as string || '', 
      meal_price: parseFloat(formData.get('meal_price') as string) || 0,
      meal_stock: parseInt(formData.get('meal_stock') as string, 10) || 0,
      tags: selectedTags,
    };

    // Ajout du nouveau repas aux données
    setMealsData((prevData) => [...prevData, newMeal]);
    handleCloseModal();
    console.log('Nouveau repas ajouté :', newMeal);
  };

  return (
  <>
    <OwnerMealsTemplate
      userEmail={user?.userEmail ?? ""}
      username={user?.username ?? ""}
      organization={user?.organization ?? ""}
      part={t('headers.products')}

      data={mealsData}
      handleClickMeal={handleUpdateMeal}
      handleClickQuantity={handleUpdateMealQuantity}
      addMealBtn={addMealBtn}
    />
  
    {/* Modale de création de produit */}
    <AccountModal
      isOpen={openModal === 'createProduct'}
      onClose={handleCloseModal}
      title={t('modals.create.product')}
      addAccount={handleAddMealBtn}
      listInputs={listInputs}
    />

    {/*    
    <AccountModal
      isOpen={openModal === 'editProduct'}
      onClose={handleCloseModal}
      title={t('modals.edit.product')}
      addAccount={handleAddMealBtn}
      listInputs={listInputs}
    /> 
    */}

    {/* Modale d'édition du stock */}
    <AccountModal
      isOpen={openModal === 'editStock'}
      onClose={handleCloseModal}
      title={t('modals.edit.stock')}
      addAccount={handleAddMealBtn}
      listInputs={listInputsStock}
    />
  </>
  );
};
