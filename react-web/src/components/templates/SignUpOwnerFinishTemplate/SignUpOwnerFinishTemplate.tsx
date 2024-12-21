import React from 'react';
import { VectorHeader, VectorBottom, Button} from '@components';
import { Logo, Header } from '@components/atoms';
import { Container, Typography } from '@mui/material';

type SignUpOwnerFinishTemplateProps = {
  title: string;
  text: string;
  buttonTitle: string;
  onPress: () => void;
};

export const SignUpOwnerFinishTemplate: React.FC<SignUpOwnerFinishTemplateProps> = ({
  title,
  text,
  buttonTitle,
  onPress
}) => {
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <VectorHeader />

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
      <Logo />
      <Header title={title} />
      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 2 }}>
        {text}
      </Typography>
      <Button title={buttonTitle} onclick={onPress} variant="primary" />
    </Container>

    <VectorBottom />
  </div>
  );
};
