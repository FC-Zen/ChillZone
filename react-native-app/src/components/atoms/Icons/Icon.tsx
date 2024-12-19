import { FC } from 'react';
import { ViewStyle } from 'react-native';
import * as IconList from './list';
// import { Colors } from '@theme';

export type IconProps = {
  color?: any; // Colors[keyof Colors]; de base mais on corrigera plus tard
  name: keyof typeof IconList;
  height?: number | undefined;
  width?: number | undefined;
  style?: ViewStyle;
};

export const Icon: FC<IconProps> = ({ name, height, width, ...props }) => {
  const SelectedIcon = IconList[name];

  if (!SelectedIcon) {
    console.error(`Icon "${name}" does not exist.`);
    return null;
  }

  return <SelectedIcon {...props} height={height} width={width} />;
};
