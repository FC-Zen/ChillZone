import React from "react";
import { OwnerSidebar, Header } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { MealsDataTable } from "@components/organisms";

type OwnerMealsLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  data: any;
  addMealBtn: () => void;
  handleClickMeal : (id: number) => void;
  handleClickQuantity : (id: number) => void;
};

export const OwnerMealsTemplate: React.FC<OwnerMealsLayoutProps> = ({
  username,
  userEmail,
  organization,
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
        userName={username}
        userEmail={userEmail}
        organization={organization}
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
