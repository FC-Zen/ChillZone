import React, { FC } from 'react';
import { Button as MuiButton } from '@mui/material';

export type ButtonProps = {
  title: string;
  onclick: () => void | false;
  variant?: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = ({
  title,
  onclick,
  variant = 'primary'
}) => {

  const linkStyle: React.CSSProperties = {
      backgroundColor : variant === 'primary' ? "#2e2a85" : "#FFFFFF",
      color: variant === 'primary' ? "#FFFFFF" : "#2e2a85",
      padding : "12px 20px",
      border : variant === 'primary' ? "" : "solid 3px #2e2a85 ",
      fontWeight : "semibold",
      borderRadius: "50px",
      cursor: "pointer",
      overflow: "hidden",
  };

  return (
    <MuiButton
      onClick={onclick}
      variant={variant === 'primary' ? 'contained' : 'outlined'}
      style={linkStyle}
    >
      {title}
    </MuiButton>
  );
};

export default Button;
