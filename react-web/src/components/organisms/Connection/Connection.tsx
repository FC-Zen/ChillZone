import React from 'react';
import { Button, Checkbox, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

export type ConnectionProps = {
  inputEmail: string;
  setInputEmail: (email: string) => void;
  inputPassword: string;
  setInputPassword: (password: string) => void;
  isChecked: boolean;
  setChecked: (checked: boolean) => void;
  onLogin: () => void;
  logo: string;
  placeholderEmail: string;
  placeholderPassword: string;
  rememberMeLabel: string;
  forgotPasswordText: string;
  buttonText: string;
  navigateToForgotPassword: () => void;
};

export const Connection: React.FC<ConnectionProps> = ({
  inputEmail,
  setInputEmail,
  inputPassword,
  setInputPassword,
  isChecked,
  setChecked,
  onLogin,
  logo,
  placeholderEmail,
  placeholderPassword,
  rememberMeLabel,
  forgotPasswordText,
  buttonText,
  navigateToForgotPassword,
}) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{ width: 100, height: 100, marginBottom: 20 }}
      />

      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholderEmail}
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="/path/to/user-icon.svg"
                alt="User"
                style={{ width: 24, marginRight: 8 }}
              />
            ),
          }}
        />
      </Box>

      <Box sx={{ width: '100%', marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder={placeholderPassword}
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="/path/to/lock-icon.svg"
                alt="Lock"
                style={{ width: 24, marginRight: 8 }}
              />
            ),
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <Checkbox checked={isChecked} onChange={() => setChecked(!isChecked)} />
        <Typography variant="body2">{rememberMeLabel}</Typography>
      </Box>

      <Typography
        variant="body2"
        onClick={navigateToForgotPassword}
        sx={{
          textDecoration: 'underline',
          color: 'blue',
          cursor: 'pointer',
          marginBottom: 4,
        }}
      >
        {forgotPasswordText}
      </Typography>

      <Button variant="contained" color="primary" onClick={onLogin}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default Connection;
