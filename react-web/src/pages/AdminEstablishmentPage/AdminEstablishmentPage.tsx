import React, { useState, useEffect } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminAccountLayout, AdminEstablishmentLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import users from '@assets/data/users.json';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';

export const AdminEstablishmentPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const listInputs = [
    {
      name: t('fields.common.first_name'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: t('fields.common.last_name'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: t('fields.common.type_role'),
      type: "text",
      icon: "Box",
      required: true,
    },
    {
      name: t('fields.common.mail'),
      type: "text",
      icon: "Envelope",
      required: true,
    },
  ] as InputField[];

  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(users);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);



  return (
    <>
      {/* Layout principal contenant le tableau */}
      <AdminEstablishmentLayout
        userEmail={user?.userEmail ?? ""}
        username={user?.username ?? ""}
        organization={user?.organization ?? ""}
        part={t('headers.map')}
        role={user?.role ?? ""}
      />

      {/* Modale pour la création d’un étage */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        addAccount={handleCloseModal}
        listInputs={listInputs}
        title="Création d’un compte de test étudiant"
      />
    </>
  );
};
