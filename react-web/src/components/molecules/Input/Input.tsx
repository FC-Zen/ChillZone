import TextField from "@mui/material/TextField/TextField";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import { colors } from "@theme";
import { Icon } from "@components/atoms";
import * as IconList from '@atoms/Icons/list';

export type InputProps = {
  icon? : keyof typeof IconList;
  name: string;
  value?: string;
  label: string;
  required?: boolean;
  type?:string;
  min?: number;
  max?: number;
  defaultvalue? :string;
  onInputChange?: (name: string, value: any) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Input = ({icon = 'User', name, value, label, required, type, min, max, defaultvalue, onInputChange, onKeyDown }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [typefield, setTypeField] = useState(type);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
        if (typefield === "password") {
            setTypeField("text");
        } else {
            setTypeField("password");
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
        }}> 
            {type==="password" ? (
                <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Icon name="Lock" />
                      </InputAdornment>
                    ),
                  },
                }}
                label={required ? `${label}*` : label}
                className="input-form" 
                type={typefield}
                variant="outlined"
                value={value}
                name={name}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    padding: '10px 25px',
                      '& fieldset': {
                          borderRadius : '10px',
                          borderColor: colors.silver, // retire le bord en état normal
                      },
                      '&:hover fieldset': {
                          borderColor: colors.silver, // bord visible au survol
                      },
                      '&.Mui-focused fieldset': {
                          borderColor: colors.silver, // bord plus visible quand l'input est focus
                      },
                  },
                  '& .MuiInputBase-input': {
                    padding: "1%", // Retirer le padding de l'input
                  },
                  width : "100%",
              }}
                InputProps={{
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
                        variant="outlined" 
                        inputProps={{ min, max }} // Ajout de min et max ici
                        onChange={handleChange}
                        onKeyDown={onKeyDown}
                        value={value}
                        name={name}
                        defaultValue={defaultvalue}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            padding: '10px 25px',
                              '& fieldset': {
                                  borderRadius : '10px',
                                  borderColor: colors.silver, // retire le bord en état normal
                              },
                              '&:hover fieldset': {
                                  borderColor: colors.silver, // bord visible au survol
                              },
                              '&.Mui-focused fieldset': {
                                  borderColor: colors.silver, // bord plus visible quand l'input est focus
                              },
                          },
                          '& .MuiInputBase-input': {
                                padding: "1%", // Retirer le padding de l'input
                          },
                          width : "100%",
                      }}
                        // onChange={setSearch ? ((e) => setSearch(e.target.value)) : ()}
                    />

                </>
            )}
        </Box>
    );
};