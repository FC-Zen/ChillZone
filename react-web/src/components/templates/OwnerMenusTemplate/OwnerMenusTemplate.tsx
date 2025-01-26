import React from "react";
import { OwnerSidebar, Header } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { User } from "@hooks";
import { MenuDataTable } from "@components/organisms/DataTables/MenusDataTable";

type OwnerMenusLayoutProps = {
  user : User | null;
  part: string;
  data: any;
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
