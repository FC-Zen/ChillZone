import React from "react";
import { OwnerSidebar, Header } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { MealsDataTable } from "@components/organisms";
import { User } from "@hooks";

type OwnerMealsLayoutProps = {
  user : User;
  part: string;
  data: any;
  addMealBtn: () => void;
  handleClickMeal : (id: number) => void;
  handleClickQuantity : (id: number) => void;
};

export const OwnerMealsTemplate: React.FC<OwnerMealsLayoutProps> = ({
  user,
  part,
  data,
  handleClickMeal,
  handleClickQuantity,
  addMealBtn
}) => (
  <div className="Pagecontainer">
    <OwnerSidebar />

    <div className="content">
      <Header
        user={user}
        part={part}
      />

      <div className="main-content">
          <MealsDataTable 
          data={data} 
          handleClickMeal={handleClickMeal}
          handleClickQuantity={handleClickQuantity}
          addMealBtn={addMealBtn}
          />
      </div>
    </div>
  </div>
);
