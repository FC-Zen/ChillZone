import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// import IconButton from '@mui/material/IconButton';
import { colors } from '@theme';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconProps } from '@components/atoms';

export type InputProps = {
  placeholder: string;
  icon?: IconProps['name'];
  onChangeText: (text: string) => void;
  value: string;
  variant?: 'default' | 'password';
  style?: React.CSSProperties;
  isPasswordVisible?: boolean; // Prop pour la visibilité du mot de passe
  onTogglePasswordVisibility?: () => void; // Prop pour gérer la visibilité
};

export const Input: FC<InputProps> = ({
  icon,
  onChangeText,
  placeholder,
  value,
  variant = 'default',
  style,
  isPasswordVisible = false, // Valeur par défaut
  // onTogglePasswordVisibility,
}) => {
  return (
    <TextField
      style={{ ...style, width: '100%', borderRadius: '10px' }} // Style personnalisé
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
      type={variant === 'password' && isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        startAdornment: icon ? (
          <InputAdornment position="start">{icon}</InputAdornment>
        ) : null,
        // endAdornment:
        //   variant === 'password' ? (
        //     <InputAdornment position="end">
        //       <IconButton
        //         aria-label="toggle password visibility"
        //         onClick={onTogglePasswordVisibility}
        //         edge="end"
        //       >
        //         {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
        //       </IconButton>
        //     </InputAdornment>
        //   ) : null,
        style: {
          borderRadius: '10px',
          border: `2px solid ${colors.silver}`,
          backgroundColor: colors.white,
        },
      }}
    />
  );
};

export default Input;
