import React, { FC } from 'react';
import { Button as MuiButton } from '@mui/material';
import { Cross } from '@components/atoms/Icons'; 
import { colors } from '@theme';

export type ButtonModalProps = {
  onClick: () => void;
};

export const ButtonModal: FC<ButtonModalProps> = ({
  onClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: colors.resolutionBlue,
    color: colors.white,
    padding: '8px',
    border: 'none',
    borderRadius: '5px', 
    cursor: 'pointer',
    minWidth: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  return (
    <MuiButton
      onClick={onClick}
      variant={'contained'}
      style={buttonStyle}
    >
      <Cross color={colors.white} />
    </MuiButton>
  );
};

export default ButtonModal;
