import React, { useEffect, useState } from 'react';
import { OwnerOrdersTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import commands from '@assets/data/commands.json';
import { CommandModal } from '@components/organisms';

export const OwnerOrdersPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState({
    commandsNow : { name: t('dashboard.info.commandsNow'), value: "8" },
    commandsToday : { name: t('dashboard.info.commandsToday'), value: "18" },
    commandsTodo : { name: t('dashboard.info.commandsTodo'), value: "28" }
  });
  
  const [commandsData, setCommandsData] = useState(commands);

  useEffect(() => {
    const updatedCommands = commandsData.map((command) => ({
      ...command,
      command_status: 
        command.command_status === "In progress" ? t('status.in_progress') : 
        command.command_status === "Ready" ? t('status.ready') : 
        command.command_status === "Completed" ? t('status.Completed') : 
        command.command_status
    }));
  
    if (JSON.stringify(updatedCommands) !== JSON.stringify(commandsData)) {
      setCommandsData(updatedCommands);
    }
  }, [commandsData, t]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<null | {
    id: number;
    user_name: string;
    command_status: string;
    creation_date: string;
    total_amount: number;
    pickup_time: string;
    final_pickup_time: string;
    lines: { line_id: number; quantity: number; meal_name: string; menu_name: string; }[];
  }>(null);

  const handleOpenModal = () => setModalOpen(true);

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCommand(null);
  };

  const handleViewCommand = (id: number) => {
    const commandToView = commandsData.find((command) => command.id === id);
    if (commandToView) {
      setSelectedCommand(commandToView);
      handleOpenModal();
    }
  };

  const changeState = (id : number, currentStatus: string) => {
    let newStatus: string;
    if (currentStatus === t('status.in_progress')) {
      newStatus = t('status.ready');
    } else if (currentStatus === t('status.ready')) {
      newStatus = t('status.Completed');
    } else {
      newStatus = currentStatus;
    }
    setCommandsData((prevData) =>
      prevData.map((command) =>
        command.id === id ? { ...command, command_status: newStatus } : command
      )
    );
    handleCloseModal();
  };
  

  return (
  <>
    <OwnerOrdersTemplate
      userEmail={user?.userEmail ?? ""}
      username={user?.username ?? ""}
      organization={user?.organization ?? ""}
      part={t('navbar.owner.commands')}
      role={user?.role ?? ""}
      statsSection={stats}
      data={commandsData}
      handleClick={handleViewCommand}
    />

    <CommandModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={selectedCommand ? `${t('modals.info.command')} n°${selectedCommand.id}` : 'None'}
      selectedCommand={selectedCommand ? selectedCommand : false}
    />
  </>
  );
};
