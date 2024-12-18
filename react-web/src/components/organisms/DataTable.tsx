import React from 'react';

const data = Array(10).fill({
  name: 'Dupont Olivier',
  email: 'dudu@univ-eiffel.fr',
  role: 'Etudiant',
  reservations: 15,
  location: 'IUT - Marne la Vallée',
});

const DataTable = () => (
  <table className="w-full text-left border-collapse mt-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2">Nom Prénom</th>
        <th className="p-2">Adresse mail</th>
        <th className="p-2">Rôle</th>
        <th className="p-2">Etablissement</th>
        <th className="p-2">Nombre de réservations</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <tr key={index} className="border-b">
          <td className="p-2">{item.name}</td>
          <td className="p-2">{item.email}</td>
          <td className="p-2">{item.role}</td>
          <td className="p-2">{item.location}</td>
          <td className="p-2">{item.reservations}</td>
          <td className="p-2 flex space-x-2">
            <button className="text-red-500">✂️</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
