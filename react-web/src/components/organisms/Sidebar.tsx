import React from 'react';
import { Home, Users, Box, BarChart2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Accueil', active: true },
    { icon: <Users className="w-5 h-5" />, label: 'Utilisateurs' },
    { icon: <Box className="w-5 h-5" />, label: 'Produits' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Statistiques' },
  ];

  return (
    <div className="w-64 bg-indigo-900 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-white text-xl font-bold px-4">Dashboard</h2>
      </div>
      <nav>
        {menuItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 ${
              item.active
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;