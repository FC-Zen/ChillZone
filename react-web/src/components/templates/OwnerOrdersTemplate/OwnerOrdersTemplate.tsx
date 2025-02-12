import React from "react";
import { OwnerSidebar, Header, OrdersDataTable } from "@components/organisms";
import "./style.css"; // Importation du fichier CSS
import { User } from "@hooks";
import { Command } from "@pages/OwnerOrdersPage/OwnerOrdersPage";

type OwnerHomeLayoutProps = {
  user : User | null;
  part: string;
  data: Command[];
  handleClick : (id: number) => void;
};

export const OwnerOrdersTemplate: React.FC<OwnerHomeLayoutProps> = ({
  user,
  part,
  data,
  handleClick
}) => (
  <div className="Pagecontainer">
    <OwnerSidebar />

    <div className="content">
      <Header
        user={user}
        part={part}
      />

      <div className="main-content">
          <OrdersDataTable data={data} 
          handleClick={handleClick}/>
      </div>
    </div>
  </div>
);
