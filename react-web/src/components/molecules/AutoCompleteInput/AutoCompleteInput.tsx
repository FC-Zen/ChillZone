import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { colors } from "@theme";

export type InputProps = {
  name: string;
  value?: { id: number; label: string }[];
  label: string;
  options: { id: number; label: string }[];
  onInputChange?: (name: string, value: any) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

export const AutoCompleteInput = ({
  name,
  value = [],
  label,
  options,
  onInputChange,
  onKeyDown,
}: InputProps) => {

  const [selectedValues, setSelectedValues] = useState<{ id: number; label: string }[]>(value);

  const handleChange = (event: any, newValue: { id: number; label: string }[]) => {
    setSelectedValues(newValue);
    if (onInputChange) {
      onInputChange(name, newValue);
    }
  };


  return (
    <Box style={{ width: "100%" }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option.label}
        value={selectedValues}
        onChange={handleChange}
        isOptionEqualToValue={(option, value) => option === value}
        sx={{
          "& .MuiAutocomplete-inputRoot": {
            padding: "0px 25px",
            backgroundColor: colors.white,
            border: "2px solid",
            borderRadius: "10px",
            borderColor: colors.silver,
          },
          "& .Mui-focused": {
            color: "initial",
            backgroundColor: "white!important",
          },
          "& .MuiAutocomplete-inputRoot::after": {
            borderBottom: "none",
          },
          "& .MuiAutocomplete-inputRoot::before": {
            borderBottom: "none",
          },
          "& .MuiAutocomplete-inputRoot:hover": {
            border: "2px solid",
            borderRadius: "10px",
            borderColor: colors.silver,
            backgroundColor: colors.white,
          },
          "& .MuiAutocomplete-inputRoot:hover::before": {
            borderBottom: "none!important",
          },
          "& .MuiAutocomplete-inputRoot:hover::after": {
            borderBottom: "none",
          },
          "& .MuiInputAdornment-root": {
            padding: "1px",
          },
          "& input:-webkit-autofill": {
            backgroundColor: colors.white,
            boxShadow: "0 0 0 30px white inset",
          },
          width: "100%",
        }}
        renderInput={(params) => <TextField {...params} 
          variant="standard" 
          label={label} 
          name={name} 
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />}
      />
    </Box>
  );
};

