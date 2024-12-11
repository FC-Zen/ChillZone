import React, { FC } from 'react';
import * as IconList from './list';

export type IconProps = {
  color?: string;
  name: keyof typeof IconList;
  height?: string | number;
  width?: string | number;
  style?: React.CSSProperties;
};

export const Icon: FC<IconProps> = ({ name, ...props }) => {
  const SelectedIcon = IconList[name];

  if (!SelectedIcon) {
    console.error(`Icon "${name}" does not exist.`);
    return null;
  }

  return (
    <span style={{ display: 'inline-flex', ...props.style }}>
      <SelectedIcon {...props} />
    </span>
  );
};

export default Icon;
