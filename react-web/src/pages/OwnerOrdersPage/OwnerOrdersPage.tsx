import React, { useEffect, useState } from 'react';
import { OwnerOrdersTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import { CommandModal } from '@components/organisms';
import { fetchCommands, updateCommandStatus } from '@services';

export type Meal = {
  id: number;
  name: string;
  description: string;
  photo_link: string | null;
  price: number;
};

export type Menu = {
  id: number;
  name: string;
  description: string;
  photo_link: string | null;
  price: number;
  meals: Meal[];
};

export type LineItem = {
  [key: string]: {
    quantity: number;
    menu?: Menu;
    meal?: Meal;
  };
};

export type Command = {
  id: number;
  payment_method: string;
  customer_name : string;
  status: string;
  total_price : number;
  qrcode_link: string;
  pickup_time: string;
  creation_date: string;
  lines: LineItem[];
};

export const OwnerOrdersPage: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();
  
  const [stats, setStats] = useState({
    commandsNow : { name: t('dashboard.info.commandsNow'), value: "8" },
    commandsToday : { name: t('dashboard.info.commandsToday'), value: "18" },
    commandsTodo : { name: t('dashboard.info.commandsTodo'), value: "28" }
  });
  
  const [commandsData, setCommandsData] = useState<Command[]>([]);

  useEffect(() => {
    const updatedCommands = commandsData.map((command) => ({
      ...command,
      status:
        command.status === "in progress" ? t('status.in_progress') :
        command.status === "ready" ? t('status.ready') :
        command.status === "completed" ? t('status.Completed') :
        command.status,
    }));
  
    const hasChanges = updatedCommands.some(
      (updatedCommand, index) => updatedCommand.status !== commandsData[index].status
    );
  
    if (hasChanges) {
      setCommandsData(updatedCommands);
    }
  }, [commandsData, t]);

  const fetchUserData = async () => {
    try {
      const res = await fetchCommands(); // SERVICES
      if (res) {
        setCommandsData(res.commands);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);

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


  const changeState = async (id : number, currentStatus: string) => {
    let newStatus: string;
    if (currentStatus === t('status.in_progress')) {
      newStatus = "ready";
    } else if (currentStatus === t('status.ready')) {
      newStatus = "completed";
    } else {
      newStatus = currentStatus;
    }
    try {
      const res = await updateCommandStatus(id,newStatus);
      setCommandsData(res.commands);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
    handleCloseModal();
  };
  

  return (
  <>
    <OwnerOrdersTemplate
      user={user}
      part={t('navbar.owner.commands')}
      statsSection={stats}
      data={commandsData}
      handleClick={handleViewCommand}
    />

    <CommandModal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      title={selectedCommand ? `${t('modals.info.command')} n°${selectedCommand.id}` : 'None'}
      changeState={changeState}
      selectedCommand={selectedCommand ? selectedCommand : false}
    />
  </>
  );
};
