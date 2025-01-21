import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms'; // Composant de modale
import { AdminAccountLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import users from '@assets/data/users.json';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { getAccounts } from '@services/AdminServices';

export const AdminAccountPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const listInputs = [
    {
      name: "first_name",
      label: t('fields.common.first_name'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "last_name",
      label: t('fields.common.last_name'),
      type: "text",
      icon: "User",
      required: true,
    },
    {
      name: "role",
      label: t('fields.common.type_role'),
      type: "text",
      icon: "Box",
      required: true,
    },
    {
      name: "mail",
      label: t('fields.common.mail'),
      type: "text",
      icon: "Envelope",
      required: true,
    },
  ] as InputField[];

  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(users);

  const fetchUserData = async () => {
    try {
      const usersData = await getAccounts(); // SERVICES
      if (usersData && usersData.data) {
        setUserData(usersData.data); 
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteAccount = (id: number) => {
    // Service à mettre ici
    // Simulation à la place
    setUserData((prevData) => prevData.filter((user) => user.id !== id));
    console.log(`Utilisateur avec ID ${id} supprimé.`);
  };

  const handleToggleAccount = (id: number, isActive: string) => {
    // Service à mettre ici
    // Simulation à la place
    setUserData((prevData) =>
      prevData.map((user) =>
        user.id === id ? { ...user, status: isActive } : user
      )
    );
    console.log(`Utilisateur avec ID ${id} mis à jour : ${isActive}.`);
  };

  const handleAddAccount = (formData: FormData) => {
    // Service à mettre ici
    // Simulation à la place
    const newAccount = {
      id: Math.max(...userData.map((u) => u.id)) + 1,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      role: formData.get("role") as string,
      email: formData.get("mail") as string,
      establishment: formData.get('establishment') as string,
      reservation_count: 0,
      status: 'Unverified',
    };
    setUserData((prevData) => [...prevData, newAccount]);
    handleCloseModal();
    console.log('Nouvel utilisateur ajouté :', newAccount);
  };

  useEffect(() => {
    console.log('Les données utilisateur ont été mises à jour :', userData);
  }, [userData]);

  return (
    <>
      {/* Layout principal contenant le tableau */}
      <AdminAccountLayout
        user={user}
        part={t('navbar.admin.users')}
        addAccountBtn={handleOpenModal}
        deleteBtn={handleDeleteAccount}
        toggleBtn={handleToggleAccount}
        data={userData}
      />

      {/* Modale pour la création d’un compte */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleForm={handleAddAccount}
        listInputs={listInputs}
        title={t("modals.create.account")}
      />
    </>
  );
};
