import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

type ResetPasswordProps = {
  logo: string; // Utilisation d'une chaîne pour l'URL de l'image
  title: string;
  placeholderPassword: string;
  placeholderVerifyPassword: string;
  buttonTitle: string;
  onModifyPress: () => void;
  inputPassword: string;
  setInputPassword: (value: string) => void;
  inputPassword2: string;
  setInputPassword2: (value: string) => void;
};

export const ResetPassword: React.FC<ResetPasswordProps> = ({
  logo,
  title,
  placeholderPassword,
  placeholderVerifyPassword,
  buttonTitle,
  onModifyPress,
  inputPassword,
  setInputPassword,
  inputPassword2,
  setInputPassword2,
}) => {
  return (
    <Box
      sx={{
        flex: 1,
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
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}
      >
        {title}
      </Typography>
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
                style={{ width: 20, marginRight: 8 }}
              />
            ),
          }}
        />
      </Box>
      <Box sx={{ width: '100%', marginBottom: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder={placeholderVerifyPassword}
          value={inputPassword2}
          onChange={(e) => setInputPassword2(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="/path/to/lock-icon.svg"
                alt="Lock"
                style={{ width: 20, marginRight: 8 }}
              />
            ),
          }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={onModifyPress}>
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default ResetPassword;
