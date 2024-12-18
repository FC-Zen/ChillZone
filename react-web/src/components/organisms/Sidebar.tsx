import React from 'react';
import {
  Home,
  Users,
  Layers,
  Calendar,
  Database,
  UsersRound,
} from 'lucide-react';

const Sidebar = () => (
  <div
    style={{
      background: '#2E2A85',
      height: '100vh',
      width: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      gap: '1.5rem',
      color: '#FFF',
    }}
  >
    <Home size={24} />
    <Users size={24} />
    <Layers size={24} />
    <Calendar size={24} />
    <Database size={24} />
    <UsersRound size={24} />
  </div>
);

export default Sidebar;
