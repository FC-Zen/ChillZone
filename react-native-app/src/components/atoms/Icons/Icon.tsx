import { FC } from 'react';
import { ViewStyle } from 'react-native';
import * as IconList from './list';

export type IconProps = {
  color?: string;
  name: keyof typeof IconList; // Limite les noms aux clés de IconList
  height?: string | number;
  width?: string | number;
  style?: ViewStyle;
};

export const Icon: FC<IconProps> = ({ name, ...props }) => {
  const SelectedIcon = IconList[name];

  if (!SelectedIcon) {
    console.error(`Icon "${name}" does not exist.`);
    return null;
  }

  return <SelectedIcon {...props} />;
};
