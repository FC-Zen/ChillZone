import TextField from '@mui/material/TextField/TextField';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import { colors } from '@theme';
import { Icon } from '@components/atoms';
import * as IconList from '@atoms/Icons/list';

export type InputProps = {
  icon?: keyof typeof IconList;
  name: string;
  value?: string | number;
  label: string;
  required?: boolean;
  disabled?: boolean
  type?: string;
  min?: number;
  max?: number;
  step?: string;
  defaultvalue?: string;
  onInputChange?: (name: string, value: any) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const Input = ({
  icon = 'User',
  name,
  value,
  label,
  required,
  type,
  min,
  max,
  step,
  disabled,
  defaultvalue,
  onInputChange,
  onKeyDown,
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [typefield, setTypeField] = useState(type);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    if (typefield === 'password') {
      setTypeField('text');
    } else {
      setTypeField('password');
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputChange) {
      onInputChange(event.target.name, event.target.value);
    }
  };

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      {type === 'password' ? (
        <TextField
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon name="Lock" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          label={required ? `${label}*` : label}
          className="input-form"
          type={typefield}
          variant="filled"
          value={value}
          name={name}
          sx={{
            '& .MuiFilledInput-root': {
              padding: '0px 25px',
              backgroundColor: colors.white,
              border: '2px solid ',
              borderRadius: '10px',
              borderColor: colors.silver,
            },
            '& .Mui-focused': {
              color: 'initial',
              backgroundColor: 'white!important',
            },
            '& .MuiFilledInput-root::after': {
              borderBottom: 'none',
            },
            '& .MuiFilledInput-root::before': {
              borderBottom: 'none',
            },
            '& .MuiFilledInput-root:hover': {
              border: '2px solid ',
              borderRadius: '10px',
              borderColor: colors.silver,
              backgroundColor: colors.white,
            },
            '& .MuiFilledInput-root:hover::before': {
              borderBottom: 'none!important',
            },
            '& .MuiFilledInput-root:hover::after': {
              borderBottom: 'none',
            },
            '& .MuiInputAdornment-root': {
              padding: '1px',
            },
            '& input:-webkit-autofill': {
              backgroundColor: colors.white, // Pour s'assurer que l'arrière-plan est blanc pendant l'autofill
              boxShadow: '0 0 0 30px white inset', // Pour effacer l'ombre d'autofill
            },
            width: '100%',
          }}
          onChange={handleChange}
        />
      ) : (
        <>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name={icon} />
                  </InputAdornment>
                ),
              },
            }}
            className="input-form"
            label={required ? `${label}*` : label}
            type={type}
            inputProps={{ min, max, step }} // Ajout de min et max ici
            onChange={handleChange}
            onKeyDown={onKeyDown}
            disabled={disabled}
            value={value}
            name={name}
            defaultValue={defaultvalue}
            variant="filled"
            sx={{
              '& .MuiFilledInput-root': {
                padding: '0px 25px',
                backgroundColor: colors.white,
                border: '2px solid ',
                borderRadius: '10px',
                borderColor: colors.silver,
              },
              '& .Mui-focused': {
                color: 'initial',
                backgroundColor: 'white!important',
              },
              '& .MuiFilledInput-root::after': {
                borderBottom: 'none',
              },
              '& .MuiFilledInput-root::before': {
                borderBottom: 'none',
              },
              '& .MuiFilledInput-root:hover': {
                border: '2px solid ',
                borderRadius: '10px',
                borderColor: colors.silver,
                backgroundColor: colors.white,
              },
              '& .MuiFilledInput-root:hover::before': {
                borderBottom: 'none!important',
              },
              '& .MuiFilledInput-root:hover::after': {
                borderBottom: 'none',
              },
              '& .MuiInputAdornment-root': {
                padding: '1px',
              },
              '& input:-webkit-autofill': {
                backgroundColor: colors.white, // Pour s'assurer que l'arrière-plan est blanc pendant l'autofill
                boxShadow: '0 0 0 30px white inset', // Pour effacer l'ombre d'autofill
              },
              width: '100%',
            }}
          />
        </>
      )}
    </Box>
  );
};
