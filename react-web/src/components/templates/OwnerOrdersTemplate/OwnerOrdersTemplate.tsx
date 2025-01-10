import React from "react";
import { OwnerSidebar, Header, OrdersDataTable } from "@components/organisms";
import { StatCard } from "@components/molecules";
import { User } from "@components/atoms/Icons";
import { colors } from "@theme";
import "./style.css"; // Importation du fichier CSS

type OwnerHomeLayoutProps = {
  username: string;
  userEmail: string;
  organization: string;
  part: string;
  role: string;
  statsSection: {
    commandsNow: { name: string; value: string | number };
    commandsToday: { name: string; value: string | number };
    commandsTodo: { name: string; value: string | number };
  };
  data: any;
  handleClick : (id: number) => void;
};

export const OwnerOrdersTemplate: React.FC<OwnerHomeLayoutProps> = ({
  username,
  userEmail,
  organization,
  part,
  role,
  statsSection,
  data,
  handleClick
}) => (
  <div className="Pagecontainer">
    <OwnerSidebar />

    <div className="content">
      <Header
        userName={username}
        userEmail={userEmail}
        organization={organization}
        part={part}
        role={role}
      />

      <div className="main-content">
        <div className="table-container">
          <OrdersDataTable data={data} 
          handleClick={handleClick}/>
        </div>

        <div className="stats-section">
          <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsNow.name}
            value={statsSection.commandsNow.value}
          />
          <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsToday.name}
            value={statsSection.commandsToday.value}
          />
          <StatCard
            icon={<User color={colors.white} />}
            title={statsSection.commandsTodo.name}
            value={statsSection.commandsTodo.value}
          />
        </div>
      </div>
    </div>
  </div>
);
