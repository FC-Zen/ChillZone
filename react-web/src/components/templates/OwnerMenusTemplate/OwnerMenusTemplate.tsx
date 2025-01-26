import React from "react";
import { OwnerSidebar, Header } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { User } from "@hooks";

type OwnerMenusLayoutProps = {
  user : User | null;
  part: string;
  data: any;
  addMealBtn: () => void;
  handleClickMeal : (id: number) => void;
  handleClickQuantity : (id: number) => void;
};

export const OwnerMenusTemplate: React.FC<OwnerMenusLayoutProps> = ({
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
      </div>
    </div>
  </div>
);
