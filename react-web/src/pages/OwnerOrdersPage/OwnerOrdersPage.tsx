import React, { useState } from 'react';
import { OwnerOrdersTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import commands from '@assets/data/commands.json';

export const OwnerOrdersPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState({
    commandsNow : { name: t('dashboard.info.commandsNow'), value: "8" },
    commandsToday : { name: t('dashboard.info.commandsToday'), value: "18" },
    commandsTodo : { name: t('dashboard.info.commandsTodo'), value: "28" }
  });
  
  const [commandsData, setCommandsData] = useState(commands);

  return (
    <OwnerOrdersTemplate
      userEmail={user?.userEmail ?? ""}
      username={user?.username ?? ""}
      organization={user?.organization ?? ""}
      part={t('navbar.owner.commands')}

      statsSection={stats}
      data={commandsData}
    />

  );
};
