import React, { FC } from 'react';
import { Button as MuiButton } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export type ButtonProps = {
  title: string;
  type?: string;
  onclick: () => void | false;
  variant?: 'primary' | 'secondary';
};

export const Button: FC<ButtonProps> = ({
  title,
  type = "text",
  onclick,
  variant = 'primary'
}) => {

  const linkStyle: React.CSSProperties = {
    backgroundColor: variant === 'primary' ? "#2e2a85" : "#FFFFFF",
    color: variant === 'primary' ? "#FFFFFF" : "#2e2a85",
    padding: "12px 20px",
    border: variant === 'primary' ? "" : "solid 3px #2e2a85 ",
    fontWeight: "semibold",
    borderRadius: "50px",
    cursor: "pointer",
    overflow: "hidden",
  };

  return (
    <>
      {type === 'file' ? (
        <MuiButton
          onClick={onclick}
          variant={variant === 'primary' ? 'contained' : 'outlined'}
          style={linkStyle}
        >
          {title}
          <input
            type="file"
            style={visuallyHidden} // Utilisation de `visuallyHidden` pour cacher l'input
            onChange={(e: { target: { files: any; }; }) => console.log(e.target.files)}
            multiple
          />
        </MuiButton>
      ) : type === 'submit' ? (
        <input value={title} type="submit" style={{ ...linkStyle, fontSize: "14px", width: "40%"}} />
      ) : (
        <MuiButton
          onClick={onclick}
          variant={variant === 'primary' ? 'contained' : 'outlined'}
          style={{ ...linkStyle, fontSize: "14px", width: "40%"}}
        >
          {title}
        </MuiButton>
      )}
    </>
  );
};

export default Button;