import React from 'react';
import { Container, Typography } from '@mui/material';
import { Logo, Button } from '@components/atoms';

type ForgotMdpProps = {
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonClick: () => void;
};

export const ForgotMdp: React.FC<ForgotMdpProps> = ({
  title,
  infoText,
  buttonTitle,
  onButtonClick,
}) => {
  return (
    <Container
      sx={{
        width: '22%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '0 16px',
        mt: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        '@media (max-width: 600px)': {
          width: '80%!important',
        },
        '@media (max-width: 1404px)': {
          width: '50%',
        },
      }}
    >
      <Logo/>
      <Typography
        variant="h5"
        sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 2 }}>
        {infoText}
      </Typography>
      <Button variant="primary" onclick={onButtonClick} title={buttonTitle}/>
    </Container>
  );
};

export default ForgotMdp;
