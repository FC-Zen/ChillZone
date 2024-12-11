import React from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';

type ForgotPasswordProps = {
  logo: string; // Utilisation d'une chaîne pour l'URL de l'image
  headerText: string;
  placeholderText: string;
  buttonTitle: string;
  onSendClick: () => void;
  inputEmail: string;
  setInputEmail: (email: string) => void;
};

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  logo,
  headerText,
  placeholderText,
  buttonTitle,
  onSendClick,
  inputEmail,
  setInputEmail,
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
        {headerText}
      </Typography>
      <Box sx={{ width: '100%', marginBottom: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholderText}
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="/path/to/inbox-icon.svg"
                alt="Inbox"
                style={{ width: 20, marginRight: 8 }}
              />
            ),
          }}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={onSendClick}>
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default ForgotPassword;
