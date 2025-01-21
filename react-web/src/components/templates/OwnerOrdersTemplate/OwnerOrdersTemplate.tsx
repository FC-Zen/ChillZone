import React from "react";
import { OwnerSidebar, Header, OrdersDataTable } from "@components/organisms";
import { StatCard } from "@components/molecules";
import { colors } from "@theme";
import "./style.css"; // Importation du fichier CSS
import { User } from "@hooks";

type OwnerHomeLayoutProps = {
  user : User;
  part: string;
  statsSection: {
    commandsNow: { name: string; value: string | number };
    commandsToday: { name: string; value: string | number };
    commandsTodo: { name: string; value: string | number };
  };
  data: any;
  handleClick : (id: number) => void;
};

export const OwnerOrdersTemplate: React.FC<OwnerHomeLayoutProps> = ({
  user,
  part,
  statsSection,
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
        <div className="table-container">
          <OrdersDataTable data={data} 
          handleClick={handleClick}/>
        </div>

        <div className="stats-section">
          <StatCard
            icon='User'
            title={statsSection.commandsNow.name}
            value={statsSection.commandsNow.value}
          />
          <StatCard
            icon='User'
            title={statsSection.commandsToday.name}
            value={statsSection.commandsToday.value}
          />
          <StatCard
            icon='User'
            title={statsSection.commandsTodo.name}
            value={statsSection.commandsTodo.value}
          />
        </div>
      </div>
    </div>
  </div>
);
