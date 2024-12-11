import React, { FC } from 'react';
import './Button.css';

export type ButtonProps = {
  title: string;
  onclick: () => void | false;
  variant?: 'primary' | 'secondary';
  style?: React.CSSProperties;
};

export const Button: FC<ButtonProps> = ({
  title,
  onclick,
  variant = 'primary',
  style,
}) => {
  return (
    <button className={`button ${variant}`} onClick={onclick} style={style}>
      {title}
    </button>
  );
};

export default Button;
