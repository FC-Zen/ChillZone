import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import { VectorHeader, VectorBottom } from '@components';
import { ForgotMdp } from '@components/organisms';
import { colors } from '@theme';

export type ForgotMdpTemplateProps = {
  title: string;
  infoText: string;
  buttonTitle: string;
  onButtonClick: () => void;
};

export const ForgotMdpTemplate: React.FC<ForgotMdpTemplateProps> = ({
  title,
  infoText,
  buttonTitle,
  onButtonClick,
}) => {
  return(
  <>
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
    
          <ForgotMdp
            title={title}
            infoText={infoText}
            buttonTitle={buttonTitle}
            onButtonClick={onButtonClick}
          />
    
          <VectorBottom />
        </div>
  </>
  );
};
