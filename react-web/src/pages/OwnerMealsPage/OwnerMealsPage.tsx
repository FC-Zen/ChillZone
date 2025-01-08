import React, { useEffect, useState } from 'react';
import { OwnerMealsTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import meals from '@assets/data/meals.json';
import { AccountModal } from '@components/organisms';
import { Input } from '@components';
import { AutoCompleteInput } from '@components/molecules';

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

  const [isModalOpen, setModalOpen] = useState(false);
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

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedMeal(null);
  };

  const handleUpdateMeal = (id: number) => {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      handleOpenModal();
    }
  };

  const handleUpdateMealQuantity = (id: number) => {
    const mealToView = mealsData.find((command) => command.id === id);
    if (mealToView) {
      handleOpenModal();
    }
  };

  const addMealBtn = () => {
    handleOpenModal();
  };

  const handleAddMealBtn = () => {
    handleCloseModal();
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

    <AccountModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Création d’un compte"
          >
            <form className="flex flex-col space-y-4" onSubmit={handleAddMealBtn}>
              <AutoCompleteInput name={'tagoptions'} label={'Tags'} options={mealTags} />

              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {t('buttons.add.user')}
              </button>
            </form>
    </AccountModal>

  </>
  );
};
