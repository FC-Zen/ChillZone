import React, { useState, useEffect } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminAccountLayout } from '@components/templates'; 
import { useTranslation } from 'react-i18next';
import users from '@assets/data/users.json';

export const AdminAccountPage: React.FC = () => {
  const { t } = useTranslation();
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState(users);

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
  
  const handleAddAccount = (event: React.FormEvent<HTMLFormElement>) => {
    // Service à mettre ici
    // Simulation à la place
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newAccount = {
      id: Math.max(...userData.map((u) => u.id)) + 1,
      first_name: formData.get('first_name') as string,
      last_name: formData.get('last_name') as string,
      role: formData.get('role') as string,
      email: formData.get('email') as string,
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
        userEmail="kellianbre@outlook.fr"
        username="Kellian Bredeau"
        organization="Université Gustave Eiffel"
        part="Comptes"
        addAccountBtn={handleOpenModal}
        deleteBtn={handleDeleteAccount}
        toggleBtn={handleToggleAccount}
        data={userData}
      />

      {/* Modale pour la création d’un compte */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Création d’un compte"
      >
        <form className="flex flex-col space-y-4" onSubmit={handleAddAccount}>
          <input
            className="p-2 border rounded"
            type="text"
            name="first_name"
            placeholder="Prénom"
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            name="last_name"
            placeholder="Nom"
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            name="role"
            placeholder="Rôle"
            required
          />
          <input
            className="p-2 border rounded"
            type="email"
            name="email"
            placeholder="Adresse mail"
            required
          />
          <select className="p-2 border rounded" name="establishment" required>
            <option value="">Établissement</option>
            <option value="Établissement 1">Établissement 1</option>
            <option value="Établissement 2">Établissement 2</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {t('buttons.add.user')}
          </button>
        </form>
      </AccountModal>
    </>
  )
};