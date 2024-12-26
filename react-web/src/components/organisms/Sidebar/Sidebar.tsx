import React from 'react';
import { Home, User, Box, Calendar, Building, Utensils } from 'lucide-react';

export const Sidebar = () => (
  <div
    style={{
      background: '#2E2A85',
      height: '100vh',
      width: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // Centre horizontalement
      justifyContent: 'center', // Centre verticalement
      gap: '4rem', // Espacement entre les icônes
      color: '#FFF',
    }}
  >
    <Home size={24} />
    <User size={24} />
    <Box size={24} />
    <Calendar size={24} />
    <Building size={24} />
    <Utensils size={24} />
  </div>
);
