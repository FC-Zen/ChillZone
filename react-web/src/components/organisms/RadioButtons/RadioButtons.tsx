import React, { useState } from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { colors } from '@theme';

type RadioButtonsProps = {
    label: string;
    name : string;
    options: { value: string; label: string }[];
    defaultValue?: string;
    row?: boolean; 
    onInputChange?: (name: string, value: any) => void;
};

export const RadioButtons: React.FC<RadioButtonsProps> = ({
    label,
    name,
    options,
    defaultValue = '', 
    row = true,
    onInputChange,
}) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue); 
        if (onInputChange) {
        onInputChange(name,newValue);
        }
    };

    return (
        <FormControl
            sx={{
                display: 'flex',
                flexDirection: row ? 'row' : 'column',
                alignItems: 'center',
                gap: '16px',
                color: colors.aquaDeep
            }}
        >
        <FormLabel id="radio-button-group-label">{label}</FormLabel>
        <RadioGroup
            row={row}
            aria-labelledby="radio-button-group-label"
            name={name}
            value={selectedValue}
            onChange={handleChange}
        >
            {options.map((option) => (
            <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio
                    sx={{
                        color: colors.aquaDeep, // La couleur de base du bouton
                        '&.Mui-checked': {
                          color: colors.aquaDeep, // La couleur quand le bouton est coché
                        },
                    }}
                    />}
                label={option.label}
            />
            ))}
        </RadioGroup>
        </FormControl>
    );
};
