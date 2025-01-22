import React, { useState, useEffect } from 'react';
import { Modal } from '@components/organisms'; // Composant de modale
import { AdminAccountLayout } from '@components/templates';
import { useTranslation } from 'react-i18next';
import { useUser } from '@hooks';
import { InputField } from '@components/organisms/ModalForm/ModalForm';
import { addAccount, getAccounts, toggleAccountActive, toggleAccountBlock } from '@services/AdminServices';

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
      name: "email",
      label: t('fields.common.mail'),
      type: "text",
      icon: "Envelope",
      required: true,
    },
    {
      name: "is_admin",
      label: t('fields.common.isadmin'),
      type: "switch",
      icon: "Box",
      required: true,
    },
  ] as InputField[];

  const [isModalOpen, setModalOpen] = useState(false);
  
  const [userData, setUserData] = useState<
  { id: number; 
    first_name: string; 
    last_name: string; 
    email: string; 
    role: string; 
    establishment: string; 
    reservation_count: number; 
    is_block: boolean; 
    is_active: boolean; }[]>([]);
  
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

  const handleDeleteAccount = async (id: number) => {
    if (userData) {
      const account = userData.find(u => u.id === id);
      if (account) {
        const is_block = account.is_block;
        const res = await toggleAccountActive(id, false);
        setUserData(res);
      } else {
        console.error('Account not found');
      }
    }
  };

  const handleToggleAccount = async (id: number, is_block: boolean) => {
    if (userData) {
      const account = userData.find(u => u.id === id);
      if (account) {
        const is_active = account.is_active;
        console.log(id,!is_block,is_active);
        const res = await toggleAccountBlock(id, !is_block);
        setUserData(res);
      } else {
        console.error('Account not found');
      }
    }
  };

  const handleAddAccount = async (formData: FormData) => {
    formData.append("username", formData.get('first_name') + "." + formData.get('last_name'));
    console.log("FormData avant soumission : ", Array.from(formData.entries()));
    try {
          const res = await addAccount(formData);
          setUserData(res);
          handleCloseModal();
      } catch (error) {
          console.error(error);
    }
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
