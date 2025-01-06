import React, { useEffect, useState } from 'react';
import { OwnerOrdersTemplate } from '@components/templates';
import { useUser } from '@hooks';
import { useTranslation } from 'react-i18next';
import commands from '@assets/data/commands.json';
import { AccountModal } from '@components/organisms';
import { Typography } from '@mui/material';
import { colors } from '@theme';
import { Button } from '@components';
import { ButtonIcon } from '@components/atoms';

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
    setCommandsData(updatedCommands);
  }, [commandsData]);

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

      statsSection={stats}
      data={commandsData}
      handleClick={handleViewCommand}
    />

    <AccountModal
    isOpen={isModalOpen}
    onClose={handleCloseModal}
    title={selectedCommand ? `Détails de la commande n° ${selectedCommand.id}` : "Nouvelle commande"}
    >
      <div className="command-form" style={{ color: colors.resolutionBlue }}>
        <Typography>| Statut de la commande : {selectedCommand?.command_status || ""}</Typography>
        <Typography>| Nom du client : {selectedCommand?.user_name || ""}</Typography>
        <Typography>| Date de la commande : {selectedCommand?.creation_date ? new Date(selectedCommand.creation_date).toLocaleDateString("fr-FR") : ""}</Typography>
        <Typography>| Prix de la commande : {selectedCommand?.total_amount || ""} €</Typography>
        <Typography>
          | Heure de la collecte prévu : {selectedCommand?.pickup_time ? new Date(selectedCommand.pickup_time).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : ""} - {selectedCommand?.final_pickup_time ? new Date(selectedCommand.final_pickup_time).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' }) : ""}
        </Typography>      
      </div>

      {/* Lignes de la commande */}
      <div style={{ marginTop: '20px', borderRadius : '10px' }}>
        {selectedCommand?.lines && selectedCommand.lines.length > 0 ? (
          <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
            <thead style={{ color : colors.white, backgroundColor : colors.resolutionBlue }}>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Menu</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Repas</th>
                <th style={{ borderBottom: '1px solid #ccc', padding: '8px 1px', textAlign: 'left' }}>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                selectedCommand.lines.reduce((acc, line) => {
                  if (!acc[line.menu_name]) {
                    acc[line.menu_name] = [];
                  }
                  acc[line.menu_name].push({ meal: line.meal_name, quantity: line.quantity });
                  return acc;
                }, {} as Record<string, { meal: string; quantity: number }[]>)
              ).map(([menu, meals], index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', fontWeight: 'bold' }} rowSpan={meals.length}>
                      {menu}
                    </td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{meals[0].meal}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{meals[0].quantity}</td>
                  </tr>
                  {meals.slice(1).map((meal, mealIndex) => (
                    <tr key={`${index}-${mealIndex}`}>
                      <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{meal.meal}</td>
                      <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{meal.quantity}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        ) : (
          <Typography>Aucune ligne de commande.</Typography>
        )}
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {selectedCommand?.command_status ===  t('status.in_progress')  && (
          <ButtonIcon
            title={t('buttons.commands.stateReady')}
            onclick={() => changeState(selectedCommand.id, selectedCommand.command_status)} // Correction ici
            icon="Check"
          />
        )}

        {selectedCommand?.command_status ===  t('status.ready')  && (
          <ButtonIcon
            title={t('buttons.commands.stateFinished')}
            onclick={() => changeState(selectedCommand.id, selectedCommand.command_status)} // Correction ici
            icon="Tablet"
          />
        )}
      </div>
    </AccountModal>
  </>
  );
};
