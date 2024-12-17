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
      className=""
      style={{
        width: '18%',
        flexShrink: 0,
        margin: '0 auto',
        marginTop: 50,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap : "15px"
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
