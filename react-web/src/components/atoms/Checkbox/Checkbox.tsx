import React from 'react';
import './Checkbox.css';

export type CheckboxProps = {
  checked: boolean;
  onChange: () => void;
  label?: string;
  style?: React.CSSProperties;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  style,
}) => {
  return (
    <div className="wrapper" style={style} onClick={onChange}>
      <div className={`checkbox ${checked ? 'checked' : ''}`}>
        {checked && <span className="checkmark">✔</span>}
      </div>
      {label && <span className="label">{label}</span>}
    </div>
  );
};

export default Checkbox;
