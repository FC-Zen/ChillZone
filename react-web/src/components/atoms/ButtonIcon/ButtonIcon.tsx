import React, { FC } from 'react';
import { Button as MuiButton } from '@mui/material';
import { Icon } from '@components';
import { IconList } from '../Icons';
import { colors } from '@theme';

export type ButtonIconProps = {
  title: string;
  icon : keyof typeof IconList;
  onclick: () => void | false;
  variant?: 'primary' | 'secondary';
};

export const ButtonIcon: FC<ButtonIconProps> = ({
  title,
  icon,
  onclick,
  variant = 'primary'
}) => {

  const linkStyle: React.CSSProperties = {
    backgroundColor: variant === 'primary' ? colors.aquaDeep : colors.white,
    color: variant === 'primary' ? colors.white : colors.aquaDeep,
    padding: "8px 20px",
    border: variant === 'primary' ? "" : "solid 3px #2e2a85 ",
    fontWeight: "semibold",
    borderRadius: "5px",
    gap: "15px",
    cursor: "pointer",
    overflow: "hidden",
    display:"flex"
  };

  return (
    <>
      <MuiButton
        onClick={onclick}
        variant={variant === 'primary' ? 'contained' : 'outlined'}
        style={linkStyle}
      >
        <div style={{ padding: '0px 0px', display : 'flex'  }}>
          <Icon name={icon} color={colors.white}/>
        </div>
        {title}
      </MuiButton>
    </>
  );
};

export default ButtonIcon;
