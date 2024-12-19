import React, { useState } from 'react';
import TableHeader from '../components/molecules/TableHeader';
import Modal from '../components/organisms/AccountModal'; // Le composant de modale
import DataTable from '../components/organisms/DataTable'; // Import the DataTable component

const AdminAccountPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <div>
      {/* Header avec le bouton pour ouvrir la modale */}
      <TableHeader onAddUser={handleOpenModal} />
      <DataTable />

      {/* Modale */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Création d’un compte"
      >
        <form className="flex flex-col space-y-4">
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Prénom"
          />
          <input className="p-2 border rounded" type="text" placeholder="Nom" />
          <input
            className="p-2 border rounded"
            type="text"
            placeholder="Rôle"
          />
          <input
            className="p-2 border rounded"
            type="email"
            placeholder="Adresse mail"
          />
          <select className="p-2 border rounded">
            <option value="">Établissement</option>
            <option value="1">Établissement 1</option>
            <option value="2">Établissement 2</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded">
            Création
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminAccountPage;
