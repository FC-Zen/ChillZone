import React from 'react';
import { Switch } from 'react-native';

export type ToggleSwitchProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  value,
  onChange,
}) => <Switch value={value} onValueChange={onChange} />;
