import React, { useEffect, useState } from 'react';
import { OwnerMealsTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import meals from '@assets/data/meals.json';
import { Modal } from '@components/organisms';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export const OwnerMealsPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

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

    const listInputs = [
      {
        name: "meal_name",
        label: t('fields.common.last_name'),
        type: "text",
        value : selectedMeal?.meal_name,
        icon: "Browser",
        required: true,
      },
      {
        name: "meal_description",
        label: t('fields.common.description'),
        type: "text",
        value : selectedMeal?.meal_description,
        icon: "Browser",
        required: true,
      },
      {
        name: "meal_type",
        label: t('fields.common.type'),
        type: "text", // SELECT 
        value : selectedMeal?.meal_type,
        icon: "Box",
        required: true,
      },
      /* {
        name: "meal_category",
        label: t('fields.common.category'),
        type: "text", // SELECT POUR LES MENUS
        value : selectedMeal?.meal_category,
        icon: "Box",
        required: true,
      }, */
      {
        name: "meal_price",
        label: t('fields.common.price'),
        type: "number",
        value : selectedMeal?.meal_price,
        step: "0.01",
        icon: "Box",
        required: true,
      },
      {
        name: "meal_stock",
        label: t('fields.common.quantity'),
        type: "number",
        value : selectedMeal?.meal_stock,
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
        name: "meal_photo",
        label: t('fields.common.file'),
        type: "file",
        icon: "Box",
        required: true,
      },
    ] as InputField[];
  
    const listInputsStock = [
      {
        name: "quantity",
        label: t('fields.common.quantity'),
        type: "number",
        icon: "User",
        value : selectedMeal?.meal_stock,
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
      setSelectedMeal(mealToView);
      handleOpenModal("editProduct");
    }
  };

  const handleUpdateMealbyForm = (formData: FormData) => {
    const mealId = selectedMeal?.id; // Récupère l'ID du repas à partir des données du formulaire
    if (!mealId) {
      console.error("ID du repas introuvable !");
      return;
    }
    console.log("FORM UPDATE :",Array.from(formData.entries()));
    const tags = formData.get("tags");
    console.log(tags);
    if (typeof tags === "string") {
      try {
        const parsedTags = JSON.parse(tags); // Convertit la string JSON en objet
        console.log("Tags récupérés :", parsedTags);
        // Mise à jour du repas dans mealsData
        setMealsData((prevData) =>
          prevData.map((meal) =>
            meal.id === mealId
              ? {
                  ...meal,
                  meal_name: formData.get('meal_name') as string,
                  meal_description: formData.get('meal_description') as string,
                  meal_type: formData.get('meal_type') as string,
                  meal_photo: formData.get('meal_photo') as string || '',
                  meal_price: parseFloat(formData.get('meal_price') as string) || 0,
                  meal_stock: parseInt(formData.get('meal_stock') as string, 10) || 0,
                  tags: parsedTags,
                }
              : meal
          )
        );
      } catch (error) {
        console.error("Erreur lors du parsing des tags :", error);
      }
    } else {
      setMealsData((prevData) =>
        prevData.map((meal) =>
          meal.id === mealId
            ? {
                ...meal,
                meal_name: formData.get('meal_name') as string,
                meal_description: formData.get('meal_description') as string,
                meal_type: formData.get('meal_type') as string,
                meal_photo: formData.get('meal_photo') as string || '',
                meal_price: parseFloat(formData.get('meal_price') as string) || 0,
                meal_stock: parseInt(formData.get('meal_stock') as string, 10) || 0,
                tags: [],
              }
            : meal
        )
      );
    }
  
    handleCloseModal();
    console.log(`Repas mis à jour avec ID ${mealId}`);
  };

  const handleUpdateMealQuantity = (id: number) => {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      setSelectedMeal(mealToView);
      handleOpenModal('editStock');
    }
  };

  const handleUpdateMealQuantityByForm = (formData: FormData) => {
    const mealId = selectedMeal?.id; // Récupère l'ID du repas
    if (!mealId) {
      console.error("ID du repas introuvable !");
      return;
    }
  
    const updatedStock = parseInt(formData.get('quantity') as string, 10) || 0; // Récupère la nouvelle quantité
  
    // Mise à jour de la quantité dans mealsData
    setMealsData((prevData) =>
      prevData.map((meal) =>
        meal.id === mealId
          ? {
              ...meal,
              meal_stock: updatedStock, // Met à jour uniquement le stock
            }
          : meal
      )
    );
  
    handleCloseModal();
    console.log(`Quantité mise à jour pour le repas ID ${mealId} : ${updatedStock}`);
  };

  const addMealBtn = () => {
    handleOpenModal('createProduct');
  };

  const handleAddMealBtn = (formData: FormData) => {
    console.log(Array.from(formData.entries()));

    const tags = formData.get("tags") as string; 

    // Création d'un nouveau repas
    const newMeal = {
      id: Math.max(...mealsData.map((m) => m.id), 0) + 1, // Assure un nouvel ID unique
      meal_name: formData.get('meal_name') as string,
      meal_description: formData.get('meal_description') as string,
      meal_type: formData.get('meal_type') as string,
      meal_photo: formData.get('meal_photo') as string || '', 
      meal_price: parseFloat(formData.get('meal_price') as string) || 0,
      meal_stock: parseInt(formData.get('meal_stock') as string, 10) || 0,
      tags: []
    };

    if (typeof tags === "string") {
      try {
        const parsedTags = JSON.parse(tags); // Convertit la string JSON en tableau ou objet
        console.log("Tags récupérés :", parsedTags);
        newMeal.tags = parsedTags; // Ajoute les tags analysés au nouvel objet
      } catch (error) {
        console.error("Erreur lors du parsing des tags :", error);
        newMeal.tags = []; // Définit des tags par défaut en cas d'erreur
      }
    } else {
      newMeal.tags = []; // Définit des tags par défaut si `tags` n'est pas une chaîne valide
    }

    // Ajout du nouveau repas aux données
    setMealsData((prevData) => [...prevData, newMeal]);
    handleCloseModal();
    console.log('Nouveau repas ajouté :', newMeal);
  };

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
