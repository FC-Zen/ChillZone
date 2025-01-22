import React from "react";
import Switch from "@mui/material/Switch";
import "./styles.css";

export type CustomSwitchProps = {
  checked?: boolean; // Si le switch est activé
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback lors d'un changement d'état
  disabled?: boolean; // Si le switch est désactivé
  name?: string;
};

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked,
  onChange,
  disabled,
  name
}) => {
  return (
    <div className="custom-switch-container">
      <Switch
        classes={{
          root: "IOSSwitch",
          switchBase: "MuiSwitch-switchBase",
          thumb: "MuiSwitch-thumb",
          track: "MuiSwitch-track",
          checked: "Mui-checked",
          disabled: "Mui-disabled",
        }}
        disableRipple
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        inputProps={{ name }}
      />
    </div>
  );
};