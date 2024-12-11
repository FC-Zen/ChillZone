import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

type ForgotMdpProps = {
  logo: string;
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonClick: () => void;
};

export const ForgotMdp: React.FC<ForgotMdpProps> = ({
  logo,
  title,
  infoText,
  buttonTitle,
  onButtonClick,
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
      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 2 }}>
        {infoText}
      </Typography>
      <Button variant="contained" color="primary" onClick={onButtonClick}>
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default ForgotMdp;
