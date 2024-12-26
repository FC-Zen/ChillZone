import React from 'react';

type TableHeaderProps = {
  onAddUser: () => void; // Fonction pour ouvrir la modale
};

const TableHeader = ({ onAddUser }: TableHeaderProps) => (
  <div className="flex items-center justify-between mb-4">
    <input
      type="text"
      placeholder="Chercher dans la table"
      className="p-2 border rounded w-1/3"
    />
    <div className="flex space-x-2">
      <button className="bg-gray-200 p-2 rounded">Columns</button>
      <button className="bg-gray-200 p-2 rounded">Filters</button>
      <button className="bg-gray-200 p-2 rounded">Density</button>
      <button className="bg-gray-200 p-2 rounded">Export</button>
      <button
        className="bg-green-500 text-white p-2 rounded"
        onClick={onAddUser} // Ouvre la modale
      >
        Ajouter un compte utilisateur
      </button>
    </div>
  </div>
);

export default TableHeader;
