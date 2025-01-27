import React from "react";
import { OwnerSidebar, Header } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { User } from "@hooks";
import { MenuDataTable } from "@components/organisms/DataTables/MenusDataTable";

type OwnerMenusLayoutProps = {
  user : User | null;
  part: string;
  data: {
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
  }[];
  addMenuBtn: () => void;
  handleClickMenu : (id: number) => void;
};

export const OwnerMenusTemplate: React.FC<OwnerMenusLayoutProps> = ({
  user,
  part,
  data,
  handleClickMenu,
  addMenuBtn
}) => (
  <div className="Pagecontainer">
    <OwnerSidebar />

    <div className="content">
      <Header
        user={user}
        part={part}
      /> 
      
      <div className="main-content">
        <MenuDataTable 
          addMenuBtn={addMenuBtn} 
          handleClickMenu={handleClickMenu} 
          data={data} 
        />

      </div>
    </div>
  </div>
);
