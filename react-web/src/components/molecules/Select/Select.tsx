import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { colors } from '@theme';
import { Icon } from '@components/atoms';
import * as IconList from '@atoms/Icons/list';
import { useState } from 'react';

export type SelectProps = {
  name: string;
  value?: string | number;
  label: string;
  options: { id: number; name?: string; libelle?: string }[];
  required?: boolean;
  disabled?: boolean;
  icon?: keyof typeof IconList;
  onValueChange?: (name: string, value: any) => void;
};

export const StyledSelect = ({
  name,
  value = '',
  label,
  options,
  required,
  disabled,
  icon = 'User', // Par défaut, une icône "User" est utilisée
  onValueChange,
}: SelectProps) => {
  const [selectedValues, setSelectedValues] = useState<string | number >(value);
  
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value; // Récupère la nouvelle valeur
    setSelectedValues(newValue); // Met à jour l'état local
    if (onValueChange) {
      onValueChange(name, newValue); // Appelle la fonction de rappel si elle est définie
    }
  };

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <FormControl
        variant="filled"
        sx={{
          width: '100%',
          '& .MuiFilledInput-root': {
            padding: '0px 25px',
            backgroundColor: colors.white,
            border: '2px solid',
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
            border: '2px solid',
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
            backgroundColor: colors.white,
            boxShadow: '0 0 0 30px white inset',
          },
        }}
      >
        <InputLabel
          sx={{
            paddingLeft: '10px',
            backgroundColor: colors.white,
            color: colors.silver,
            fontSize: '14px',
          }}
        >
          {required ? `${label}*` : label}
        </InputLabel>
        <Select
          name={name}
          value={selectedValues as string}
          onChange={handleChange}
          disabled={disabled}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <Icon name={icon} />
            </InputAdornment>
          }
          inputProps={{
            style: {
              padding: '8px 0',
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name || option.libelle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
