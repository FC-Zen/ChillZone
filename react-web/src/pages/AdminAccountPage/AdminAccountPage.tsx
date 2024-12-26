import React, { useState } from 'react';
import { AccountModal } from '@components/organisms'; // Composant de modale
import { AdminAccountLayout } from '@components/templates'; 
import users from '@assets/data/users.json';

export const AdminAccountPage: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleDeleteAccount = (id: number) => {
    console.log(`Suppression de l'utilisateur avec ID : ${id}`);
  };
  
  const handleToggleAccount = (id: number, isActive: string) => {
    console.log(`Blocage/Déblocage de l'utilisateur avec ID : ${id}. Actif : ${isActive}`);
  };  

  return (
    <div>
      {/* Layout principal contenant le tableau */}
      <AdminAccountLayout
        userEmail="kellianbre@outlook.fr"
        username="Kellian Bredeau"
        organization="Université Gustave Eiffel"
        part="Accueil"
        addAccountBtn={handleOpenModal}
        deleteBtn={handleDeleteAccount}
        toggleBtn={handleToggleAccount}
        data={users}
      />

      {/* Modale pour la création d’un compte */}
      <AccountModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Création d’un compte"
      >
        <form className="flex flex-col space-y-4">
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Prénom"
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Nom"
            required
          />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Rôle"
            required
          />
          <input
            className="p-2 border rounded"
            type="email"
            placeholder="Adresse mail"
            required
          />
          <select className="p-2 border rounded" required>
            <option value="">Établissement</option>
            <option value="1">Établissement 1</option>
            <option value="2">Établissement 2</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Créer le compte
          </button>
        </form>
      </AccountModal>
    </div>
  );
};
