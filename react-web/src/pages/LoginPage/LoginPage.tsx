import React from 'react';
import { Button } from '@components';

export const LoginPage = () => {
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  return (
    <div style={pageStyle}>
      <Button title="Login" onclick={() => console.log('Login')} />
    </div>
  );
};

export default LoginPage;
