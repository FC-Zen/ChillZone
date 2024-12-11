import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotMdp } from '@components/organisms';
import { colors } from '@theme';

export type ForgotMdpTemplateProps = {
  logo: string;
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonClick: () => void;
};

export const ForgotMdpTemplate: React.FC<ForgotMdpTemplateProps> = ({
  logo,
  title,
  infoText,
  buttonTitle,
  onButtonClick,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: colors.white,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CssBaseline />
      <VectorHeader />
      <Container
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <ForgotMdp
          logo={logo}
          title={title}
          infoText={infoText}
          buttonTitle={buttonTitle}
          onButtonClick={onButtonClick}
        />
      </Container>
      <VectorBottom />
    </Box>
  );
};
